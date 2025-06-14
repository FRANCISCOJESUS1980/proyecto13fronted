import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft } from 'lucide-react'
import Header from '../../../../components/Header/page/Header'
import Loading from '../../../../components/Loading/loading'
import ClaseModal from '../components/ClaseModal/ClaseModal'
import { useClases } from '../hooks/useClases'
import { useFiltros } from '../hooks/useFiltros'
import { organizarClasesPorDia } from '../utils/organizarClases'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '../../../../components/Button/Button'
import alertService from '../../../../components/sweealert2/sweealert2'
import './AdminClases.css'

const AdminClases = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const {
    clases,
    loading,
    error,
    success,
    setError,
    setSuccess,
    fetchClases,
    handleDelete
  } = useClases()

  const {
    diaSeleccionado,
    setDiaSeleccionado,
    diasSemana,
    fechasUnicas,
    clasesFiltradas
  } = useFiltros(clases)

  const clasesPorDia = organizarClasesPorDia(clasesFiltradas)

  const handleEdit = (clase) => {
    const modoEdicion = clase.esFechaEspecifica ? 'fecha' : 'semanal'

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
      fecha: clase.fecha ? clase.fecha.split('T')[0] : '',
      imagen: null,
      entrenador: clase.entrenador?._id || '',
      modoCreacion: modoEdicion,
      previewUrl: clase.imagen || null
    })

    setEditingId(clase._id)
    setIsModalOpen(true)
    setHasUnsavedChanges(false)
  }

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            setHasUnsavedChanges(false)
            closeModalCompletely()
          }
        })
    } else {
      closeModalCompletely()
    }
  }

  const closeModalCompletely = () => {
    setIsModalOpen(false)
    setFormData(null)
    setEditingId(null)
    setError(null)
  }

  const handleDeleteConfirm = (id, nombre) => {
    alertService.clearAlerts()

    alertService
      .confirm(
        '¿Estás seguro?',
        `La clase "${nombre}" será eliminada permanentemente.`,
        {
          icon: 'warning',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          reverseButtons: true,
          customClass: {
            container: 'swal2-container-top-layer',
            popup: 'swal2-popup-top-layer'
          },
          target: document.body
        }
      )
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete(id)
        }
      })
  }

  const handleNavigateAway = () => {
    if (hasUnsavedChanges) {
      alertService.clearAlerts()

      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando',
            allowOutsideClick: false,
            customClass: {
              container: 'swal2-container-top-layer',
              popup: 'swal2-popup-top-layer'
            },
            target: document.body
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            setHasUnsavedChanges(false)
            navigate('/administracion')
          }
        })
    } else {
      navigate('/administracion')
    }
  }

  const formatearHorario = (horario, duracion) => {
    if (!horario) return 'Horario no disponible'

    try {
      const [horas, minutos] = horario.split(':')
      const horaInicio = `${horas}:${minutos}`

      const horaInicioDate = new Date()
      horaInicioDate.setHours(
        Number.parseInt(horas),
        Number.parseInt(minutos),
        0
      )

      const horaFinDate = new Date(horaInicioDate)
      horaFinDate.setMinutes(
        horaFinDate.getMinutes() + Number.parseInt(duracion || 60)
      )

      const horaFin = `${horaFinDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${horaFinDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`

      return `${horaInicio} - ${horaFin}`
    } catch (error) {
      console.error('Error al formatear horario:', error)
      return horario
    }
  }

  const getNivelClass = (nivel) => {
    if (!nivel) return ''

    const nivelLower = nivel.toLowerCase()
    if (nivelLower.includes('principiante'))
      return 'cf-admin-clases-nivel-principiante'
    if (nivelLower.includes('intermedio'))
      return 'cf-admin-clases-nivel-intermedio'
    if (nivelLower.includes('avanzado')) return 'cf-admin-clases-nivel-avanzado'

    return ''
  }

  const renderClasesPorDia = () => {
    return Object.entries(clasesPorDia).map(([clave, clases]) => {
      let titulo = clave

      if (clave.startsWith('fecha_')) {
        const fechaStr = clave.replace('fecha_', '')
        try {
          const fechaObj = new Date(fechaStr)
          titulo = format(fechaObj, "d 'de' MMMM 'de' yyyy", { locale: es })
        } catch (error) {
          console.error('Error al formatear fecha:', error)
        }
      } else if (diasSemana.includes(clave)) {
        titulo = clave.charAt(0).toUpperCase() + clave.slice(1)
      }

      return (
        <div key={clave} className='cf-admin-clases-dia'>
          <h2 className='cf-admin-clases-dia-titulo'>{titulo}</h2>
          <div className='cf-admin-clases-grid'>
            {clases.map((clase) => (
              <div key={clase._id} className='cf-admin-clases-card'>
                {clase.imagen ? (
                  <img
                    src={clase.imagen || '/placeholder.svg'}
                    alt={clase.nombre}
                    className='cf-admin-clases-card-imagen'
                  />
                ) : (
                  <div className='cf-admin-clases-card-no-imagen'>
                    <div className='cf-admin-clases-card-no-imagen-icon'></div>
                  </div>
                )}

                <div className='cf-admin-clases-card-header'>
                  <div>
                    <h3 className='cf-admin-clases-card-title'>
                      {clase.nombre}
                    </h3>
                    <div className='cf-admin-clases-card-horario'>
                      <div className='cf-admin-clases-card-horario-icon'></div>
                      <p className='cf-admin-clases-card-horario-text'>
                        {formatearHorario(clase.horario, clase.duracion)}
                      </p>
                    </div>
                    {clase.nivel && (
                      <span
                        className={`cf-admin-clases-card-nivel-badge ${getNivelClass(
                          clase.nivel
                        )}`}
                      >
                        {clase.nivel}
                      </span>
                    )}
                  </div>
                </div>

                <div className='cf-admin-clases-card-content'>
                  <div className='cf-admin-clases-card-info'>
                    {clase.ubicacion && (
                      <div className='cf-admin-clases-card-info-item'>
                        <div className='cf-admin-clases-card-info-icon ubicacion'></div>
                        <p className='cf-admin-clases-card-info-text'>
                          <span className='cf-admin-clases-card-info-label'>
                            Ubicación:
                          </span>{' '}
                          {clase.ubicacion}
                        </p>
                      </div>
                    )}

                    {clase.capacidadMaxima && (
                      <div className='cf-admin-clases-card-info-item'>
                        <div className='cf-admin-clases-card-info-icon capacidad'></div>
                        <p className='cf-admin-clases-card-info-text'>
                          <span className='cf-admin-clases-card-info-label'>
                            Capacidad:
                          </span>{' '}
                          {clase.capacidadMaxima} personas
                        </p>
                      </div>
                    )}

                    {clase.categoria && (
                      <div className='cf-admin-clases-card-info-item'>
                        <div className='cf-admin-clases-card-info-icon categoria'></div>
                        <p className='cf-admin-clases-card-info-text'>
                          <span className='cf-admin-clases-card-info-label'>
                            Categoría:
                          </span>{' '}
                          {clase.categoria}
                        </p>
                      </div>
                    )}

                    {clase.entrenador && clase.entrenador.nombre && (
                      <div className='cf-admin-clases-card-info-item'>
                        <div className='cf-admin-clases-card-info-icon entrenador'></div>
                        <p className='cf-admin-clases-card-info-text'>
                          <span className='cf-admin-clases-card-info-label'>
                            Entrenador:
                          </span>{' '}
                          {clase.entrenador.nombre}
                        </p>
                      </div>
                    )}
                  </div>

                  {clase.descripcion && (
                    <div className='cf-admin-clases-card-descripcion'>
                      <p className='cf-admin-clases-card-descripcion-text'>
                        {clase.descripcion}
                      </p>
                    </div>
                  )}
                </div>

                <div className='cf-admin-clases-card-footer'>
                  <button
                    className='cf-admin-clases-card-btn cf-admin-clases-card-btn-edit'
                    onClick={() => handleEdit(clase)}
                    aria-label='Editar clase'
                  >
                    <div className='cf-admin-clases-card-btn-icon'></div>
                    Editar
                  </button>
                  <button
                    className='cf-admin-clases-card-btn cf-admin-clases-card-btn-delete'
                    onClick={() => handleDeleteConfirm(clase._id, clase.nombre)}
                    aria-label='Eliminar clase'
                  >
                    <div className='cf-admin-clases-card-btn-icon'></div>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  if (loading && !isModalOpen) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO ADMINISTRACIÓN DE CLASES...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div className='cf-admin-clases-container'>
      <Header />
      <div className='cf-admin-clases-content'>
        <div className='cf-admin-clases-header'>
          <Button
            variant='secondary'
            onClick={handleNavigateAway}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a Administración
          </Button>
          <h1 className='cf-admin-clases-title'>Administración de Clases</h1>
          <Button
            className='cf-admin-clases-new-btn'
            variant='primary'
            size='md'
            onClick={() => {
              setFormData(null)
              setEditingId(null)
              setIsModalOpen(true)
              setHasUnsavedChanges(false)
            }}
            leftIcon={<Plus size={18} />}
          >
            Nueva Clase
          </Button>
        </div>

        {error && (
          <div className='cf-admin-clases-error'>
            <div className='cf-admin-clases-error-icon'></div>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className='cf-admin-clases-success'>
            <div className='cf-admin-clases-success-icon'></div>
            <p>{success}</p>
          </div>
        )}

        <div className='cf-admin-clases-filtro'>
          <div className='cf-admin-clases-filtro-label'>Filtrar por:</div>
          <div className='cf-admin-clases-filtro-select-container'>
            <select
              value={diaSeleccionado}
              onChange={(e) => setDiaSeleccionado(e.target.value)}
              className='cf-admin-clases-filtro-select'
            >
              <option value='todos'>Todos</option>
              <optgroup label='Días de la semana'>
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </option>
                ))}
              </optgroup>
              {fechasUnicas.length > 0 && (
                <optgroup label='Fechas específicas'>
                  {fechasUnicas.map((fecha) => (
                    <option key={fecha.valor} value={`fecha_${fecha.valor}`}>
                      {fecha.texto}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <div className='cf-admin-clases-filtro-select-icon'></div>
          </div>
        </div>

        {Object.keys(clasesPorDia).length > 0 ? (
          <div className='cf-admin-clases-content-wrapper'>
            {renderClasesPorDia()}
          </div>
        ) : (
          <div className='cf-admin-clases-empty'>
            <div className='cf-admin-clases-empty-icon'></div>
            <h3 className='cf-admin-clases-empty-title'>
              No hay clases disponibles
            </h3>
            <p className='cf-admin-clases-empty-text'>
              No hay clases{' '}
              {diaSeleccionado !== 'todos'
                ? `para ${
                    diaSeleccionado.startsWith('fecha_')
                      ? 'esta fecha'
                      : diaSeleccionado
                  }`
                : 'creadas'}
              .
            </p>
            <p className='cf-admin-clases-empty-action'>
              Haz clic en "Nueva Clase" para crear la primera.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ClaseModal
          onClose={handleCloseModal}
          onSuccess={() => {
            fetchClases()
            setHasUnsavedChanges(false)
            closeModalCompletely()
          }}
          editingId={editingId}
          initialData={formData}
          setError={setError}
          setSuccess={setSuccess}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
    </div>
  )
}

export default AdminClases
