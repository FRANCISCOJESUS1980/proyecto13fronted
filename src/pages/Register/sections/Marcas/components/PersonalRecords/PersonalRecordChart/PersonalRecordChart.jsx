import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import './PersonalRecordChart.css'

const PersonalRecordsChart = ({ records, uniqueExercises }) => {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (uniqueExercises.length > 0 && !selectedExercise) {
      setSelectedExercise(uniqueExercises[0])
    }
  }, [uniqueExercises, selectedExercise])

  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedExercise) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/personal-records/stats?ejercicio=${encodeURIComponent(
            selectedExercise
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        if (!response.ok) {
          throw new Error('Error al cargar los datos del gráfico')
        }

        const data = await response.json()

        const formattedData = data.data.map((record) => ({
          fecha: new Date(record.fecha).toLocaleDateString(),
          peso: Number.parseFloat(record.peso),
          repeticiones: Number.parseInt(record.repeticiones || '1')
        }))

        setChartData(formattedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [selectedExercise])

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value)
  }

  if (records.length === 0) {
    return (
      <div className='chart-container empty-chart'>
        <h3>No hay suficientes datos para mostrar gráficos</h3>
        <p>Registra tus marcas personales para visualizar tu progreso.</p>
      </div>
    )
  }

  return (
    <div className='chart-container'>
      <div className='chart-header'>
        <h3>Progreso de Marcas Personales</h3>

        <div className='chart-controls'>
          <label htmlFor='exercise-select'>Selecciona un ejercicio:</label>
          <select
            id='exercise-select'
            value={selectedExercise}
            onChange={handleExerciseChange}
          >
            {uniqueExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='chart-content'>
        {isLoading ? (
          <div className='chart-loading'>Cargando datos...</div>
        ) : error ? (
          <div className='chart-error'>Error: {error}</div>
        ) : chartData.length === 0 ? (
          <div className='chart-empty'>
            No hay suficientes datos para este ejercicio.
          </div>
        ) : (
          <ResponsiveContainer width='100%' height={400}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 50
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='fecha' angle={-45} textAnchor='end' height={70} />
              <YAxis
                yAxisId='left'
                orientation='left'
                stroke='#8884d8'
                label={{
                  value: 'Peso (kg)',
                  angle: -90,
                  position: 'insideLeft'
                }}
              />
              <YAxis
                yAxisId='right'
                orientation='right'
                stroke='#82ca9d'
                label={{
                  value: 'Repeticiones',
                  angle: 90,
                  position: 'insideRight'
                }}
              />
              <Tooltip />
              <Legend verticalAlign='top' height={36} />
              <Line
                yAxisId='left'
                type='monotone'
                dataKey='peso'
                name='Peso (kg)'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId='right'
                type='monotone'
                dataKey='repeticiones'
                name='Repeticiones'
                stroke='#82ca9d'
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

PersonalRecordsChart.propTypes = {
  records: PropTypes.array.isRequired,
  uniqueExercises: PropTypes.array.isRequired
}

export default PersonalRecordsChart
