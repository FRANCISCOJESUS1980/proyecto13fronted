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
import { prepareChartData, getChartOptions } from '../utils/chartUtils.js'
import MeasureSelector from './MeasureSelector.jsx'
import NoDataMessage from './NoDataMessage.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import Loading from '../../../../../../../../../components/Loading/loading.jsx'

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

const ProgressChart = ({
  historialMedidas,
  selectedMedida,
  onMedidaChange,
  loading,
  error
}) => {
  const chartData = prepareChartData(historialMedidas, selectedMedida)
  const chartOptions = getChartOptions(selectedMedida)

  const renderContent = () => {
    if (loading) {
      return <Loading isVisible={true} loadingText='CARGANDO PROGRESO...' />
    }

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (!historialMedidas || historialMedidas.length < 2) {
      return <NoDataMessage />
    }

    return (
      <div className='cf-progreso-chart-container'>
        {chartData && (
          <Line data={chartData} options={chartOptions} height={300} />
        )}
      </div>
    )
  }

  return (
    <div className='cf-progreso-card'>
      <div className='cf-progreso-card-header'>
        <h3 className='cf-progreso-card-title'>
          <span className='cf-progreso-chart-icon'></span>
          Gráfico de Progreso
        </h3>
        <MeasureSelector
          selectedMedida={selectedMedida}
          onMedidaChange={onMedidaChange}
        />
      </div>
      <div className='cf-progreso-card-body'>{renderContent()}</div>
    </div>
  )
}

export default ProgressChart
