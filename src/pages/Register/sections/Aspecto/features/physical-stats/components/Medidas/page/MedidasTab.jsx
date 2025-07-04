import { useState, useEffect } from 'react'
import MedidasHeader from '../components/MedidasHeader'
import MedidasForm from '../components/MedidasForm'
import useMedidasForm from '../hooks/useMedidasForm'
import usePhysicalStats from '../../../hooks/usePhysicalStats'
import alertService from '../../../../../../../../../components/sweealert2/sweealert2'
import './MedidasTab.css'

const MedidasTab = ({ onMessage }) => {
  const { stats, loading, saveStats, fetchLatestStats } = usePhysicalStats()
  const [animationComplete, setAnimationComplete] = useState(false)

  const {
    formData,
    hasUnsavedChanges,
    isInitialized,
    initializeForm,
    handleChange,
    resetUnsavedChanges,
    getFormDataAsNumbers
  } = useMedidasForm()

  useEffect(() => {
    window.medidasHasUnsavedChanges = false
    return () => {
      window.medidasHasUnsavedChanges = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadLatestStats = async () => {
      try {
        await fetchLatestStats()
      } catch (error) {
        console.error('Error al cargar las últimas medidas:', error)
      }
    }
    loadLatestStats()
  }, [fetchLatestStats])

  useEffect(() => {
    if (stats && !isInitialized) {
      console.log('Medidas cargadas:', stats)
      initializeForm(stats)
    }
  }, [stats, isInitialized, initializeForm])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const numericData = getFormDataAsNumbers()
      const result = await saveStats(numericData)

      if (result.success) {
        resetUnsavedChanges()

        alertService.success(
          '¡Éxito!',
          'Tus medidas han sido guardadas correctamente.'
        )

        onMessage({
          text: result.message,
          type: 'success'
        })
      } else {
        alertService.error(
          'Error',
          result.message || 'No se pudieron guardar las medidas.'
        )

        onMessage({
          text: result.message,
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error al guardar medidas:', error)

      alertService.error(
        'Error',
        'Ocurrió un error inesperado al guardar las medidas.'
      )

      onMessage({
        text: 'Error inesperado',
        type: 'error'
      })
    }
  }

  return (
    <div
      className={`cf-medidas-container ${
        animationComplete ? 'cf-medidas-fade-in' : ''
      }`}
    >
      <MedidasHeader />
      <div className='cf-medidas-card'>
        <MedidasForm
          formData={formData}
          loading={loading}
          hasUnsavedChanges={hasUnsavedChanges}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default MedidasTab
