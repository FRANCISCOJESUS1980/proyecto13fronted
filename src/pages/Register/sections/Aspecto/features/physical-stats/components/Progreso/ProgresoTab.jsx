import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { es } from 'date-fns/locale'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import { fetchTrendsApi } from '../../api/physicalStatsApi'
import './ProgresoTab.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
)

const ProgresoTab = () => {
  const { historialMedidas, loading } = usePhysicalStats()
  const [selectedMedida, setSelectedMedida] = useState('peso')
  const [trendsData, setTrendsData] = useState(null)
  const [loadingTrends, setLoadingTrends] = useState(false)
  const [error, setError] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  const medidasOptions = [
    { value: 'peso', label: 'Peso (kg)' },
    { value: 'grasa', label: '% Grasa Corporal' },
    { value: 'musculo', label: '% Masa Muscular' },
    { value: 'pecho', label: 'Pecho (cm)' },
    { value: 'cintura', label: 'Cintura (cm)' },
    { value: 'cadera', label: 'Cadera (cm)' },
    { value: 'biceps', label: 'Bíceps (cm)' },
    { value: 'muslos', label: 'Muslos (cm)' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadTrends = async () => {
      if (selectedMedida) {
        setLoadingTrends(true)
        setError(null)
        try {
          const data = await fetchTrendsApi(selectedMedida)
          setTrendsData(data)
        } catch (error) {
          console.error('Error al cargar tendencias:', error)
          setError(error.message || 'Error al cargar tendencias')
          setTrendsData(null)
        } finally {
          setLoadingTrends(false)
        }
      }
    }

    loadTrends()
  }, [selectedMedida])

  const prepareChartData = () => {
    if (!historialMedidas || historialMedidas.length === 0) {
      return null
    }

    const sortedData = [...historialMedidas].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    )

    const labels = sortedData.map((item) => new Date(item.fecha))
    const values = sortedData.map((item) => {
      const value = item.medidas && item.medidas[selectedMedida]
      return value !== undefined ? value : null
    })

    return {
      labels,
      datasets: [
        {
          label:
            medidasOptions.find((opt) => opt.value === selectedMedida)?.label ||
            selectedMedida,
          data: values,
          borderColor: '#FF5A1F',
          backgroundColor: 'rgba(255, 90, 31, 0.2)',
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#FF5A1F',
          pointBorderColor: 'rgba(255, 255, 255, 0.8)',
          pointBorderWidth: 2
        }
      ]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'PPP',
          displayFormats: {
            day: 'dd MMM'
          }
        },
        adapters: {
          date: {
            locale: es
          }
        },
        title: {
          display: true,
          text: 'Fecha',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text:
            medidasOptions.find((opt) => opt.value === selectedMedida)?.label ||
            selectedMedida,
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        titleColor: '#FF5A1F',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 90, 31, 0.3)',
        borderWidth: 1,
        callbacks: {
          title: (context) => {
            if (
              context &&
              context[0] &&
              context[0].parsed &&
              context[0].parsed.x
            ) {
              const date = new Date(context[0].parsed.x)
              return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }
            return ''
          }
        }
      }
    }
  }

  const chartData = prepareChartData()

  const safeToFixed = (value, decimals = 2) => {
    if (value === undefined || value === null) return '0.00'
    return Number(value).toFixed(decimals)
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'aumento':
        return (
          <span className='cf-progreso-trend-icon cf-progreso-trend-up'></span>
        )
      case 'disminución':
        return (
          <span className='cf-progreso-trend-icon cf-progreso-trend-down'></span>
        )
      default:
        return (
          <span className='cf-progreso-trend-icon cf-progreso-trend-stable'></span>
        )
    }
  }

  const getTrendClass = (trend) => {
    switch (trend) {
      case 'aumento':
        return 'cf-progreso-trend-up-text'
      case 'disminución':
        return 'cf-progreso-trend-down-text'
      default:
        return 'cf-progreso-trend-stable-text'
    }
  }

  return (
    <div
      className={`cf-progreso-container ${
        animationComplete ? 'cf-progreso-fade-in' : ''
      }`}
    >
      <div className='cf-progreso-header'>
        <div className='cf-progreso-title-container'>
          <div className='cf-progreso-icon'></div>
          <h2 className='cf-progreso-title'>Seguimiento de Progreso</h2>
        </div>
        <div className='cf-progreso-subtitle'>
          Visualiza tu evolución a lo largo del tiempo
        </div>
      </div>

      <div className='cf-progreso-card'>
        <div className='cf-progreso-card-header'>
          <h3 className='cf-progreso-card-title'>
            <span className='cf-progreso-chart-icon'></span>
            Gráfico de Progreso
          </h3>
          <div className='cf-progreso-select-container'>
            <label htmlFor='medida-select'>Seleccionar medida:</label>
            <div className='cf-progreso-select-wrapper'>
              <select
                id='medida-select'
                value={selectedMedida}
                onChange={(e) => setSelectedMedida(e.target.value)}
                className='cf-progreso-select'
              >
                {medidasOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className='cf-progreso-select-arrow'></span>
            </div>
          </div>
        </div>

        <div className='cf-progreso-card-body'>
          {loading || loadingTrends ? (
            <div className='cf-progreso-loading'>
              <div className='cf-progreso-spinner'></div>
              <p>Cargando datos...</p>
            </div>
          ) : error ? (
            <div className='cf-progreso-error'>
              <span className='cf-progreso-error-icon'></span>
              <p>Error: {error}</p>
            </div>
          ) : historialMedidas.length < 2 ? (
            <div className='cf-progreso-no-data'>
              <span className='cf-progreso-no-data-icon'></span>
              <p>
                Se necesitan al menos dos mediciones para mostrar el progreso.
              </p>
              <p>Registra tus medidas regularmente para ver tu evolución.</p>
            </div>
          ) : (
            <div className='cf-progreso-chart-container'>
              {chartData && (
                <Line data={chartData} options={chartOptions} height={300} />
              )}
            </div>
          )}
        </div>
      </div>

      {trendsData && !error && !loadingTrends && (
        <div className='cf-progreso-tendencias-card'>
          <h3 className='cf-progreso-tendencias-title'>
            <span className='cf-progreso-analysis-icon'></span>
            Análisis de Tendencias
          </h3>
          <div className='cf-progreso-tendencias-grid'>
            <div className='cf-progreso-tendencia-item'>
              <div className='cf-progreso-tendencia-label'>
                <span className='cf-progreso-tendencia-icon cf-progreso-direction-icon'></span>
                Tendencia:
              </div>
              <div
                className={`cf-progreso-tendencia-value ${getTrendClass(
                  trendsData.tendencia
                )}`}
              >
                {getTrendIcon(trendsData.tendencia)}
                {trendsData.tendencia === 'aumento'
                  ? 'Aumento'
                  : trendsData.tendencia === 'disminución'
                  ? 'Disminución'
                  : 'Estable'}
              </div>
            </div>

            <div className='cf-progreso-tendencia-item'>
              <div className='cf-progreso-tendencia-label'>
                <span className='cf-progreso-tendencia-icon cf-progreso-change-icon'></span>
                Cambio total:
              </div>
              <div className='cf-progreso-tendencia-value'>
                {trendsData.diferencia > 0 ? '+' : ''}
                {safeToFixed(trendsData.diferencia)}
                {selectedMedida === 'peso'
                  ? ' kg'
                  : selectedMedida === 'grasa' || selectedMedida === 'musculo'
                  ? ' %'
                  : ' cm'}
              </div>
            </div>

            <div className='cf-progreso-tendencia-item'>
              <div className='cf-progreso-tendencia-label'>
                <span className='cf-progreso-tendencia-icon cf-progreso-rate-icon'></span>
                Tasa de cambio:
              </div>
              <div className='cf-progreso-tendencia-value'>
                {trendsData.tasaCambio > 0 ? '+' : ''}
                {safeToFixed(trendsData.tasaCambio)} {trendsData.unidad || ''}
              </div>
            </div>

            <div className='cf-progreso-tendencia-item'>
              <div className='cf-progreso-tendencia-label'>
                <span className='cf-progreso-tendencia-icon cf-progreso-calendar-icon'></span>
                Período analizado:
              </div>
              <div className='cf-progreso-tendencia-value'>
                {trendsData.valores && trendsData.valores.length > 0
                  ? `${new Date(
                      trendsData.valores[0].fecha
                    ).toLocaleDateString()} - 
                     ${new Date(
                       trendsData.valores[trendsData.valores.length - 1].fecha
                     ).toLocaleDateString()}`
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgresoTab
