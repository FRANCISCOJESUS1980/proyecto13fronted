import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Consentimiento from '../sections/Consentimiento/Consentimiento'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario'
  })

  const [registroExitoso, setRegistroExitoso] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registro exitoso')
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('nombre', formData.nombre)
        setRegistroExitoso(true)
      } else {
        alert(data.message || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error en la conexión con el servidor')
    }
  }

  const handleConsentAccepted = () => {
    navigate('/dashboard')
  }

  return (
    <div className='register-container'>
      {registroExitoso ? (
        <Consentimiento onConsentAccepted={handleConsentAccepted} />
      ) : (
        <>
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='nombre'
              placeholder='Nombre'
              onChange={handleChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Correo electrónico'
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              onChange={handleChange}
              required
            />
            <select name='rol' onChange={handleChange}>
              <option value='usuario'>Usuario</option>
              <option value='admin'>Administrador</option>
              <option value='monitor'>Monitor</option>
              <option value='creador'>Creador</option>
            </select>
            <button type='submit'>Registrarse</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Register
