import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMedicalForm } from '../hooks/useMedicalForm'
import {
  fetchMedicalInfo,
  handleBackNavigationWithChanges
} from '../utils/medicalFormHelpers'
import { FORM_SECTIONS } from '../constants/medicalConfig'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/loading'
import handleSubmitHelper from '../../../../../utils/HandleSubmit'
import alertService from '../../../../../components/sweealert2/sweealert2'
import MedicalAnimations from '../components/medical-form/MedicalAnimations'
import MedicalHeader from '../components/medical-form/MedicalHeader'
import MedicalSection from '../components/medical-form/MedicalSection'
import MedicalSubmitButton from '../components/medical-form/MedicalSubmitButton'
import './Medico.css'

const Medico = () => {
  const navigate = useNavigate()
  const {
    loading,
    setLoading,
    animationComplete,
    medicalInfo,
    setMedicalData,
    handleChange,
    checkFormChanges,
    resetChanges
  } = useMedicalForm()

  useEffect(() => {
    const loadMedicalData = async () => {
      setLoading(true)

      const dummySetLoading = () => {}

      await fetchMedicalInfo(dummySetLoading, setMedicalData)
      setTimeout(() => {
        setLoading(false)
      }, 0)
    }

    loadMedicalData()
  }, [setLoading, setMedicalData])

  const handleSubmit = useCallback(
    (e) => {
      handleSubmitHelper(e, 'medico', {
        medicalInfo,
        setLoading,
        onSuccess: () => {
          resetChanges()
        }
      })
    },
    [medicalInfo, setLoading, resetChanges]
  )

  const handleBackNavigation = useCallback(() => {
    handleBackNavigationWithChanges(checkFormChanges, navigate, alertService)
  }, [checkFormChanges, navigate])

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO FORMULARIO MÉDICO...'
      />
    )
  }

  return (
    <div className='cf-medico-container'>
      <MedicalAnimations />

      <Header />

      <div className='cf-medico-back-button'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div
        className={`cf-medico-form-wrapper ${
          animationComplete ? 'cf-medico-form-visible' : ''
        }`}
      >
        <MedicalHeader />

        <form onSubmit={handleSubmit} className='cf-medico-form'>
          {Object.entries(FORM_SECTIONS).map(([key, section]) => (
            <MedicalSection
              key={key}
              section={section}
              medicalInfo={medicalInfo}
              handleChange={handleChange}
            />
          ))}

          <MedicalSubmitButton loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default Medico
