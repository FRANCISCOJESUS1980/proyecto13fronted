/*import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import PersonalRecordForm from '../components/PersonalRecords/PersonalRecordForm/PersonalRecordForm'
import PersonalRecordsList from '../components/PersonalRecords/PersonalRecordList/PersonalRecordList'
import PersonalRecordsChart from '../components/PersonalRecords/PersonalRecordChart/PersonalRecordChart'
import { toast } from 'react-toastify'
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

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/personal-records', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar las marcas personales')
      }

      const data = await response.json()
      setRecords(data.data)
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar las marcas personales')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUniqueExercises = async () => {
    try {
      const response = await fetch('/api/personal-records/exercises', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar los ejercicios')
      }

      const data = await response.json()
      setUniqueExercises(data.data)
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
      const response = await fetch('/api/personal-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(record)
      })

      if (!response.ok) {
        throw new Error('Error al guardar la marca personal')
      }

      const data = await response.json()
      setRecords([data.data, ...records])
      setShowForm(false)
      toast.success('¡Marca personal guardada con éxito!')

      if (!uniqueExercises.includes(record.ejercicio)) {
        setUniqueExercises([...uniqueExercises, record.ejercicio])
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la marca personal')
      }

      setRecords(records.filter((record) => record._id !== id))
      toast.success('Marca personal eliminada')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleEditRecord = async (id, updatedRecord) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedRecord)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la marca personal')
      }

      const data = await response.json()

      setRecords((prevRecords) =>
        prevRecords.map((record) => (record._id === id ? data.data : record))
      )

      setSelectedRecord(null)
      toast.success('Marca personal actualizada')

      if (
        updatedRecord.ejercicio !== records.find((r) => r._id === id)?.ejercicio
      ) {
        fetchUniqueExercises()
      }
    } catch (err) {
      toast.error(err.message)
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
    <div className='personal-records-container'>
      <Header />

      <div className='personal-records-header'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
        <h2>Marcas Personales</h2>
        <button className='add-record-btn' onClick={() => setShowForm(true)}>
          + Nueva Marca
        </button>
      </div>

      <div className='records-tabs'>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todas
        </button>

        {Object.keys(recordsByCategory).map((category) => (
          <button
            key={category}
            className={`tab-btn ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}

        <button
          className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Gráficos
        </button>
      </div>

      <div className='records-content'>
        {isLoading ? (
          <div className='loading-container'>
            <div className='loading-text'>Cargando marcas personales...</div>
          </div>
        ) : error ? (
          <div className='error-container'>
            <p>Error: {error}</p>
            <Button onClick={fetchRecords}>Reintentar</Button>
          </div>
        ) : (
          <>
            {activeTab === 'chart' ? (
              <PersonalRecordsChart
                records={records}
                uniqueExercises={uniqueExercises}
              />
            ) : (
              <PersonalRecordsList
                records={
                  activeTab === 'all'
                    ? records
                    : recordsByCategory[activeTab] || []
                }
                onDelete={handleDeleteRecord}
                onEdit={(record) => setSelectedRecord(record)}
              />
            )}
          </>
        )}
      </div>

      {showForm && (
        <PersonalRecordForm
          onSubmit={handleAddRecord}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedRecord && (
        <PersonalRecordForm
          record={selectedRecord}
          onSubmit={(updatedRecord) =>
            handleEditRecord(selectedRecord._id, updatedRecord)
          }
          onCancel={() => setSelectedRecord(null)}
          isEditing={true}
        />
      )}
    </div>
  )
}

export default PersonalRecordsPage*/

/*import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import PersonalRecordForm from '../components/PersonalRecords/PersonalRecordForm/PersonalRecordForm'
import PersonalRecordsList from '../components/PersonalRecords/PersonalRecordList/PersonalRecordList'
import PersonalRecordsChart from '../components/PersonalRecords/PersonalRecordChart/PersonalRecordChart'
import { toast } from 'react-toastify'
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
      const response = await fetch('/api/personal-records', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar las marcas personales')
      }

      const data = await response.json()
      setRecords(data.data)
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar las marcas personales')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUniqueExercises = async () => {
    try {
      const response = await fetch('/api/personal-records/exercises', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar los ejercicios')
      }

      const data = await response.json()
      setUniqueExercises(data.data)
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
      const response = await fetch('/api/personal-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(record)
      })

      if (!response.ok) {
        throw new Error('Error al guardar la marca personal')
      }

      const data = await response.json()
      setRecords([data.data, ...records])
      setShowForm(false)
      toast.success('¡Marca personal guardada con éxito!')

      if (!uniqueExercises.includes(record.ejercicio)) {
        setUniqueExercises([...uniqueExercises, record.ejercicio])
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la marca personal')
      }

      setRecords(records.filter((record) => record._id !== id))
      toast.success('Marca personal eliminada')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleEditRecord = async (id, updatedRecord) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedRecord)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la marca personal')
      }

      const data = await response.json()

      setRecords((prevRecords) =>
        prevRecords.map((record) => (record._id === id ? data.data : record))
      )

      setSelectedRecord(null)
      toast.success('Marca personal actualizada')

      if (
        updatedRecord.ejercicio !== records.find((r) => r._id === id)?.ejercicio
      ) {
        fetchUniqueExercises()
      }
    } catch (err) {
      toast.error(err.message)
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
          onClick={() => navigate('/dashboard')}
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
              onCancel={() => setShowForm(false)}
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
              onCancel={() => setSelectedRecord(null)}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalRecordsPage*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import PersonalRecordForm from './PersonalRecordForm'
import PersonalRecordsList from './PersonalRecordsList'
import PersonalRecordsChart from './PersonalRecordsChart'
import { toast } from 'react-toastify'
import {
  getPersonalRecords,
  getUniqueExercises,
  createPersonalRecord,
  updatePersonalRecord,
  deletePersonalRecord
} from '../../../api'
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

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const data = await getPersonalRecords()
      setRecords(data)
    } catch (err) {
      console.error('Error al cargar marcas personales:', err)
      setError(err.message)
      toast.error('Error al cargar las marcas personales')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUniqueExercises = async () => {
    try {
      const data = await getUniqueExercises()
      setUniqueExercises(data)
    } catch (err) {
      console.error('Error al cargar ejercicios:', err)

      if (records.length > 0) {
        const uniqueExercisesFromRecords = [
          ...new Set(records.map((record) => record.ejercicio))
        ]
        setUniqueExercises(uniqueExercisesFromRecords)
      }
    }
  }

  useEffect(() => {
    fetchRecords()
    fetchUniqueExercises()
  }, [])

  const handleAddRecord = async (record) => {
    try {
      const newRecord = await createPersonalRecord(record)
      setRecords([newRecord, ...records])
      setShowForm(false)
      toast.success('¡Marca personal guardada con éxito!')

      if (!uniqueExercises.includes(record.ejercicio)) {
        setUniqueExercises([...uniqueExercises, record.ejercicio])
      }
    } catch (err) {
      toast.error(err.message || 'Error al guardar la marca personal')
    }
  }

  const handleDeleteRecord = async (id) => {
    try {
      await deletePersonalRecord(id)
      setRecords(records.filter((record) => record._id !== id))
      toast.success('Marca personal eliminada')
    } catch (err) {
      toast.error(err.message || 'Error al eliminar la marca personal')
    }
  }

  const handleEditRecord = async (id, updatedRecord) => {
    try {
      const data = await updatePersonalRecord(id, updatedRecord)

      setRecords((prevRecords) =>
        prevRecords.map((record) => (record._id === id ? data : record))
      )

      setSelectedRecord(null)
      toast.success('Marca personal actualizada')

      if (
        updatedRecord.ejercicio !== records.find((r) => r._id === id)?.ejercicio
      ) {
        fetchUniqueExercises()
      }
    } catch (err) {
      toast.error(err.message || 'Error al actualizar la marca personal')
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
    <div className='personal-records-container'>
      <Header />

      <div className='personal-records-header'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
        <h2>Marcas Personales</h2>
        <button className='add-record-btn' onClick={() => setShowForm(true)}>
          + Nueva Marca
        </button>
      </div>

      <div className='records-tabs'>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todas
        </button>

        {Object.keys(recordsByCategory).map((category) => (
          <button
            key={category}
            className={`tab-btn ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}

        <button
          className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Gráficos
        </button>
      </div>

      <div className='records-content'>
        {isLoading ? (
          <div className='loading-container'>
            <div className='loading-text'>Cargando marcas personales...</div>
          </div>
        ) : error ? (
          <div className='error-container'>
            <p>Error: {error}</p>
            <Button onClick={fetchRecords}>Reintentar</Button>
          </div>
        ) : (
          <>
            {activeTab === 'chart' ? (
              <PersonalRecordsChart
                records={records}
                uniqueExercises={uniqueExercises}
              />
            ) : (
              <PersonalRecordsList
                records={
                  activeTab === 'all'
                    ? records
                    : recordsByCategory[activeTab] || []
                }
                onDelete={handleDeleteRecord}
                onEdit={(record) => setSelectedRecord(record)}
              />
            )}
          </>
        )}
      </div>

      {showForm && (
        <PersonalRecordForm
          onSubmit={handleAddRecord}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedRecord && (
        <PersonalRecordForm
          record={selectedRecord}
          onSubmit={(updatedRecord) =>
            handleEditRecord(selectedRecord._id, updatedRecord)
          }
          onCancel={() => setSelectedRecord(null)}
          isEditing={true}
        />
      )}
    </div>
  )
}

export default PersonalRecordsPage
