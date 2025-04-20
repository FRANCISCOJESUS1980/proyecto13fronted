import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts'
import './PersonalRecordChart.css'

const PersonalRecordsChart = ({ records, uniqueExercises }) => {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [chartType, setChartType] = useState('line')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .substr(-2)}`
  }

  useEffect(() => {
    if (uniqueExercises.length > 0 && !selectedExercise) {
      setSelectedExercise(uniqueExercises[0])
    }
  }, [uniqueExercises, selectedExercise])

  const chartData = useMemo(() => {
    if (!selectedExercise) return []

    const filteredRecords = records
      .filter((record) => record.ejercicio === selectedExercise)
      .map((record) => ({
        ...record,
        dateObj: new Date(record.fecha),
        peso: Number.parseFloat(record.peso),
        repeticiones: Number.parseInt(record.repeticiones || '1')
      }))
      .sort((a, b) => a.dateObj - b.dateObj)

    return filteredRecords.map((record) => ({
      _id: record._id,
      fecha: formatDate(record.fecha),
      fechaCompleta: new Date(record.fecha).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      peso: record.peso,
      repeticiones: record.repeticiones
    }))
  }, [records, selectedExercise])

  const maxWeight = useMemo(() => {
    if (chartData.length === 0) return 100
    return Math.ceil(Math.max(...chartData.map((item) => item.peso)) * 1.1)
  }, [chartData])

  const maxReps = useMemo(() => {
    if (chartData.length === 0) return 10
    return Math.ceil(
      Math.max(...chartData.map((item) => item.repeticiones)) * 1.2
    )
  }, [chartData])

  const avgWeight = useMemo(() => {
    if (chartData.length === 0) return 0
    const sum = chartData.reduce((acc, item) => acc + item.peso, 0)
    return Math.round((sum / chartData.length) * 10) / 10
  }, [chartData])

  const progressPercentage = useMemo(() => {
    if (chartData.length <= 1) return null
    const firstWeight = chartData[0].peso
    const lastWeight = chartData[chartData.length - 1].peso
    return ((lastWeight / firstWeight - 1) * 100).toFixed(1)
  }, [chartData])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='cf-custom-tooltip'>
          <p className='cf-tooltip-date'>{payload[0]?.payload.fechaCompleta}</p>
          <p className='cf-tooltip-weight'>
            <span className='cf-tooltip-label'>Peso:</span>
            <span className='cf-tooltip-value'>{payload[0]?.value} kg</span>
          </p>
          {payload[1] && (
            <p className='cf-tooltip-reps'>
              <span className='cf-tooltip-label'>Repeticiones:</span>
              <span className='cf-tooltip-value'>{payload[1]?.value}</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const chartColors = {
    weight: '#3366cc',
    reps: '#ff9933',
    avgLine: '#e53935',
    grid: '#e0e0e0',
    axis: '#9e9e9e'
  }

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value)
  }

  const handleChartTypeChange = (type) => {
    setChartType(type)
  }

  if (records.length === 0) {
    return (
      <div className='cf-chart-container cf-empty-chart'>
        <h3>No hay suficientes datos para mostrar gráficos</h3>
        <p>Registra tus marcas personales para visualizar tu progreso.</p>
      </div>
    )
  }

  return (
    <div className='cf-chart-container'>
      <div className='cf-chart-header'>
        <h3>Progreso de Marcas Personales</h3>

        <div className='cf-chart-controls'>
          <div className='cf-chart-select-container'>
            <label htmlFor='exercise-select'>Ejercicio:</label>
            <select
              id='exercise-select'
              value={selectedExercise}
              onChange={handleExerciseChange}
              className='cf-chart-select'
            >
              {uniqueExercises.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div className='cf-chart-type-selector'>
            <button
              className={`cf-chart-type-btn ${
                chartType === 'line' ? 'cf-active' : ''
              }`}
              onClick={() => handleChartTypeChange('line')}
            >
              Línea
            </button>
            <button
              className={`cf-chart-type-btn ${
                chartType === 'bar' ? 'cf-active' : ''
              }`}
              onClick={() => handleChartTypeChange('bar')}
            >
              Barras
            </button>
          </div>
        </div>
      </div>

      <div className='cf-chart-content'>
        {isLoading ? (
          <div className='cf-chart-loading'>
            <div className='cf-loading-spinner'></div>
            <p>Cargando datos...</p>
          </div>
        ) : error ? (
          <div className='cf-chart-error'>
            <p>Error: {error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className='cf-chart-empty'>
            <p>No hay suficientes datos para este ejercicio.</p>
          </div>
        ) : (
          <>
            <div className='cf-chart-stats'>
              <div className='cf-stat-card'>
                <div className='cf-stat-label'>Promedio</div>
                <div className='cf-stat-value'>{avgWeight} kg</div>
              </div>
              <div className='cf-stat-card'>
                <div className='cf-stat-label'>Máximo</div>
                <div className='cf-stat-value'>
                  {Math.max(...chartData.map((item) => item.peso))} kg
                </div>
              </div>
              <div className='cf-stat-card'>
                <div className='cf-stat-label'>Progreso</div>
                <div
                  className={`cf-stat-value ${
                    progressPercentage >= 0 ? 'cf-positive' : 'cf-negative'
                  }`}
                >
                  {progressPercentage !== null
                    ? `${progressPercentage}%`
                    : 'N/A'}
                </div>
              </div>
            </div>

            <div className='cf-chart-wrapper'>
              <ResponsiveContainer width='100%' height={400}>
                {chartType === 'line' ? (
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={chartColors.grid}
                    />
                    <XAxis
                      dataKey='fecha'
                      angle={-45}
                      textAnchor='end'
                      height={70}
                      tick={{ fill: chartColors.axis, fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis
                      yAxisId='left'
                      orientation='left'
                      stroke={chartColors.weight}
                      domain={[0, maxWeight]}
                      tickCount={6}
                      tick={{ fill: chartColors.axis }}
                    >
                      <Label
                        value='Peso (kg)'
                        angle={-90}
                        position='insideLeft'
                        style={{ textAnchor: 'middle', fill: chartColors.axis }}
                      />
                    </YAxis>
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke={chartColors.reps}
                      domain={[0, maxReps]}
                      tickCount={5}
                      tick={{ fill: chartColors.axis }}
                    >
                      <Label
                        value='Repeticiones'
                        angle={90}
                        position='insideRight'
                        style={{ textAnchor: 'middle', fill: chartColors.axis }}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign='top' height={36} />
                    <ReferenceLine
                      y={avgWeight}
                      yAxisId='left'
                      stroke={chartColors.avgLine}
                      strokeDasharray='3 3'
                      strokeWidth={2}
                    >
                      <Label
                        value={`Promedio: ${avgWeight} kg`}
                        position='insideBottomRight'
                        fill={chartColors.avgLine}
                      />
                    </ReferenceLine>
                    <Line
                      yAxisId='left'
                      type='monotone'
                      dataKey='peso'
                      name='Peso (kg)'
                      stroke={chartColors.weight}
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                      dot={{
                        stroke: chartColors.weight,
                        strokeWidth: 2,
                        r: 4,
                        fill: 'white'
                      }}
                    />
                    <Line
                      yAxisId='right'
                      type='monotone'
                      dataKey='repeticiones'
                      name='Repeticiones'
                      stroke={chartColors.reps}
                      strokeWidth={2}
                      dot={{
                        stroke: chartColors.reps,
                        strokeWidth: 2,
                        r: 4,
                        fill: 'white'
                      }}
                    />
                  </LineChart>
                ) : (
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={chartColors.grid}
                    />
                    <XAxis
                      dataKey='fecha'
                      angle={-45}
                      textAnchor='end'
                      height={70}
                      tick={{ fill: chartColors.axis, fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis
                      yAxisId='left'
                      orientation='left'
                      stroke={chartColors.weight}
                      domain={[0, maxWeight]}
                      tickCount={6}
                      tick={{ fill: chartColors.axis }}
                    >
                      <Label
                        value='Peso (kg)'
                        angle={-90}
                        position='insideLeft'
                        style={{ textAnchor: 'middle', fill: chartColors.axis }}
                      />
                    </YAxis>
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke={chartColors.reps}
                      domain={[0, maxReps]}
                      tickCount={5}
                      tick={{ fill: chartColors.axis }}
                    >
                      <Label
                        value='Repeticiones'
                        angle={90}
                        position='insideRight'
                        style={{ textAnchor: 'middle', fill: chartColors.axis }}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign='top' height={36} />
                    <ReferenceLine
                      y={avgWeight}
                      yAxisId='left'
                      stroke={chartColors.avgLine}
                      strokeDasharray='3 3'
                      strokeWidth={2}
                    >
                      <Label
                        value={`Promedio: ${avgWeight} kg`}
                        position='insideBottomRight'
                        fill={chartColors.avgLine}
                      />
                    </ReferenceLine>
                    <Bar
                      yAxisId='left'
                      dataKey='peso'
                      name='Peso (kg)'
                      fill={chartColors.weight}
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.8}
                    />
                    <Bar
                      yAxisId='right'
                      dataKey='repeticiones'
                      name='Repeticiones'
                      fill={chartColors.reps}
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.8}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </>
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
