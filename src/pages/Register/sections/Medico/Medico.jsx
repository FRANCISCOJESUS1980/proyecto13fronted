import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getUserMedicalInfo,
  saveMedicalInfo
} from '../../../../services/Api/index'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import handleSubmitHelper from '../../../../utils/HandleSubmit'
import './Medico.css'

const Medico = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [animationComplete, setAnimationComplete] = useState(false)
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: '',
    allergies: '',
    conditions: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    lastCheckup: '',
    doctorName: '',
    doctorPhone: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        const data = await getUserMedicalInfo(token)
        setMedicalInfo(data)
      } catch (error) {
        console.error('Error al obtener información médica:', error)
        setMessage({
          text: 'Error al cargar la información médica',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalInfo()
  }, [])

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'medico', { medicalInfo, setLoading, setMessage })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading && !medicalInfo.bloodType) {
    return (
      <div className='cf-medico-loading'>
        <div className='cf-medico-spinner'></div>
        Cargando información médica...
      </div>
    )
  }

  return (
    <div className='cf-medico-container'>
      <div className='cf-medico-animation-wrapper'>
        <div className='cf-medico-heartbeat-anim'></div>
        <div className='cf-medico-pulse-anim'></div>
      </div>

      <Header />

      <div className='cf-medico-back-button'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
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
        <div className='cf-medico-logo-wrapper'>
          <div className='cf-medico-health-logo'></div>
        </div>

        <h1 className='cf-medico-heading'>Información Médica</h1>

        {message.text && (
          <div className={`cf-medico-message cf-medico-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className='cf-medico-form'>
          <div className='cf-medico-section'>
            <h2 className='cf-medico-section-title'>
              <span className='cf-medico-section-icon cf-medico-basic-icon'></span>
              Información Básica
            </h2>
            <div className='cf-medico-grid'>
              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-blood-icon'></span>
                <label htmlFor='bloodType'>Tipo de Sangre</label>
                <select
                  id='bloodType'
                  name='bloodType'
                  value={medicalInfo.bloodType}
                  onChange={handleChange}
                  required
                  className='cf-medico-select-input'
                >
                  <option value=''>Seleccionar...</option>
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='AB+'>AB+</option>
                  <option value='AB-'>AB-</option>
                  <option value='O+'>O+</option>
                  <option value='O-'>O-</option>
                </select>
              </div>

              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-calendar-icon'></span>
                <label htmlFor='lastCheckup'>Último Chequeo Médico</label>
                <input
                  type='date'
                  id='lastCheckup'
                  name='lastCheckup'
                  value={medicalInfo.lastCheckup}
                  onChange={handleChange}
                  className='cf-medico-text-input'
                />
              </div>
            </div>
          </div>

          <div className='cf-medico-section'>
            <h2 className='cf-medico-section-title'>
              <span className='cf-medico-section-icon cf-medico-conditions-icon'></span>
              Condiciones Médicas
            </h2>
            <div className='cf-medico-grid'>
              <div className='cf-medico-input-field cf-medico-full-width'>
                <span className='cf-medico-input-icon cf-medico-allergy-icon'></span>
                <label htmlFor='allergies'>Alergias</label>
                <textarea
                  id='allergies'
                  name='allergies'
                  value={medicalInfo.allergies}
                  onChange={handleChange}
                  placeholder='Lista tus alergias...'
                  className='cf-medico-textarea'
                />
              </div>

              <div className='cf-medico-input-field cf-medico-full-width'>
                <span className='cf-medico-input-icon cf-medico-medical-icon'></span>
                <label htmlFor='conditions'>Condiciones Médicas</label>
                <textarea
                  id='conditions'
                  name='conditions'
                  value={medicalInfo.conditions}
                  onChange={handleChange}
                  placeholder='Lista cualquier condición médica relevante...'
                  className='cf-medico-textarea'
                />
              </div>

              <div className='cf-medico-input-field cf-medico-full-width'>
                <span className='cf-medico-input-icon cf-medico-pill-icon'></span>
                <label htmlFor='medications'>Medicamentos</label>
                <textarea
                  id='medications'
                  name='medications'
                  value={medicalInfo.medications}
                  onChange={handleChange}
                  placeholder='Lista los medicamentos que tomas regularmente...'
                  className='cf-medico-textarea'
                />
              </div>
            </div>
          </div>

          <div className='cf-medico-section'>
            <h2 className='cf-medico-section-title'>
              <span className='cf-medico-section-icon cf-medico-emergency-icon'></span>
              Contactos de Emergencia
            </h2>
            <div className='cf-medico-grid'>
              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-contact-icon'></span>
                <label htmlFor='emergencyContact'>Nombre del Contacto</label>
                <input
                  type='text'
                  id='emergencyContact'
                  name='emergencyContact'
                  value={medicalInfo.emergencyContact}
                  onChange={handleChange}
                  placeholder='Nombre completo'
                  required
                  className='cf-medico-text-input'
                />
              </div>

              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-phone-icon'></span>
                <label htmlFor='emergencyPhone'>Teléfono de Emergencia</label>
                <input
                  type='tel'
                  id='emergencyPhone'
                  name='emergencyPhone'
                  value={medicalInfo.emergencyPhone}
                  onChange={handleChange}
                  placeholder='Número de teléfono'
                  required
                  className='cf-medico-text-input'
                />
              </div>

              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-doctor-icon'></span>
                <label htmlFor='doctorName'>Médico de Cabecera</label>
                <input
                  type='text'
                  id='doctorName'
                  name='doctorName'
                  value={medicalInfo.doctorName}
                  onChange={handleChange}
                  placeholder='Nombre del médico'
                  className='cf-medico-text-input'
                />
              </div>

              <div className='cf-medico-input-field'>
                <span className='cf-medico-input-icon cf-medico-phone-icon'></span>
                <label htmlFor='doctorPhone'>Teléfono del Médico</label>
                <input
                  type='tel'
                  id='doctorPhone'
                  name='doctorPhone'
                  value={medicalInfo.doctorPhone}
                  onChange={handleChange}
                  placeholder='Número de teléfono'
                  className='cf-medico-text-input'
                />
              </div>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='cf-medico-submit-button'
          >
            <span className={loading ? 'cf-medico-hidden-text' : ''}>
              Guardar Información Médica
              <span className='cf-medico-arrow-right'></span>
            </span>

            {loading && (
              <div className='cf-medico-loader-wrapper'>
                <div className='cf-medico-spinner'></div>
              </div>
            )}

            <div className='cf-medico-progress-container'>
              <div className='cf-medico-progress-indicator'></div>
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Medico
