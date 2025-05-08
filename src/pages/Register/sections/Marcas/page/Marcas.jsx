import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import PersonalRecordForm from '../components/PersonalRecords/PersonalRecordForm/PersonalRecordForm'
import PersonalRecordsList from '../components/PersonalRecords/PersonalRecordList/PersonalRecordList'
import PersonalRecordsChart from '../components/PersonalRecords/PersonalRecordChart/PersonalRecordChart'
import alertService from '../../../../../components/sweealert2/sweealert2'
import {
  fetchPersonalRecordsApi,
  fetchUniqueExercisesApi,
  addPersonalRecordApi,
  updatePersonalRecordApi,
  deletePersonalRecordApi
} from '../../../../../services/Api/index'
import './Marcas.css'

const PersonalRecordsPage = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [uniqueExercises, setUniqueExercises] = useState([])
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const data = await fetchPersonalRecordsApi()

      console.log('Datos recibidos de fetchPersonalRecordsApi:', data)

      const processedData = Array.isArray(data)
        ? data.map((record) => ({
            _id: record._id,
            ejercicio: record.ejercicio || '',
            categoria: record.categoria || 'Sin categoría',
            peso: record.peso || 0,
            repeticiones: record.repeticiones || '1',
            fecha: record.fecha || new Date().toISOString()
          }))
        : []

      setRecords(processedData)
    } catch (err) {
      setError(err.message)
      alertService.error('Error', 'Error al cargar las marcas personales')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUniqueExercises = async () => {
    try {
      const data = await fetchUniqueExercisesApi()
      setUniqueExercises(data)
    } catch (err) {
      console.error('Error al cargar ejercicios:', err)
    }
  }

  useEffect(() => {
    fetchRecords()
    fetchUniqueExercises()
  }, [])

  const handleAddRecord = async (record) => {
    try {
      const result = await addPersonalRecordApi(record)

      console.log('Resultado de addPersonalRecordApi:', result)

      const newRecord = {
        _id: result.data._id,
        ejercicio: result.data.ejercicio || record.ejercicio || '',
        categoria: result.data.categoria || record.categoria || 'Sin categoría',
        peso: result.data.peso || record.peso || 0,
        repeticiones: result.data.repeticiones || record.repeticiones || '1',
        fecha: result.data.fecha || record.fecha || new Date().toISOString()
      }

      setRecords([newRecord, ...records])
      setShowForm(false)
      alertService.success('¡Éxito!', '¡Marca personal guardada con éxito!')

      if (!uniqueExercises.includes(record.ejercicio)) {
        setUniqueExercises([...uniqueExercises, record.ejercicio])
      }
    } catch (err) {
      alertService.error('Error', err.message)
    }
  }

  const handleDeleteRecord = async (id) => {
    try {
      await deletePersonalRecordApi(id)
      setRecords(records.filter((record) => record._id !== id))
      alertService.success('¡Éxito!', 'Marca personal eliminada correctamente')
    } catch (err) {
      alertService.error('Error', err.message)
    }
  }

  const handleEditRecord = async (id, updatedRecord) => {
    try {
      const result = await updatePersonalRecordApi(id, updatedRecord)

      console.log('Resultado de updatePersonalRecordApi:', result)

      const processedRecord = {
        _id: id,
        ejercicio: result.data.ejercicio || updatedRecord.ejercicio || '',
        categoria:
          result.data.categoria || updatedRecord.categoria || 'Sin categoría',
        peso: result.data.peso || updatedRecord.peso || 0,
        repeticiones:
          result.data.repeticiones || updatedRecord.repeticiones || '1',
        fecha:
          result.data.fecha || updatedRecord.fecha || new Date().toISOString()
      }

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record._id === id ? processedRecord : record
        )
      )

      setSelectedRecord(null)
      alertService.success(
        '¡Éxito!',
        'Marca personal actualizada correctamente'
      )

      if (
        updatedRecord.ejercicio !== records.find((r) => r._id === id)?.ejercicio
      ) {
        fetchUniqueExercises()
      }
    } catch (err) {
      alertService.error('Error', err.message)
    }
  }

  const handleCloseForm = () => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,

            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },

            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            setShowForm(false)
          }
        })
    } else {
      setShowForm(false)
    }
  }

  const handleCloseEditForm = () => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,

            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },

            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            setSelectedRecord(null)
          }
        })
    } else {
      setSelectedRecord(null)
    }
  }

  const handleBackNavigation = () => {
    if (window.personalRecordHasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,

            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },

            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            window.personalRecordHasUnsavedChanges = false
            navigate('/dashboard')
          }
        })
    } else {
      navigate('/dashboard')
    }
  }

  const recordsByCategory = records.reduce((acc, record) => {
    const category = record.categoria || 'Sin categoría'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(record)
    return acc
  }, {})

  return (
    <div className='cf-marcas-container'>
      <div className='cf-marcas-animation-wrapper'>
        <div className='cf-marcas-dumbbell-anim'></div>
        <div className='cf-marcas-trophy-anim'></div>
      </div>

      <Header />

      <div className='cf-marcas-back-button'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div
        className={`cf-marcas-content-wrapper ${
          animationComplete ? 'cf-marcas-content-visible' : ''
        }`}
      >
        <div className='cf-marcas-header'>
          <div className='cf-marcas-title-container'>
            <div className='cf-marcas-logo-wrapper'>
              <div className='cf-marcas-trophy-logo'></div>
            </div>
            <h2 className='cf-marcas-heading'>Marcas Personales</h2>
          </div>
          <button
            className='cf-marcas-add-button'
            onClick={() => setShowForm(true)}
          >
            <span className='cf-marcas-add-icon'></span>
            Nueva Marca
          </button>
        </div>

        <div className='cf-marcas-tabs'>
          <button
            className={`cf-marcas-tab-btn ${
              activeTab === 'all' ? 'cf-marcas-active' : ''
            }`}
            onClick={() => setActiveTab('all')}
          >
            <span className='cf-marcas-tab-icon cf-marcas-all-icon'></span>
            Todas
          </button>

          {Object.keys(recordsByCategory).map((category) => (
            <button
              key={category}
              className={`cf-marcas-tab-btn ${
                activeTab === category ? 'cf-marcas-active' : ''
              }`}
              onClick={() => setActiveTab(category)}
            >
              <span className='cf-marcas-tab-icon cf-marcas-category-icon'></span>
              {category}
            </button>
          ))}

          <button
            className={`cf-marcas-tab-btn ${
              activeTab === 'chart' ? 'cf-marcas-active' : ''
            }`}
            onClick={() => setActiveTab('chart')}
          >
            <span className='cf-marcas-tab-icon cf-marcas-chart-icon'></span>
            Gráficos
          </button>
        </div>

        <div className='cf-marcas-content'>
          {isLoading ? (
            <div className='cf-marcas-loading'>
              <div className='cf-marcas-spinner'></div>
              <div className='cf-marcas-loading-text'>
                Cargando marcas personales...
              </div>
            </div>
          ) : error ? (
            <div className='cf-marcas-error'>
              <div className='cf-marcas-error-icon'></div>
              <p>Error: {error}</p>
              <Button onClick={fetchRecords}>Reintentar</Button>
            </div>
          ) : (
            <>
              {activeTab === 'chart' ? (
                <div className='cf-marcas-chart-container'>
                  <PersonalRecordsChart
                    records={records}
                    uniqueExercises={uniqueExercises}
                  />
                </div>
              ) : (
                <div className='cf-marcas-list-container'>
                  <PersonalRecordsList
                    records={
                      activeTab === 'all'
                        ? records
                        : recordsByCategory[activeTab] || []
                    }
                    onDelete={handleDeleteRecord}
                    onEdit={(record) => setSelectedRecord(record)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showForm && (
        <div className='cf-marcas-modal-overlay'>
          <div className='cf-marcas-modal'>
            <PersonalRecordForm
              onSubmit={handleAddRecord}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      )}

      {selectedRecord && (
        <div className='cf-marcas-modal-overlay'>
          <div className='cf-marcas-modal'>
            <PersonalRecordForm
              record={selectedRecord}
              onSubmit={(updatedRecord) =>
                handleEditRecord(selectedRecord._id, updatedRecord)
              }
              onCancel={handleCloseEditForm}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalRecordsPage
