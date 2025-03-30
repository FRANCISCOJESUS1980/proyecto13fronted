import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario
} from '../../services/Api/index'
import Button from '../../components/Button/Button'
import handleSubmitHelper from '../../utils/HandleSubmit'
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

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'editarUsuario', {
      user,
      avatarFile,
      isSubmitting,
      setIsSubmitting,
      navigate
    })
  }

  if (loading) {
    return <div className='loading'>Cargando...</div>
  }

  return (
    <div className='edit-user-container'>
      <Header />
      <Button
        variant='secondary'
        onClick={() => navigate('/dashboard')}
        leftIcon={<span>←</span>}
      >
        Volver al Dashboard
      </Button>

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
          <Button
            type='submit'
            variant='secondary'
            size='lg'
            isLoading={isSubmitting}
          >
            Actualizar Perfil
          </Button>

          <Button
            type='button'
            variant='secondary'
            size='md'
            onClick={() => navigate('/dashboard')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
