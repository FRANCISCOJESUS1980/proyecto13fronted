import { useState } from 'react'
import { memo, useMemo, useReducer, useEffect, useCallback } from 'react'
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
import {
  chartReducer,
  initialChartState
} from '../../../reducers/chartReducer.js'
import {
  CHART_ACTION_TYPES,
  CHART_TYPES,
  CHART_COLORS
} from '../../../constants/personalRecordsConstants.js'
import {
  prepareChartData,
  calculateChartStats
} from '../../../utils/chartUtils.js'
import ChartControls from '../../ChartControls.jsx'
import ChartStats from '../../ChartStats.jsx'
import CustomTooltip from '../../CustomTooltip.jsx'
import './PersonalRecordChart.css'

const PersonalRecordsChart = memo(({ records, uniqueExercises }) => {
  const [state, dispatch] = useReducer(chartReducer, initialChartState)

  useEffect(() => {
    if (uniqueExercises.length > 0 && !state.selectedExercise) {
      dispatch({
        type: CHART_ACTION_TYPES.SET_SELECTED_EXERCISE,
        payload: uniqueExercises[0]
      })
    }
  }, [uniqueExercises, state.selectedExercise])

  const chartData = useMemo(
    () => prepareChartData(records, state.selectedExercise),
    [records, state.selectedExercise]
  )

  const chartStats = useMemo(() => calculateChartStats(chartData), [chartData])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getChartConfig = useCallback(() => {
    if (isMobile) {
      return {
        margin: { top: 5, right: 5, left: 5, bottom: 35 },
        height: window.innerHeight * 0.35,
        xAxisProps: {
          angle: -90,
          textAnchor: 'end',
          height: 60,
          tick: { fill: CHART_COLORS.axis, fontSize: 9 },
          tickMargin: 2,
          interval: 0
        },
        yAxisProps: {
          tick: { fill: CHART_COLORS.axis, fontSize: 9 },
          width: 35
        },
        legendProps: {
          verticalAlign: 'bottom',
          height: 30,
          wrapperStyle: {
            fontSize: '11px',
            paddingTop: '5px',
            lineHeight: '1.2'
          }
        }
      }
    }

    return {
      margin: { top: 20, right: 30, left: 20, bottom: 60 },
      height: 400,
      xAxisProps: {
        angle: -45,
        textAnchor: 'end',
        height: 70,
        tick: { fill: CHART_COLORS.axis, fontSize: 12 },
        tickMargin: 10
      },
      yAxisProps: {
        tick: { fill: CHART_COLORS.axis }
      },
      legendProps: {
        verticalAlign: 'top',
        height: 36
      }
    }
  }, [isMobile])

  const chartConfig = getChartConfig()

  const handleExerciseChange = useCallback((exercise) => {
    dispatch({
      type: CHART_ACTION_TYPES.SET_SELECTED_EXERCISE,
      payload: exercise
    })
  }, [])

  const handleChartTypeChange = useCallback((type) => {
    dispatch({
      type: CHART_ACTION_TYPES.SET_CHART_TYPE,
      payload: type
    })
  }, [])

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
        <ChartControls
          selectedExercise={state.selectedExercise}
          chartType={state.chartType}
          uniqueExercises={uniqueExercises}
          onExerciseChange={handleExerciseChange}
          onChartTypeChange={handleChartTypeChange}
          isMobile={isMobile}
        />
      </div>

      <div className='cf-chart-content'>
        {state.loading ? (
          <div className='cf-chart-loading'>
            <div className='cf-loading-spinner'></div>
            <p>Cargando datos...</p>
          </div>
        ) : state.error ? (
          <div className='cf-chart-error'>
            <p>Error: {state.error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className='cf-chart-empty'>
            <p>No hay suficientes datos para este ejercicio.</p>
          </div>
        ) : (
          <>
            <ChartStats
              chartData={chartData}
              chartStats={chartStats}
              isMobile={isMobile}
            />
            <div className='cf-chart-wrapper'>
              <ResponsiveContainer width='100%' height={chartConfig.height}>
                {state.chartType === CHART_TYPES.LINE ? (
                  <LineChart data={chartData} margin={chartConfig.margin}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={CHART_COLORS.grid}
                    />
                    <XAxis dataKey='fecha' {...chartConfig.xAxisProps} />
                    <YAxis
                      yAxisId='left'
                      orientation='left'
                      stroke={CHART_COLORS.weight}
                      domain={[0, chartStats.maxWeight]}
                      tickCount={isMobile ? 3 : 6}
                      {...chartConfig.yAxisProps}
                    >
                      {!isMobile && (
                        <Label
                          value='Peso (kg)'
                          angle={-90}
                          position='insideLeft'
                          style={{
                            textAnchor: 'middle',
                            fill: CHART_COLORS.axis
                          }}
                        />
                      )}
                    </YAxis>
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke={CHART_COLORS.reps}
                      domain={[0, chartStats.maxReps]}
                      tickCount={isMobile ? 2 : 5}
                      {...chartConfig.yAxisProps}
                    >
                      {!isMobile && (
                        <Label
                          value='Repeticiones'
                          angle={90}
                          position='insideRight'
                          style={{
                            textAnchor: 'middle',
                            fill: CHART_COLORS.axis
                          }}
                        />
                      )}
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend {...chartConfig.legendProps} />
                    <ReferenceLine
                      y={chartStats.avgWeight}
                      yAxisId='left'
                      stroke={CHART_COLORS.avgLine}
                      strokeDasharray='3 3'
                      strokeWidth={isMobile ? 4 : 2}
                    >
                      <Label
                        value={`Promedio: ${chartStats.avgWeight} kg`}
                        position={
                          isMobile ? 'insideTopRight' : 'insideBottomRight'
                        }
                        fill={CHART_COLORS.avgLine}
                        fontSize={isMobile ? 12 : 12}
                        fontWeight={isMobile ? 600 : 600}
                      />
                    </ReferenceLine>
                    <Line
                      yAxisId='left'
                      type='monotone'
                      dataKey='peso'
                      name='Peso (kg)'
                      stroke={CHART_COLORS.weight}
                      activeDot={{ r: isMobile ? 6 : 8 }}
                      strokeWidth={isMobile ? 2 : 3}
                      dot={{
                        stroke: CHART_COLORS.weight,
                        strokeWidth: 2,
                        r: isMobile ? 3 : 4,
                        fill: 'white'
                      }}
                    />
                    <Line
                      yAxisId='right'
                      type='monotone'
                      dataKey='repeticiones'
                      name='Repeticiones'
                      stroke={CHART_COLORS.reps}
                      strokeWidth={2}
                      dot={{
                        stroke: CHART_COLORS.reps,
                        strokeWidth: 2,
                        r: isMobile ? 3 : 4,
                        fill: 'white'
                      }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={chartData} margin={chartConfig.margin}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={CHART_COLORS.grid}
                    />
                    <XAxis dataKey='fecha' {...chartConfig.xAxisProps} />
                    <YAxis
                      yAxisId='left'
                      orientation='left'
                      stroke={CHART_COLORS.weight}
                      domain={[0, chartStats.maxWeight]}
                      tickCount={isMobile ? 3 : 6}
                      {...chartConfig.yAxisProps}
                    >
                      {!isMobile && (
                        <Label
                          value='Peso (kg)'
                          angle={-90}
                          position='insideLeft'
                          style={{
                            textAnchor: 'middle',
                            fill: CHART_COLORS.axis
                          }}
                        />
                      )}
                    </YAxis>
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke={CHART_COLORS.reps}
                      domain={[0, chartStats.maxReps]}
                      tickCount={isMobile ? 2 : 5}
                      {...chartConfig.yAxisProps}
                    >
                      {!isMobile && (
                        <Label
                          value='Repeticiones'
                          angle={90}
                          position='insideRight'
                          style={{
                            textAnchor: 'middle',
                            fill: CHART_COLORS.axis
                          }}
                        />
                      )}
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend {...chartConfig.legendProps} />
                    <ReferenceLine
                      y={chartStats.avgWeight}
                      yAxisId='left'
                      stroke={CHART_COLORS.avgLine}
                      strokeDasharray='3 3'
                      strokeWidth={isMobile ? 4 : 2}
                    >
                      <Label
                        value={`Promedio: ${chartStats.avgWeight} kg`}
                        position={
                          isMobile ? 'insideTopRight' : 'insideBottomRight'
                        }
                        fill={CHART_COLORS.avgLine}
                        fontSize={isMobile ? 12 : 12}
                        fontWeight={isMobile ? 600 : 600}
                      />
                    </ReferenceLine>
                    <Bar
                      yAxisId='left'
                      dataKey='peso'
                      name='Peso (kg)'
                      fill={CHART_COLORS.weight}
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.8}
                    />
                    <Bar
                      yAxisId='right'
                      dataKey='repeticiones'
                      name='Repeticiones'
                      fill={CHART_COLORS.reps}
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
})

PersonalRecordsChart.displayName = 'PersonalRecordsChart'

PersonalRecordsChart.propTypes = {
  records: PropTypes.array.isRequired,
  uniqueExercises: PropTypes.array.isRequired
}

export default PersonalRecordsChart
