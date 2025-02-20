import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Iniciarsesion.css'

const Iniciarsesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      console.log(data)

      if (response.ok) {
        alert('Inicio de sesión exitoso')

        localStorage.setItem('token', data.data.token)
        localStorage.setItem('nombre', data.data.nombre)
        localStorage.setItem('rol', data.data.rol)

        navigate('/dashboard')
      } else {
        alert(data.message || 'Error en el inicio de sesión')
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      alert('Error en la conexión con el servidor')
    }
  }

  return (
    <div className='login-container'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Correo electrónico'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className='botonlogin' type='submit'>
          Iniciar Sesión
        </button>
      </form>
      <p>
        ¿No tienes una cuenta?{' '}
        <span className='link' onClick={() => navigate('/registro')}>
          Regístrate aquí
        </span>
      </p>
    </div>
  )
}

export default Iniciarsesion
