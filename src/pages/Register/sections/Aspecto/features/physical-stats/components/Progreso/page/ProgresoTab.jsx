import { useState, useEffect } from 'react'
import usePhysicalStats from '../../../hooks/usePhysicalStats.js'
import { useTrends } from '../hooks/useTrends.js'
import ProgressHeader from '../components/ProgressHeader.jsx'
import ProgressChart from '../components/ProgressChart.jsx'
import TrendsAnalysis from '../components/TrendsAnalysis.jsx'
import './ProgresoTab.css'

const ProgresoTab = () => {
  const { historialMedidas, loading } = usePhysicalStats()
  const [selectedMedida, setSelectedMedida] = useState('peso')
  const [animationComplete, setAnimationComplete] = useState(false)

  const { trendsData, loadingTrends, error } = useTrends(selectedMedida)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const isLoading = loading || loadingTrends

  return (
    <div
      className={`cf-progreso-container ${
        animationComplete ? 'cf-progreso-fade-in' : ''
      }`}
    >
      <ProgressHeader />

      <ProgressChart
        historialMedidas={historialMedidas}
        selectedMedida={selectedMedida}
        onMedidaChange={setSelectedMedida}
        loading={isLoading}
        error={error}
      />

      {trendsData && !error && !loadingTrends && (
        <TrendsAnalysis
          trendsData={trendsData}
          selectedMedida={selectedMedida}
        />
      )}
    </div>
  )
}

export default ProgresoTab
