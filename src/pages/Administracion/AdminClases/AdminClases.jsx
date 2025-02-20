import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import Header from '../../../components/Header/Header'
import './AdminClases.css'

const AdminClases = () => {
  const [clases, setClases] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    horario: '',
    duracion: '',
    capacidadMaxima: '',
    categoria: '',
    nivel: '',
    ubicacion: '',
    diasSemana: [],
    imagen: null
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const categorias = ['yoga', 'pilates', 'cardio', 'fuerza', 'baile', 'otro']
  const niveles = ['principiante', 'intermedio', 'avanzado']
  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ]

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchClases()
  }, [])

  const fetchClases = async () => {
    try {
      const response = await fetch('/api/classes', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setClases(data.data)
      }
    } catch (error) {
      console.error('Error al obtener las clases:', error)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, imagen: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()

      Object.keys(formData).forEach((key) => {
        if (key === 'diasSemana') {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else if (key !== 'imagen') {
          formDataToSend.append(key, formData[key])
        }
      })

      if (formData.imagen) {
        formDataToSend.append('imagen', formData.imagen)
      }

      const url = editingId ? `/api/classes/${editingId}` : '/api/classes'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        )
      }

      if (data.success) {
        fetchClases()
        handleCloseModal()
        alert(
          editingId ? 'Clase actualizada con éxito' : 'Clase creada con éxito'
        )
      }
    } catch (error) {
      console.error('Error al guardar la clase:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (clase) => {
    setFormData({
      nombre: clase.nombre,
      descripcion: clase.descripcion,
      horario: clase.horario,
      duracion: clase.duracion,
      capacidadMaxima: clase.capacidadMaxima,
      categoria: clase.categoria,
      nivel: clase.nivel,
      ubicacion: clase.ubicacion,
      diasSemana: clase.diasSemana || [],
      imagen: null
    })
    setPreviewUrl(clase.imagen)
    setEditingId(clase._id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      try {
        const response = await fetch(`/api/classes/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.success) {
          fetchClases()
          alert('Clase eliminada con éxito')
        }
      } catch (error) {
        console.error('Error al eliminar la clase:', error)
        alert(error.message)
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      nombre: '',
      descripcion: '',
      horario: '',
      duracion: '',
      capacidadMaxima: '',
      categoria: '',
      nivel: '',
      ubicacion: '',
      diasSemana: [],
      imagen: null
    })
    setPreviewUrl(null)
    setEditingId(null)
  }

  return (
    <div className='admin-clases'>
      <Header />
      <div className='header'>
        <h1>Administración de Clases</h1>
        <button className='btn-primary' onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Nueva Clase
        </button>
      </div>

      <div className='clases-grid'>
        {clases.map((clase) => (
          <div key={clase._id} className='clase-card'>
            {clase.imagen && (
              <div className='clase-imagen'>
                <img
                  src={clase.imagen || '/placeholder.svg'}
                  alt={clase.nombre}
                />
              </div>
            )}
            <div className='clase-header'>
              <h3>{clase.nombre}</h3>
              <div className='clase-actions'>
                <button onClick={() => handleEdit(clase)} className='btn-icon'>
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(clase._id)}
                  className='btn-icon delete'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className='clase-info'>
              <p>
                <strong>Categoría:</strong> {clase.categoria}
              </p>
              <p>
                <strong>Nivel:</strong> {clase.nivel}
              </p>
              <p>
                <strong>Horario:</strong> {clase.horario}
              </p>
              <p>
                <strong>Duración:</strong> {clase.duracion} minutos
              </p>
              <p>
                <strong>Capacidad:</strong> {clase.capacidadMaxima} personas
              </p>
              <p>
                <strong>Ubicación:</strong> {clase.ubicacion}
              </p>
              <p>
                <strong>Días:</strong> {clase.diasSemana.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h2>{editingId ? 'Editar Clase' : 'Nueva Clase'}</h2>
              <button onClick={handleCloseModal} className='btn-icon'>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='nombre'>Nombre</label>
                <input
                  type='text'
                  id='nombre'
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='descripcion'>Descripción</label>
                <textarea
                  id='descripcion'
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  required
                />
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='categoria'>Categoría</label>
                  <select
                    id='categoria'
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    required
                  >
                    <option value=''>Seleccionar categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='nivel'>Nivel</label>
                  <select
                    id='nivel'
                    value={formData.nivel}
                    onChange={(e) =>
                      setFormData({ ...formData, nivel: e.target.value })
                    }
                    required
                  >
                    <option value=''>Seleccionar nivel</option>
                    {niveles.map((niv) => (
                      <option key={niv} value={niv}>
                        {niv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='horario'>Horario</label>
                  <input
                    type='time'
                    id='horario'
                    value={formData.horario}
                    onChange={(e) =>
                      setFormData({ ...formData, horario: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='duracion'>Duración (minutos)</label>
                  <input
                    type='number'
                    id='duracion'
                    min='15'
                    max='180'
                    value={formData.duracion}
                    onChange={(e) =>
                      setFormData({ ...formData, duracion: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='capacidadMaxima'>Capacidad Máxima</label>
                <input
                  type='number'
                  id='capacidadMaxima'
                  min='1'
                  max='50'
                  value={formData.capacidadMaxima}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacidadMaxima: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='ubicacion'>Ubicación</label>
                <input
                  type='text'
                  id='ubicacion'
                  value={formData.ubicacion}
                  onChange={(e) =>
                    setFormData({ ...formData, ubicacion: e.target.value })
                  }
                  required
                />
              </div>

              <div className='form-group'>
                <label>Días de la semana</label>
                <div className='dias-semana'>
                  {diasSemana.map((dia) => (
                    <label key={dia} className='checkbox-label'>
                      <input
                        type='checkbox'
                        checked={formData.diasSemana.includes(dia)}
                        onChange={(e) => {
                          const dias = e.target.checked
                            ? [...formData.diasSemana, dia]
                            : formData.diasSemana.filter((d) => d !== dia)
                          setFormData({ ...formData, diasSemana: dias })
                        }}
                      />
                      {dia}
                    </label>
                  ))}
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='imagen'>Imagen</label>
                {previewUrl && (
                  <div className='imagen-preview'>
                    <img
                      src={previewUrl || '/placeholder.svg'}
                      alt='Vista previa'
                    />
                  </div>
                )}
                <input
                  type='file'
                  id='imagen'
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn-secondary'
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='btn-primary'
                  disabled={loading}
                >
                  {loading
                    ? 'Guardando...'
                    : editingId
                    ? 'Actualizar'
                    : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminClases
