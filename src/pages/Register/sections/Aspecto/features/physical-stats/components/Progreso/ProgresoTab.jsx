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
import Card from '../ui/Card/Card'
import Select from '../ui/Select/Select'
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
  console.log('hola manu')
  const { historialMedidas, loading } = usePhysicalStats()
  const [selectedMedida, setSelectedMedida] = useState('peso')
  const [trendsData, setTrendsData] = useState(null)
  const [loadingTrends, setLoadingTrends] = useState(false)

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
    const loadTrends = async () => {
      if (selectedMedida) {
        setLoadingTrends(true)
        try {
          const data = await fetchTrendsApi(selectedMedida)
          setTrendsData(data)
        } catch (error) {
          console.error('Error al cargar tendencias:', error)
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
    const values = sortedData.map(
      (item) => item.medidas[selectedMedida] || null
    )

    return {
      labels,
      datasets: [
        {
          label:
            medidasOptions.find((opt) => opt.value === selectedMedida)?.label ||
            selectedMedida,
          data: values,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7
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
          text: 'Fecha'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text:
            medidasOptions.find((opt) => opt.value === selectedMedida)?.label ||
            selectedMedida
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const date = new Date(context[0].parsed.x)
            return date.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        }
      }
    }
  }

  const chartData = prepareChartData()
  console.log('hola manu vamos avanzando')
  return (
    <div className='progreso-container'>
      <Card className='progreso-card'>
        <div className='progreso-header'>
          <h3>Progreso de Medidas</h3>
          <Select
            options={medidasOptions}
            value={selectedMedida}
            onChange={(e) => setSelectedMedida(e.target.value)}
            label='Seleccionar medida'
          />
        </div>

        {loading || loadingTrends ? (
          <div className='loading-container'>
            <div className='loading-spinner'>Cargando datos...</div>
          </div>
        ) : historialMedidas.length < 2 ? (
          <div className='no-data'>
            <p>
              Se necesitan al menos dos mediciones para mostrar el progreso.
            </p>
            <p>Registra tus medidas regularmente para ver tu evolución.</p>
          </div>
        ) : (
          <div className='chart-container'>
            {chartData && (
              <Line data={chartData} options={chartOptions} height={300} />
            )}
          </div>
        )}
      </Card>

      {trendsData && (
        <Card className='tendencias-card'>
          <h3>Análisis de Tendencias</h3>
          <div className='tendencias-grid'>
            <div className='tendencia-item'>
              <span className='tendencia-label'>Tendencia:</span>
              <span className={`tendencia-value ${trendsData.tendencia}`}>
                {trendsData.tendencia === 'aumento'
                  ? '↗️ Aumento'
                  : trendsData.tendencia === 'disminución'
                  ? '↘️ Disminución'
                  : '➡️ Estable'}
              </span>
            </div>

            <div className='tendencia-item'>
              <span className='tendencia-label'>Cambio total:</span>
              <span className='tendencia-value'>
                {trendsData.diferencia > 0 ? '+' : ''}
                {trendsData.diferencia.toFixed(2)}
                {selectedMedida === 'peso'
                  ? ' kg'
                  : selectedMedida === 'grasa' || selectedMedida === 'musculo'
                  ? ' %'
                  : ' cm'}
              </span>
            </div>

            <div className='tendencia-item'>
              <span className='tendencia-label'>Tasa de cambio:</span>
              <span className='tendencia-value'>
                {trendsData.tasaCambio > 0 ? '+' : ''}
                {trendsData.tasaCambio} {trendsData.unidad}
              </span>
            </div>

            <div className='tendencia-item'>
              <span className='tendencia-label'>Período analizado:</span>
              <span className='tendencia-value'>
                {trendsData.valores.length > 0
                  ? `${new Date(
                      trendsData.valores[0].fecha
                    ).toLocaleDateString()} - 
                   ${new Date(
                     trendsData.valores[trendsData.valores.length - 1].fecha
                   ).toLocaleDateString()}`
                  : 'N/A'}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ProgresoTab
