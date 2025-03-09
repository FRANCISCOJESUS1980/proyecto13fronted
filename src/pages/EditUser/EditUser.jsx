import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario
} from '../../services/api'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', codigoPostal: '', pais: '' },
    avatar: ''
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const response = await obtenerPerfilUsuario(token)

        const userData = response.data
        if (!userData.direccion) {
          userData.direccion = {
            calle: '',
            ciudad: '',
            codigoPostal: '',
            pais: ''
          }
        }

        setUser(userData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value }
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const response = await actualizarPerfilUsuario(token, user, avatarFile)

      if (response.success) {
        localStorage.setItem('nombre', user.nombre)

        alert('Perfil actualizado con éxito')
        navigate('/dashboard')
      } else {
        alert(
          'Error al actualizar el perfil: ' +
            (response.message || 'Error desconocido')
        )
      }
    } catch (error) {
      console.error('Error completo:', error)
      alert('Error al actualizar el perfil: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className='loading'>Cargando...</div>
  }

  return (
    <div className='edit-user-container'>
      <Header />
      <button className='back-button' onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className='edit-user-form'>
        <div className='form-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={user.nombre || ''}
            onChange={handleChange}
            placeholder='Nombre'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email || ''}
            onChange={handleChange}
            placeholder='Email'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            id='telefono'
            type='text'
            name='telefono'
            value={user.telefono || ''}
            onChange={handleChange}
            placeholder='Teléfono'
          />
        </div>

        <h3>Dirección</h3>
        <div className='form-group'>
          <label htmlFor='calle'>Calle</label>
          <input
            id='calle'
            type='text'
            name='calle'
            value={user.direccion?.calle || ''}
            onChange={handleAddressChange}
            placeholder='Calle'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='ciudad'>Ciudad</label>
          <input
            id='ciudad'
            type='text'
            name='ciudad'
            value={user.direccion?.ciudad || ''}
            onChange={handleAddressChange}
            placeholder='Ciudad'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='codigoPostal'>Código Postal</label>
          <input
            id='codigoPostal'
            type='text'
            name='codigoPostal'
            value={user.direccion?.codigoPostal || ''}
            onChange={handleAddressChange}
            placeholder='Código Postal'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='pais'>País</label>
          <input
            id='pais'
            type='text'
            name='pais'
            value={user.direccion?.pais || ''}
            onChange={handleAddressChange}
            placeholder='País'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='avatar'>Foto de Perfil</label>
          <input
            id='avatar'
            type='file'
            onChange={handleFileChange}
            accept='image/*'
          />
          {(avatarPreview || user.avatar) && (
            <div className='avatar-preview'>
              <img
                src={
                  avatarPreview ||
                  (user.avatar.startsWith('http')
                    ? user.avatar
                    : `http://localhost:5000/${user.avatar}`)
                }
                alt='Vista previa'
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            </div>
          )}
        </div>

        <div className='form-actions'>
          <button type='submit' className='update-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Actualizando...' : 'Actualizar Perfil'}
          </button>
          <button
            type='button'
            className='cancel-btn'
            onClick={() => navigate('/dashboard')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
