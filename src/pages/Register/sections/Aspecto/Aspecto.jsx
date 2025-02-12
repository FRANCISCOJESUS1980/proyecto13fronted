import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Aspecto.css'

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

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar las medidas
    console.log('Medidas guardadas:', stats)
  }

  return (
    <div className='stats-container'>
      <div className='stats-header'>
        <h2>Estadísticas Físicas</h2>
      </div>

      <div className='stats-tabs'>
        <button
          className={`tab-btn ${activeTab === 'medidas' ? 'active' : ''}`}
          onClick={() => setActiveTab('medidas')}
        >
          Medidas
        </button>
        <button
          className={`tab-btn ${activeTab === 'progreso' ? 'active' : ''}`}
          onClick={() => setActiveTab('progreso')}
        >
          Progreso
        </button>
        <button
          className={`tab-btn ${activeTab === 'objetivos' ? 'active' : ''}`}
          onClick={() => setActiveTab('objetivos')}
        >
          Objetivos
        </button>
      </div>

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

          <button type='submit' className='save-btn'>
            Guardar Medidas
          </button>
        </form>
      )}

      {activeTab === 'progreso' && (
        <div className='progress-section'>
          <div className='progress-card'>
            <h3>Progreso Mensual</h3>
            <p className='progress-description'>
              Aquí podrás ver la evolución de tus medidas a lo largo del tiempo.
            </p>
            {/* Aquí iría un gráfico de progreso */}
            <div className='progress-placeholder'>
              Gráfico de progreso en desarrollo
            </div>
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
            {/* Aquí irían los objetivos */}
            <div className='goals-placeholder'>
              Sección de objetivos en desarrollo
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhysicalStats
