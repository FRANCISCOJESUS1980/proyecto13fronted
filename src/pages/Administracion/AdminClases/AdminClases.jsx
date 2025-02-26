import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Clock,
  Users,
  PlusCircle,
  Trash
} from 'lucide-react'
import Header from '../../../components/Header/Header'
import './AdminClases.css'

const AdminClases = () => {
  const [clases, setClases] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    horarios: [{ hora: '', duracion: '60' }],
    capacidadMaxima: '',
    categoria: '',
    nivel: '',
    ubicacion: '',
    diaSemana: '',
    imagen: null,
    entrenador: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [entrenadores, setEntrenadores] = useState([])
  const [diaSeleccionado, setDiaSeleccionado] = useState('todos')

  const categorias = [
    'yoga',
    'pilates',
    'cardio',
    'fuerza',
    'crossfit',
    'hiit',
    'baile',
    'otro'
  ]
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
    fetchEntrenadores()
  }, [])

  const fetchClases = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/classes', {
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
      setError('Error al cargar las clases. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const fetchEntrenadores = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/users/entrenadores'
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setEntrenadores(data.data)
      }
    } catch (error) {
      console.error('Error al obtener entrenadores:', error)
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

  const addHorario = () => {
    setFormData({
      ...formData,
      horarios: [...formData.horarios, { hora: '', duracion: '60' }]
    })
  }

  const removeHorario = (index) => {
    const newHorarios = [...formData.horarios]
    newHorarios.splice(index, 1)
    setFormData({
      ...formData,
      horarios: newHorarios
    })
  }

  const updateHorario = (index, field, value) => {
    const newHorarios = [...formData.horarios]
    newHorarios[index] = { ...newHorarios[index], [field]: value }
    setFormData({
      ...formData,
      horarios: newHorarios
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const horariosInvalidos = formData.horarios.some(
        (h) => !h.hora || !h.duracion
      )
      if (horariosInvalidos) {
        throw new Error('Todos los horarios deben tener hora y duración')
      }

      const clasesCreadas = []
      const clasesConError = []

      for (const horario of formData.horarios) {
        const formDataToSend = new FormData()

        formDataToSend.append('nombre', formData.nombre)
        formDataToSend.append('descripcion', formData.descripcion)
        formDataToSend.append('horario', horario.hora)
        formDataToSend.append('duracion', horario.duracion)
        formDataToSend.append('capacidadMaxima', formData.capacidadMaxima)
        formDataToSend.append('categoria', formData.categoria)
        formDataToSend.append('nivel', formData.nivel)
        formDataToSend.append('ubicacion', formData.ubicacion)
        formDataToSend.append('diaSemana', formData.diaSemana)

        if (formData.entrenador && formData.entrenador !== '') {
          formDataToSend.append('entrenador', formData.entrenador)
        }

        if (
          formData.imagen &&
          formData.imagen instanceof File &&
          clasesCreadas.length === 0
        ) {
          formDataToSend.append('imagen', formData.imagen)
        }

        const url = editingId
          ? `http://localhost:5000/api/classes/${editingId}`
          : 'http://localhost:5000/api/classes'

        const method = editingId ? 'PUT' : 'POST'

        try {
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

          clasesCreadas.push(data.data)
        } catch (error) {
          clasesConError.push({ horario: horario.hora, error: error.message })
        }
      }

      if (clasesCreadas.length > 0) {
        fetchClases()
        handleCloseModal()
        setSuccess(
          `${clasesCreadas.length} horarios de clase ${
            editingId ? 'actualizados' : 'creados'
          } con éxito`
        )
        setTimeout(() => setSuccess(null), 3000)
      }

      if (clasesConError.length > 0) {
        setError(
          `Hubo errores al crear ${clasesConError.length} horarios. Por favor, inténtalo de nuevo.`
        )
      }
    } catch (error) {
      console.error('Error al guardar la clase:', error)
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (clase) => {
    setFormData({
      nombre: clase.nombre || '',
      descripcion: clase.descripcion || '',
      horarios: [
        {
          hora: clase.horario || '',
          duracion: clase.duracion?.toString() || '60'
        }
      ],
      capacidadMaxima: clase.capacidadMaxima || '',
      categoria: clase.categoria || '',
      nivel: clase.nivel || '',
      ubicacion: clase.ubicacion || '',
      diaSemana: clase.diaSemana || '',
      imagen: null,
      entrenador: clase.entrenador?._id || ''
    })
    setPreviewUrl(clase.imagen || null)
    setEditingId(clase._id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      setLoading(true)
      try {
        const response = await fetch(
          `http://localhost:5000/api/classes/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.success) {
          fetchClases()
          setSuccess('Clase eliminada con éxito')
          setTimeout(() => setSuccess(null), 3000)
        }
      } catch (error) {
        console.error('Error al eliminar la clase:', error)
        setError('Error al eliminar la clase')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      nombre: '',
      descripcion: '',
      horarios: [{ hora: '', duracion: '60' }],
      capacidadMaxima: '',
      categoria: '',
      nivel: '',
      ubicacion: '',
      diaSemana: '',
      imagen: null,
      entrenador: ''
    })
    setPreviewUrl(null)
    setEditingId(null)
    setError(null)
  }

  const clasesFiltradas =
    diaSeleccionado === 'todos'
      ? clases
      : clases.filter((clase) => clase.diaSemana === diaSeleccionado)

  const clasesOrdenadas = [...clasesFiltradas].sort((a, b) => {
    const diasOrden = {
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
      domingo: 7
    }

    if (a.diaSemana !== b.diaSemana) {
      return diasOrden[a.diaSemana] - diasOrden[b.diaSemana]
    }

    const [aHora, aMin] = a.horario.split(':').map(Number)
    const [bHora, bMin] = b.horario.split(':').map(Number)

    if (aHora !== bHora) {
      return aHora - bHora
    }

    return aMin - bMin
  })

  const clasesPorDia = clasesOrdenadas.reduce((grupos, clase) => {
    if (!grupos[clase.diaSemana]) {
      grupos[clase.diaSemana] = []
    }
    grupos[clase.diaSemana].push(clase)
    return grupos
  }, {})

  return (
    <div className='admin-clases'>
      <Header />
      <div className='headerclases'>
        <h1>Administración de Clases</h1>
        <button className='btn-primary' onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Nueva Clase
        </button>
      </div>

      {error && (
        <div className='error-message'>
          <span>⚠️</span> {error}
        </div>
      )}

      {success && (
        <div className='success-message'>
          <span>✓</span> {success}
        </div>
      )}

      <div className='filtro-dias'>
        <span>Filtrar por día:</span>
        <select
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
          className='filtro-select'
        >
          <option value='todos'>Todos los días</option>
          {diasSemana.map((dia) => (
            <option key={dia} value={dia}>
              {dia.charAt(0).toUpperCase() + dia.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && !isModalOpen && (
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando...</p>
        </div>
      )}

      {Object.keys(clasesPorDia).length > 0 ? (
        Object.entries(clasesPorDia).map(([dia, clasesDelDia]) => (
          <div key={dia} className='dia-clases'>
            <h2 className='dia-titulo'>
              {dia.charAt(0).toUpperCase() + dia.slice(1)}
            </h2>
            <div className='clases-grid'>
              {clasesDelDia.map((clase) => (
                <div key={clase._id} className='clase-card'>
                  <div className='clase-header'>
                    <h3>{clase.nombre}</h3>
                    <div className='clase-badges'>
                      <span className={`nivel-badge ${clase.nivel}`}>
                        {clase.nivel.charAt(0).toUpperCase() +
                          clase.nivel.slice(1)}
                      </span>
                      <span className='categoria-badge'>{clase.categoria}</span>
                    </div>
                  </div>

                  <div className='clase-info'>
                    <div className='clase-horario'>
                      <Clock size={16} />
                      <span>
                        {clase.horario} ({clase.duracion} min)
                      </span>
                    </div>
                    <div className='clase-capacidad'>
                      <Users size={16} />
                      <span>
                        {clase.inscritos.length}/{clase.capacidadMaxima}
                      </span>
                    </div>
                    {clase.entrenador && (
                      <div className='clase-entrenador'>
                        <span>
                          Entrenador: {clase.entrenador.nombre || 'No asignado'}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className='clase-descripcion'>{clase.descripcion}</p>

                  <div className='clase-actions'>
                    <button
                      onClick={() => handleEdit(clase)}
                      className='btn-icon edit'
                      title='Editar'
                    >
                      <Pencil size={16} />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(clase._id)}
                      className='btn-icon delete'
                      title='Eliminar'
                    >
                      <Trash2 size={16} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='no-clases'>
          <p>
            No hay clases{' '}
            {diaSeleccionado !== 'todos'
              ? `para ${diaSeleccionado}`
              : 'creadas'}
            .
          </p>
          <p>Haz clic en "Nueva Clase" para crear la primera.</p>
        </div>
      )}

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h2>{editingId ? 'Editar Clase' : 'Nueva Clase'}</h2>
              <button onClick={handleCloseModal} className='btn-icon'>
                <X size={20} />
              </button>
            </div>

            {error && <div className='modal-error'>{error}</div>}

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
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                        {niv.charAt(0).toUpperCase() + niv.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='diaSemana'>Día de la semana</label>
                <select
                  id='diaSemana'
                  value={formData.diaSemana}
                  onChange={(e) =>
                    setFormData({ ...formData, diaSemana: e.target.value })
                  }
                  required
                >
                  <option value=''>Seleccionar día</option>
                  {diasSemana.map((dia) => (
                    <option key={dia} value={dia}>
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <div className='horarios-header'>
                  <label>Horarios</label>
                  <button
                    type='button'
                    className='btn-add-horario'
                    onClick={addHorario}
                    disabled={editingId}
                  >
                    <PlusCircle size={16} />
                    <span>Añadir horario</span>
                  </button>
                </div>

                <div className='horarios-container'>
                  {formData.horarios.map((horario, index) => (
                    <div key={index} className='horario-item'>
                      <div className='horario-inputs'>
                        <div className='horario-input'>
                          <label htmlFor={`horario-${index}`}>Hora</label>
                          <input
                            type='time'
                            id={`horario-${index}`}
                            value={horario.hora}
                            onChange={(e) =>
                              updateHorario(index, 'hora', e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className='horario-input'>
                          <label htmlFor={`duracion-${index}`}>
                            Duración (min)
                          </label>
                          <input
                            type='number'
                            id={`duracion-${index}`}
                            min='15'
                            max='180'
                            value={horario.duracion}
                            onChange={(e) =>
                              updateHorario(index, 'duracion', e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      {formData.horarios.length > 1 && !editingId && (
                        <button
                          type='button'
                          className='btn-remove-horario'
                          onClick={() => removeHorario(index)}
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className='form-row'>
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
              </div>

              <div className='form-group'>
                <label htmlFor='entrenador'>Entrenador (opcional)</label>
                <select
                  id='entrenador'
                  value={formData.entrenador}
                  onChange={(e) =>
                    setFormData({ ...formData, entrenador: e.target.value })
                  }
                >
                  <option value=''>Seleccionar entrenador</option>
                  {entrenadores.map((entrenador) => (
                    <option key={entrenador._id} value={entrenador._id}>
                      {entrenador.nombre}
                    </option>
                  ))}
                </select>
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
