import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Consentimiento from '../sections/Consentimiento/Consentimiento'
import Header from '../../../components/Header/Header'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    codigoAutorizacion: ''
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const verificarCodigo = async () => {
      if (formData.codigoAutorizacion) {
        try {
          const response = await fetch(
            'http://localhost:5000/api/users/verificar-codigo',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                codigo: formData.codigoAutorizacion.trim()
              })
            }
          )

          const data = await response.json()
          if (response.ok && data.success) {
            setFormData((prev) => ({ ...prev, rol: data.rol }))
          } else {
            setFormData((prev) => ({ ...prev, rol: 'usuario' }))
          }
        } catch (error) {
          console.error('Error al verificar código:', error)
          setFormData((prev) => ({ ...prev, rol: 'usuario' }))
        }
      }
    }

    const timeoutId = setTimeout(() => {
      verificarCodigo()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [formData.codigoAutorizacion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('rol', formData.rol)
      formDataToSend.append('codigoAutorizacion', formData.codigoAutorizacion)
      if (selectedImage) {
        formDataToSend.append('avatar', selectedImage)
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()
      if (response.ok) {
        alert('Registro exitoso')
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('nombre', formData.nombre)
        localStorage.setItem('rol', data.data.rol)
        localStorage.setItem('avatar', data.data.avatar)
        setRegistroExitoso(true)
      } else {
        alert(data.message || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error en el registro:', error)
      alert('Error en la conexión con el servidor')
    }
  }

  return (
    <div className='register-container'>
      {registroExitoso ? (
        <Consentimiento onConsentAccepted={() => navigate('/dashboard')} />
      ) : (
        <>
          <Header />
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className='image-upload-container'>
              {previewUrl && (
                <img
                  src={previewUrl || '/placeholder.svg'}
                  alt='Vista previa'
                  className='image-preview'
                />
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='image-input'
              />
            </div>

            <input
              type='text'
              name='nombre'
              placeholder='Nombre'
              value={formData.nombre}
              onChange={handleChange}
              required
            />
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
            <input
              type='text'
              name='codigoAutorizacion'
              placeholder='Código de acceso (opcional)'
              value={formData.codigoAutorizacion}
              onChange={handleChange}
              autoComplete='off'
            />
            <input type='text' name='rol' value={formData.rol} readOnly />
            <p>
              ¿Ya tienes una cuenta?{' '}
              <span
                className='link'
                onClick={() => navigate('/iniciar-sesion')}
              >
                Inicia sesión aquí
              </span>
            </p>
            <button className='botonregistro' type='submit'>
              Registrarse
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Register
