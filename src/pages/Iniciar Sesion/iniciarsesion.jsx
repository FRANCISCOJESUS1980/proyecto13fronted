import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './iniciarsesion.css'

const Iniciarsesion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const userCredentials = {
      email,
      password
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        setLoading(false)
      } else {
        localStorage.setItem('token', data.data.token)
        setLoading(false)
        alert('Inicio de sesión exitoso')
        window.location.href = '/dashboard'
      }
    } catch (error) {
      setError('Error al iniciar sesión, intente de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <Header />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className='input-group'>
          <label htmlFor='email'>Correo Electrónico</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button className='botoniniciarsesion' type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}

export default Iniciarsesion
