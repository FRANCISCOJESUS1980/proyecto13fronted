import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import Header from '../../../../components/Header/Header'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Usuario')

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    if (nombre) {
      setUserName(nombre)
    } else {
      setUserName('Usuario')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('rol')
    navigate('/')
  }

  return (
    <div className='dashboard-container'>
      <Header />
      <header className='dashboard-header'>
        <h1>Bienvenido a AderCrossFit, {userName}</h1>
        <button className='logout-btn' onClick={handleLogout}>
          Cerrar Sesión
        </button>
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
          onClick={() => navigate('/dashboard/chat')}
        >
          <span className='section-icon'>💬</span>
          <h2>Chat en Vivo</h2>
          <p>Conversa con otros miembros del box</p>
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
