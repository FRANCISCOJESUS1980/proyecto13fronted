import { useState, useEffect, useRef } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import alertService from '../../../../../../../../components/sweealert2/sweealert2'
import './MedidasTab.css'

const MedidasTab = ({ onMessage }) => {
  const { stats, loading, saveStats, fetchLatestStats } = usePhysicalStats()
  const [animationComplete, setAnimationComplete] = useState(false)
  const originalDataRef = useRef(null)

  const [formData, setFormData] = useState({
    altura: '',
    peso: '',
    grasa: '',
    musculo: '',
    pecho: '',
    cintura: '',
    cadera: '',
    biceps: '',
    muslos: ''
  })

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
    if (stats) {
      console.log('Medidas cargadas:', stats)
      const newFormData = {
        altura: stats.altura || '',
        peso: stats.peso || '',
        grasa: stats.grasa || '',
        musculo: stats.musculo || '',
        pecho: stats.pecho || '',
        cintura: stats.cintura || '',
        cadera: stats.cadera || '',
        biceps: stats.biceps || '',
        muslos: stats.muslos || ''
      }
      setFormData(newFormData)

      originalDataRef.current = JSON.stringify(newFormData)
      window.medidasHasUnsavedChanges = false
    }
  }, [stats])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    const updatedData = {
      ...formData,
      [name]: value
    }
    const currentData = JSON.stringify(updatedData)
    window.medidasHasUnsavedChanges = originalDataRef.current !== currentData
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const numericData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? '' : Number(value)
      return acc
    }, {})

    const result = await saveStats(numericData)

    if (result.success) {
      originalDataRef.current = JSON.stringify(formData)
      window.medidasHasUnsavedChanges = false

      alertService.success(
        '¡Éxito!',
        'Tus medidas han sido guardadas correctamente.'
      )
    } else {
      alertService.error(
        'Error',
        result.message || 'No se pudieron guardar las medidas.'
      )
    }

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  return (
    <div
      className={`cf-medidas-container ${
        animationComplete ? 'cf-medidas-fade-in' : ''
      }`}
    >
      <div className='cf-medidas-header'>
        <div className='cf-medidas-title-container'>
          <div className='cf-medidas-icon'></div>
          <h2 className='cf-medidas-title'>Medidas Corporales</h2>
        </div>
        <div className='cf-medidas-subtitle'>
          Registra tus medidas para seguir tu progreso
        </div>
      </div>

      <div className='cf-medidas-card'>
        <form onSubmit={handleSubmit} className='cf-medidas-form'>
          <div className='cf-medidas-grid'>
            <div className='cf-medidas-section'>
              <h3 className='cf-medidas-section-title'>
                <span className='cf-medidas-section-icon cf-medidas-basic-icon'></span>
                Medidas Básicas
              </h3>
              <div className='cf-medidas-fields'>
                <div className='cf-medidas-form-group'>
                  <label htmlFor='altura'>
                    <span className='cf-medidas-field-icon cf-medidas-altura-icon'></span>
                    Altura (cm)
                  </label>
                  <input
                    type='number'
                    id='altura'
                    name='altura'
                    value={formData.altura}
                    onChange={handleChange}
                    placeholder='175'
                    className='cf-medidas-input'
                  />
                </div>

                <div className='cf-medidas-form-group'>
                  <label htmlFor='peso'>
                    <span className='cf-medidas-field-icon cf-medidas-peso-icon'></span>
                    Peso (kg)
                  </label>
                  <input
                    type='number'
                    id='peso'
                    name='peso'
                    value={formData.peso}
                    onChange={handleChange}
                    placeholder='75'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>
              </div>
            </div>

            <div className='cf-medidas-section'>
              <h3 className='cf-medidas-section-title'>
                <span className='cf-medidas-section-icon cf-medidas-composition-icon'></span>
                Composición Corporal
              </h3>
              <div className='cf-medidas-fields'>
                <div className='cf-medidas-form-group'>
                  <label htmlFor='grasa'>
                    <span className='cf-medidas-field-icon cf-medidas-grasa-icon'></span>
                    % Grasa Corporal
                  </label>
                  <input
                    type='number'
                    id='grasa'
                    name='grasa'
                    value={formData.grasa}
                    onChange={handleChange}
                    placeholder='15'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>

                <div className='cf-medidas-form-group'>
                  <label htmlFor='musculo'>
                    <span className='cf-medidas-field-icon cf-medidas-musculo-icon'></span>
                    % Masa Muscular
                  </label>
                  <input
                    type='number'
                    id='musculo'
                    name='musculo'
                    value={formData.musculo}
                    onChange={handleChange}
                    placeholder='40'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>
              </div>
            </div>

            <div className='cf-medidas-section'>
              <h3 className='cf-medidas-section-title'>
                <span className='cf-medidas-section-icon cf-medidas-torso-icon'></span>
                Torso
              </h3>
              <div className='cf-medidas-fields'>
                <div className='cf-medidas-form-group'>
                  <label htmlFor='pecho'>
                    <span className='cf-medidas-field-icon cf-medidas-pecho-icon'></span>
                    Pecho (cm)
                  </label>
                  <input
                    type='number'
                    id='pecho'
                    name='pecho'
                    value={formData.pecho}
                    onChange={handleChange}
                    placeholder='100'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>

                <div className='cf-medidas-form-group'>
                  <label htmlFor='cintura'>
                    <span className='cf-medidas-field-icon cf-medidas-cintura-icon'></span>
                    Cintura (cm)
                  </label>
                  <input
                    type='number'
                    id='cintura'
                    name='cintura'
                    value={formData.cintura}
                    onChange={handleChange}
                    placeholder='80'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>

                <div className='cf-medidas-form-group'>
                  <label htmlFor='cadera'>
                    <span className='cf-medidas-field-icon cf-medidas-cadera-icon'></span>
                    Cadera (cm)
                  </label>
                  <input
                    type='number'
                    id='cadera'
                    name='cadera'
                    value={formData.cadera}
                    onChange={handleChange}
                    placeholder='95'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>
              </div>
            </div>

            <div className='cf-medidas-section'>
              <h3 className='cf-medidas-section-title'>
                <span className='cf-medidas-section-icon cf-medidas-extremities-icon'></span>
                Extremidades
              </h3>
              <div className='cf-medidas-fields'>
                <div className='cf-medidas-form-group'>
                  <label htmlFor='biceps'>
                    <span className='cf-medidas-field-icon cf-medidas-biceps-icon'></span>
                    Bíceps (cm)
                  </label>
                  <input
                    type='number'
                    id='biceps'
                    name='biceps'
                    value={formData.biceps}
                    onChange={handleChange}
                    placeholder='35'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>

                <div className='cf-medidas-form-group'>
                  <label htmlFor='muslos'>
                    <span className='cf-medidas-field-icon cf-medidas-muslos-icon'></span>
                    Muslos (cm)
                  </label>
                  <input
                    type='number'
                    id='muslos'
                    name='muslos'
                    value={formData.muslos}
                    onChange={handleChange}
                    placeholder='55'
                    step='0.1'
                    className='cf-medidas-input'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='cf-medidas-actions'>
            <button
              type='submit'
              className='cf-medidas-save-btn'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='cf-medidas-spinner'></span>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <span className='cf-medidas-save-icon'></span>
                  <span>Guardar Medidas</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MedidasTab
