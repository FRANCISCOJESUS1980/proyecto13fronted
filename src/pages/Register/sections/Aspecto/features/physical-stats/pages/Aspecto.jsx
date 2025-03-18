import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../../components/Header/Header'
import './Aspecto.css'

const fetchLatestStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'http://localhost:5000/api/physical/stats/latest',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return null
  }
}

const fetchStatsHistory = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'http://localhost:5000/api/physical/stats/history',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error al obtener historial:', error)
    return []
  }
}

const fetchObjetivos = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      'http://localhost:5000/api/physical/objetivos',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error al obtener objetivos:', error)
    return []
  }
}

const PhysicalStats = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
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

  const [activeTab, setActiveTab] = useState('medidas')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [historialMedidas, setHistorialMedidas] = useState([])
  const [objetivos, setObjetivos] = useState([])
  const [nuevoObjetivo, setNuevoObjetivo] = useState({
    tipo: 'peso',
    medida: 'peso',
    valorObjetivo: '',
    fechaObjetivo: ''
  })
  const [showObjetivoForm, setShowObjetivoForm] = useState(false)

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)

      const latestStats = await fetchLatestStats()
      if (latestStats && latestStats.medidas) {
        setStats(latestStats.medidas)
      }

      if (activeTab === 'progreso') {
        const history = await fetchStatsHistory()
        setHistorialMedidas(history)
      }

      if (activeTab === 'objetivos') {
        const userObjetivos = await fetchObjetivos()
        setObjetivos(userObjetivos)
      }

      setLoading(false)
    }

    loadInitialData()
  }, [activeTab])

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/physical/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stats)
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ text: 'Medidas guardadas correctamente', type: 'success' })
      } else {
        setMessage({
          text: data.message || 'Error al guardar medidas',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error de conexión:', error)
      setMessage({ text: 'Error de conexión con el servidor', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleObjetivoChange = (e) => {
    setNuevoObjetivo({ ...nuevoObjetivo, [e.target.name]: e.target.value })
  }

  const handleObjetivoSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:5000/api/physical/objetivos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(nuevoObjetivo)
        }
      )

      const data = await response.json()

      if (data.success) {
        setMessage({ text: 'Objetivo creado correctamente', type: 'success' })
        setShowObjetivoForm(false)

        const userObjetivos = await fetchObjetivos()
        setObjetivos(userObjetivos)

        setNuevoObjetivo({
          tipo: 'peso',
          medida: 'peso',
          valorObjetivo: '',
          fechaObjetivo: ''
        })
      } else {
        setMessage({
          text: data.message || 'Error al crear objetivo',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error de conexión:', error)
      setMessage({ text: 'Error de conexión con el servidor', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setMessage({ text: '', type: '' })
  }

  const renderProgressBar = (progreso) => {
    return (
      <div className='progress-bar-container'>
        <div
          className='progress-bar-fill'
          style={{
            width: `${progreso}%`,
            backgroundColor: progreso >= 100 ? '#00b894' : '#3498db'
          }}
        ></div>
        <span className='progress-text'>{Math.round(progreso)}%</span>
      </div>
    )
  }

  return (
    <div className='stats-container'>
      <Header />
      <div className='stats-header'>
        <button className='back-button' onClick={() => navigate('/dashboard')}>
          ← Volver al Dashboard
        </button>
        <h2>Estadísticas Físicas</h2>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className='stats-tabs'>
        <button
          className={`tab-btn ${activeTab === 'medidas' ? 'active' : ''}`}
          onClick={() => handleTabChange('medidas')}
        >
          Medidas
        </button>
        <button
          className={`tab-btn ${activeTab === 'progreso' ? 'active' : ''}`}
          onClick={() => handleTabChange('progreso')}
        >
          Progreso
        </button>
        <button
          className={`tab-btn ${activeTab === 'objetivos' ? 'active' : ''}`}
          onClick={() => handleTabChange('objetivos')}
        >
          Objetivos
        </button>
      </div>

      {loading && <div className='loading'>Cargando...</div>}

      {activeTab === 'medidas' && (
        <form onSubmit={handleSubmit} className='stats-form'>
          <div className='stats-grid'>
            <div className='form-group'>
              <label htmlFor='altura'>Altura (cm)</label>
              <input
                type='number'
                id='altura'
                name='altura'
                value={stats.altura}
                onChange={handleChange}
                placeholder='175'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='peso'>Peso (kg)</label>
              <input
                type='number'
                id='peso'
                name='peso'
                value={stats.peso}
                onChange={handleChange}
                placeholder='75'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='grasa'>% Grasa Corporal</label>
              <input
                type='number'
                id='grasa'
                name='grasa'
                value={stats.grasa}
                onChange={handleChange}
                placeholder='15'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='musculo'>% Masa Muscular</label>
              <input
                type='number'
                id='musculo'
                name='musculo'
                value={stats.musculo}
                onChange={handleChange}
                placeholder='40'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='pecho'>Pecho (cm)</label>
              <input
                type='number'
                id='pecho'
                name='pecho'
                value={stats.pecho}
                onChange={handleChange}
                placeholder='100'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='cintura'>Cintura (cm)</label>
              <input
                type='number'
                id='cintura'
                name='cintura'
                value={stats.cintura}
                onChange={handleChange}
                placeholder='80'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='cadera'>Cadera (cm)</label>
              <input
                type='number'
                id='cadera'
                name='cadera'
                value={stats.cadera}
                onChange={handleChange}
                placeholder='95'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='biceps'>Bíceps (cm)</label>
              <input
                type='number'
                id='biceps'
                name='biceps'
                value={stats.biceps}
                onChange={handleChange}
                placeholder='35'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='muslos'>Muslos (cm)</label>
              <input
                type='number'
                id='muslos'
                name='muslos'
                value={stats.muslos}
                onChange={handleChange}
                placeholder='55'
              />
            </div>
          </div>

          <button type='submit' className='save-btn' disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Medidas'}
          </button>
        </form>
      )}

      {activeTab === 'progreso' && (
        <div className='progress-section'>
          <div className='progress-card'>
            <h3>Progreso Mensual</h3>
            <p className='progress-description'>
              Aquí puedes ver la evolución de tus medidas a lo largo del tiempo.
            </p>

            {historialMedidas.length === 0 ? (
              <div className='no-data'>
                No hay datos de progreso disponibles. Registra tus medidas para
                comenzar a ver tu progreso.
              </div>
            ) : (
              <div className='progress-data'>
                <div className='progress-metric'>
                  <h4>Peso</h4>
                  <div className='progress-chart'>
                    {historialMedidas.map((medida, index) => (
                      <div key={index} className='progress-point'>
                        <div className='progress-value'>
                          {medida.medidas.peso || '-'} kg
                        </div>
                        <div className='progress-date'>
                          {new Date(medida.fecha).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='progress-metric'>
                  <h4>% Grasa Corporal</h4>
                  <div className='progress-chart'>
                    {historialMedidas.map((medida, index) => (
                      <div key={index} className='progress-point'>
                        <div className='progress-value'>
                          {medida.medidas.grasa || '-'}%
                        </div>
                        <div className='progress-date'>
                          {new Date(medida.fecha).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='progress-metric'>
                  <h4>Cintura</h4>
                  <div className='progress-chart'>
                    {historialMedidas.map((medida, index) => (
                      <div key={index} className='progress-point'>
                        <div className='progress-value'>
                          {medida.medidas.cintura || '-'} cm
                        </div>
                        <div className='progress-date'>
                          {new Date(medida.fecha).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'objetivos' && (
        <div className='goals-section'>
          <div className='goals-card'>
            <h3>Objetivos Físicos</h3>
            <p className='goals-description'>
              Establece tus objetivos y haz seguimiento de tu progreso.
            </p>

            <button
              className='add-goal-btn'
              onClick={() => setShowObjetivoForm(!showObjetivoForm)}
            >
              {showObjetivoForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
            </button>

            {showObjetivoForm && (
              <form onSubmit={handleObjetivoSubmit} className='goal-form'>
                <div className='form-row'>
                  <div className='form-group'>
                    <label htmlFor='medida'>Medida</label>
                    <select
                      id='medida'
                      name='medida'
                      value={nuevoObjetivo.medida}
                      onChange={handleObjetivoChange}
                      required
                    >
                      <option value='peso'>Peso</option>
                      <option value='grasa'>% Grasa</option>
                      <option value='musculo'>% Músculo</option>
                      <option value='pecho'>Pecho</option>
                      <option value='cintura'>Cintura</option>
                      <option value='cadera'>Cadera</option>
                      <option value='biceps'>Bíceps</option>
                      <option value='muslos'>Muslos</option>
                    </select>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='tipo'>Tipo de Objetivo</label>
                    <select
                      id='tipo'
                      name='tipo'
                      value={nuevoObjetivo.tipo}
                      onChange={handleObjetivoChange}
                      required
                    >
                      <option value='peso'>Cambio de Peso</option>
                      <option value='grasa'>Reducción de Grasa</option>
                      <option value='musculo'>Aumento Muscular</option>
                      <option value='medida'>Cambio de Medida</option>
                    </select>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group'>
                    <label htmlFor='valorObjetivo'>Valor Objetivo</label>
                    <input
                      type='number'
                      id='valorObjetivo'
                      name='valorObjetivo'
                      value={nuevoObjetivo.valorObjetivo}
                      onChange={handleObjetivoChange}
                      placeholder='Ej: 70 kg, 15%, 90 cm'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='fechaObjetivo'>Fecha Objetivo</label>
                    <input
                      type='date'
                      id='fechaObjetivo'
                      name='fechaObjetivo'
                      value={nuevoObjetivo.fechaObjetivo}
                      onChange={handleObjetivoChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='save-goal-btn'
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar Objetivo'}
                </button>
              </form>
            )}

            {objetivos.length === 0 ? (
              <div className='no-data'>
                No tienes objetivos establecidos. Crea tu primer objetivo para
                comenzar.
              </div>
            ) : (
              <div className='goals-list'>
                {objetivos.map((objetivo, index) => (
                  <div
                    key={index}
                    className={`goal-item ${
                      objetivo.completado ? 'completed' : ''
                    }`}
                  >
                    <div className='goal-header'>
                      <h4>
                        {objetivo.tipo === 'peso'
                          ? 'Peso'
                          : objetivo.tipo === 'grasa'
                          ? '% Grasa'
                          : objetivo.tipo === 'musculo'
                          ? '% Músculo'
                          : objetivo.medida === 'pecho'
                          ? 'Pecho'
                          : objetivo.medida === 'cintura'
                          ? 'Cintura'
                          : objetivo.medida === 'cadera'
                          ? 'Cadera'
                          : objetivo.medida === 'biceps'
                          ? 'Bíceps'
                          : 'Muslos'}
                      </h4>
                      <span
                        className={`goal-status ${
                          objetivo.completado ? 'completed' : ''
                        }`}
                      >
                        {objetivo.completado ? 'Completado' : 'En progreso'}
                      </span>
                    </div>

                    <div className='goal-details'>
                      <div className='goal-values'>
                        <span>
                          Inicial: {objetivo.valorInicial}{' '}
                          {objetivo.medida === 'peso'
                            ? 'kg'
                            : objetivo.medida === 'grasa' ||
                              objetivo.medida === 'musculo'
                            ? '%'
                            : 'cm'}
                        </span>
                        <span>→</span>
                        <span>
                          Objetivo: {objetivo.valorObjetivo}{' '}
                          {objetivo.medida === 'peso'
                            ? 'kg'
                            : objetivo.medida === 'grasa' ||
                              objetivo.medida === 'musculo'
                            ? '%'
                            : 'cm'}
                        </span>
                      </div>

                      <div className='goal-date'>
                        Fecha límite:{' '}
                        {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                      </div>

                      <div className='goal-progress'>
                        {renderProgressBar(objetivo.progreso)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhysicalStats
