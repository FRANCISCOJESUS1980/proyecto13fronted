import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import './Marcas.css'

const PersonalRecords = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [newRecord, setNewRecord] = useState({
    ejercicio: '',
    peso: '',
    repeticiones: '',
    fecha: new Date().toISOString().split('T')[0]
  })
  const [records, setRecords] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newRecord.ejercicio && newRecord.peso) {
      setRecords([...records, { ...newRecord, id: Date.now() }])
      setNewRecord({
        ejercicio: '',
        peso: '',
        repeticiones: '',
        fecha: new Date().toISOString().split('T')[0]
      })
      setShowForm(false)
    }
  }

  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id))
  }

  return (
    <div className='records-container'>
      <Header />
      <div className='records-header'>
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

      {showForm && (
        <div className='record-form-overlay'>
          <div className='record-form-container'>
            <form onSubmit={handleSubmit} className='record-form'>
              <h3>Nueva Marca Personal</h3>

              <div className='form-group'>
                <label htmlFor='ejercicio'>Ejercicio</label>
                <input
                  type='text'
                  id='ejercicio'
                  value={newRecord.ejercicio}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, ejercicio: e.target.value })
                  }
                  placeholder='Ej: Sentadilla, Press de Banca...'
                />
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='peso'>Peso (kg)</label>
                  <input
                    type='number'
                    id='peso'
                    value={newRecord.peso}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, peso: e.target.value })
                    }
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='repeticiones'>Repeticiones</label>
                  <input
                    type='number'
                    id='repeticiones'
                    value={newRecord.repeticiones}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        repeticiones: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='fecha'>Fecha</label>
                <input
                  type='date'
                  id='fecha'
                  value={newRecord.fecha}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, fecha: e.target.value })
                  }
                />
              </div>

              <div className='form-actions'>
                <button
                  type='button'
                  onClick={() => setShowForm(false)}
                  className='cancel-btn'
                >
                  Cancelar
                </button>
                <button type='submit' className='submit-btn'>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='records-list'>
        {records.map((record) => (
          <div key={record.id} className='record-card'>
            <div className='record-info'>
              <h3>{record.ejercicio}</h3>
              <p>
                {record.peso}kg x {record.repeticiones || '1'} rep
                <span className='record-date'>
                  {new Date(record.fecha).toLocaleDateString()}
                </span>
              </p>
            </div>
            <button
              className='delete-btn'
              onClick={() => handleDelete(record.id)}
            >
              ×
            </button>
          </div>
        ))}

        {records.length === 0 && (
          <div className='no-records'>
            No hay marcas personales registradas aún.
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonalRecords
