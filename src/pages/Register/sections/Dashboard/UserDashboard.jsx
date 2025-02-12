import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Usuario')

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    if (nombre) {
      setUserName(nombre)
    }
  }, [])

  return (
    <div className='dashboard-container'>
      <header className='dashboard-header'>
        <h1>Bienvenido a AderCrossFit, {userName}</h1>
      </header>

      <div className='dashboard-sections'>
        <div
          className='section-card'
          onClick={() => navigate('/dashboard/medico')}
        >
          <span className='section-icon'>🏥</span>
          <h2>Información Médica</h2>
          <p>Gestiona tu información médica y de salud</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/dashboard/aspecto')}
        >
          <span className='section-icon'>📏</span>
          <h2>Aspecto Físico</h2>
          <p>Registra tus medidas y progreso físico</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/dashboard/marcas')}
        >
          <span className='section-icon'>🏋️‍♂️</span>
          <h2>Marcas Personales</h2>
          <p>Registra tus récords y logros</p>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
