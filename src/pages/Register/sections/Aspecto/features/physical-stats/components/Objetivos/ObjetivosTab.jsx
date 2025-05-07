/*import { useState, useEffect } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import ConfirmModal from '../ui/ConfirmModal/ConfirmModal'
import './ObjetivosTab.css'

const ObjetivosTab = ({ onMessage }) => {
  const { objetivos, loading, createObjetivo, fetchObjetivos, deleteObjetivo } =
    usePhysicalStats()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'peso',
    medida: 'peso',
    valorObjetivo: '',
    fechaObjetivo: ''
  })
  const [animationComplete, setAnimationComplete] = useState(false)

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    objetivoId: null,
    title: '',
    message: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('ObjetivosTab: Cargando objetivos...')
    fetchObjetivos()
  }, [fetchObjetivos])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fechaObjetivo = new Date(formData.fechaObjetivo)
    const hoy = new Date()

    if (fechaObjetivo <= hoy) {
      onMessage({
        text: 'La fecha objetivo debe ser posterior a hoy',
        type: 'error'
      })
      return
    }

    const objetivoData = {
      ...formData,
      valorObjetivo: Number(formData.valorObjetivo)
    }

    const result = await createObjetivo(objetivoData)

    if (result.success) {
      setShowForm(false)
      setFormData({
        tipo: 'peso',
        medida: 'peso',
        valorObjetivo: '',
        fechaObjetivo: ''
      })
    }

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  const handleDeleteClick = (objetivoId) => {
    setConfirmModal({
      isOpen: true,
      objetivoId,
      title: 'Eliminar Objetivo',
      message:
        '¿Estás seguro de que deseas eliminar este objetivo? Esta acción no se puede deshacer.'
    })
  }

  const handleConfirmDelete = async () => {
    try {
      const { objetivoId } = confirmModal

      if (typeof deleteObjetivo !== 'function') {
        console.error('deleteObjetivo no es una función:', deleteObjetivo)
        onMessage({
          text: 'Error interno: función de eliminación no disponible',
          type: 'error'
        })
        return
      }

      const result = await deleteObjetivo(objetivoId)

      setConfirmModal({
        isOpen: false,
        objetivoId: null,
        title: '',
        message: ''
      })

      onMessage({
        text: result.message,
        type: result.success ? 'success' : 'error'
      })
    } catch (error) {
      console.error('Error al eliminar objetivo:', error)

      setConfirmModal({
        isOpen: false,
        objetivoId: null,
        title: '',
        message: ''
      })

      onMessage({
        text: error.message || 'Error al eliminar objetivo',
        type: 'error'
      })
    }
  }

  const handleCancelDelete = () => {
    setConfirmModal({
      isOpen: false,
      objetivoId: null,
      title: '',
      message: ''
    })
  }

  const unidadesMedida = {
    peso: 'kg',
    grasa: '%',
    musculo: '%',
    default: 'cm'
  }

  const getUnidad = (medida) => {
    return unidadesMedida[medida] || unidadesMedida.default
  }

  const nombresMedida = {
    peso: 'Peso',
    grasa: '% Grasa',
    musculo: '% Músculo',
    pecho: 'Pecho',
    cintura: 'Cintura',
    cadera: 'Cadera',
    biceps: 'Bíceps',
    muslos: 'Muslos'
  }

  const getMedidaNombre = (medida) => {
    return nombresMedida[medida] || medida
  }

  const iconosTipo = {
    peso: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-peso-icon'></span>
    ),
    grasa: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-grasa-icon'></span>
    ),
    musculo: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-musculo-icon'></span>
    ),
    medida: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-medida-icon'></span>
    ),
    default: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-default-icon'></span>
    )
  }

  const getTipoIcon = (tipo) => {
    return iconosTipo[tipo] || iconosTipo.default
  }

  const renderProgressBar = (progreso) => {
    const progressClass =
      progreso >= 100
        ? 'cf-objetivos-progress-complete'
        : progreso >= 75
        ? 'cf-objetivos-progress-almost'
        : 'cf-objetivos-progress-ongoing'

    return (
      <div className='cf-objetivos-progress-bar-container'>
        <div
          className={`cf-objetivos-progress-bar-fill ${progressClass}`}
          style={{
            width: `${Math.min(100, progreso)}%`
          }}
        ></div>
        <span className='cf-objetivos-progress-text'>
          {Math.round(progreso)}%
        </span>
      </div>
    )
  }

  const calcularDiasRestantes = (fechaObjetivo) => {
    const hoy = new Date()
    const fecha = new Date(fechaObjetivo)
    const diferencia = fecha - hoy
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)))
  }

  return (
    <div
      className={`cf-objetivos-container ${
        animationComplete ? 'cf-objetivos-fade-in' : ''
      }`}
    >
      <div className='cf-objetivos-header'>
        <div className='cf-objetivos-title-container'>
          <div className='cf-objetivos-icon'></div>
          <h2 className='cf-objetivos-title'>Mis Objetivos</h2>
        </div>
        <div className='cf-objetivos-subtitle'>
          Establece y haz seguimiento de tus metas de fitness
        </div>
        <button
          className={`cf-objetivos-add-btn ${
            showForm ? 'cf-objetivos-cancel' : ''
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          <span
            className={`cf-objetivos-btn-icon ${
              showForm ? 'cf-objetivos-cancel-icon' : 'cf-objetivos-add-icon'
            }`}
          ></span>
          {showForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
        </button>
      </div>

      {showForm && (
        <div className='cf-objetivos-form-card'>
          <div className='cf-objetivos-form-header'>
            <span className='cf-objetivos-form-icon'></span>
            <h3 className='cf-objetivos-form-title'>Crear Nuevo Objetivo</h3>
          </div>
          <form onSubmit={handleSubmit} className='cf-objetivos-form'>
            <div className='cf-objetivos-form-row'>
              <div className='cf-objetivos-form-group'>
                <label htmlFor='medida'>
                  <span className='cf-objetivos-label-icon cf-objetivos-medida-label-icon'></span>
                  Medida
                </label>
                <div className='cf-objetivos-select-wrapper'>
                  <select
                    id='medida'
                    name='medida'
                    value={formData.medida}
                    onChange={handleChange}
                    required
                    className='cf-objetivos-select'
                  >
                    <option value='peso'>Peso</option>
                    <option value='grasa'>% Grasa</option>
                    <option value='musculo'>% Músculo</option>
                    <option value='pecho'>Pecho</option>
                    <option value='cintura'>Cintura</option>
                    <option value='cadera'>Cadera</option>
                    <option value='biceps'>Bíceps</option>
                    <option value='muslos'>Muslos</option>
                  </select>
                  <span className='cf-objetivos-select-arrow'></span>
                </div>
              </div>

              <div className='cf-objetivos-form-group'>
                <label htmlFor='tipo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-tipo-label-icon'></span>
                  Tipo de Objetivo
                </label>
                <div className='cf-objetivos-select-wrapper'>
                  <select
                    id='tipo'
                    name='tipo'
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className='cf-objetivos-select'
                  >
                    <option value='peso'>Cambio de Peso</option>
                    <option value='grasa'>Reducción de Grasa</option>
                    <option value='musculo'>Aumento Muscular</option>
                    <option value='medida'>Cambio de Medida</option>
                  </select>
                  <span className='cf-objetivos-select-arrow'></span>
                </div>
              </div>
            </div>

            <div className='cf-objetivos-form-row'>
              <div className='cf-objetivos-form-group'>
                <label htmlFor='valorObjetivo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-valor-label-icon'></span>
                  Valor Objetivo
                </label>
                <div className='cf-objetivos-input-wrapper'>
                  <input
                    type='number'
                    id='valorObjetivo'
                    name='valorObjetivo'
                    value={formData.valorObjetivo}
                    onChange={handleChange}
                    placeholder={`Ej: 70 ${getUnidad(formData.medida)}`}
                    required
                    step='0.1'
                    className='cf-objetivos-input'
                  />
                  <span className='cf-objetivos-input-unit'>
                    {getUnidad(formData.medida)}
                  </span>
                </div>
              </div>

              <div className='cf-objetivos-form-group'>
                <label htmlFor='fechaObjetivo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-fecha-label-icon'></span>
                  Fecha Objetivo
                </label>
                <input
                  type='date'
                  id='fechaObjetivo'
                  name='fechaObjetivo'
                  value={formData.fechaObjetivo}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className='cf-objetivos-input cf-objetivos-date-input'
                />
              </div>
            </div>

            <div className='cf-objetivos-form-actions'>
              <button
                type='submit'
                className='cf-objetivos-save-btn'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='cf-objetivos-spinner'></span>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <span className='cf-objetivos-save-icon'></span>
                    <span>Guardar Objetivo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className='cf-objetivos-loading'>
          <div className='cf-objetivos-spinner'></div>
          <p>Cargando objetivos...</p>
        </div>
      ) : objetivos.length === 0 ? (
        <div className='cf-objetivos-empty'>
          <div className='cf-objetivos-empty-icon'></div>
          <p>No tienes objetivos establecidos.</p>
          <p>
            Crea tu primer objetivo para comenzar a hacer seguimiento de tu
            progreso.
          </p>
        </div>
      ) : (
        <div className='cf-objetivos-grid'>
          {objetivos.map((objetivo, index) => (
            <div
              key={objetivo._id || index}
              className={`cf-objetivos-card ${
                objetivo.completado ? 'cf-objetivos-card-completed' : ''
              }`}
            >
              <div className='cf-objetivos-card-header'>
                <div className='cf-objetivos-card-title'>
                  {getTipoIcon(objetivo.tipo)}
                  <h4>{getMedidaNombre(objetivo.medida)}</h4>
                </div>
                <div className='cf-objetivos-card-actions'>
                  <span
                    className={`cf-objetivos-status ${
                      objetivo.completado
                        ? 'cf-objetivos-status-completed'
                        : 'cf-objetivos-status-progress'
                    }`}
                  >
                    {objetivo.completado ? 'Completado' : 'En progreso'}
                  </span>
                  <button
                    className='cf-objetivos-delete-btn'
                    onClick={() => handleDeleteClick(objetivo._id)}
                    title='Eliminar objetivo'
                  >
                    <span className='cf-objetivos-delete-icon'></span>
                  </button>
                </div>
              </div>

              <div className='cf-objetivos-card-body'>
                <div className='cf-objetivos-values'>
                  <span className='cf-objetivos-valor-inicial'>
                    {objetivo.valorInicial} {getUnidad(objetivo.medida)}
                  </span>
                  <span className='cf-objetivos-arrow'></span>
                  <span className='cf-objetivos-valor-objetivo'>
                    {objetivo.valorObjetivo} {getUnidad(objetivo.medida)}
                  </span>
                </div>

                <div className='cf-objetivos-progress'>
                  {renderProgressBar(objetivo.progreso)}
                </div>

                <div className='cf-objetivos-meta'>
                  <div className='cf-objetivos-meta-item'>
                    <span className='cf-objetivos-meta-icon cf-objetivos-calendar-icon'></span>
                    <div className='cf-objetivos-meta-content'>
                      <span className='cf-objetivos-meta-label'>
                        Fecha límite:
                      </span>
                      <span className='cf-objetivos-meta-value'>
                        {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {!objetivo.completado && (
                    <div className='cf-objetivos-meta-item'>
                      <span className='cf-objetivos-meta-icon cf-objetivos-clock-icon'></span>
                      <div className='cf-objetivos-meta-content'>
                        <span className='cf-objetivos-meta-label'>
                          Días restantes:
                        </span>
                        <span className='cf-objetivos-meta-value cf-objetivos-days'>
                          {calcularDiasRestantes(objetivo.fechaObjetivo)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}

export default ObjetivosTab*/
import { useState, useEffect, useRef } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import alertService from '../../../../../../../../components/sweealert2/sweealert2'
import './ObjetivosTab.css'

const ObjetivosTab = ({ onMessage }) => {
  const { objetivos, loading, createObjetivo, fetchObjetivos, deleteObjetivo } =
    usePhysicalStats()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'peso',
    medida: 'peso',
    valorObjetivo: '',
    fechaObjetivo: ''
  })
  const [animationComplete, setAnimationComplete] = useState(false)
  const originalDataRef = useRef(null)

  useEffect(() => {
    window.objetivosHasUnsavedChanges = false

    return () => {
      window.objetivosHasUnsavedChanges = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('ObjetivosTab: Cargando objetivos...')
    fetchObjetivos()
  }, [fetchObjetivos])

  useEffect(() => {
    if (showForm) {
      originalDataRef.current = JSON.stringify(formData)
      window.objetivosHasUnsavedChanges = false
    } else {
      window.objetivosHasUnsavedChanges = false
    }
  }, [showForm])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (showForm && originalDataRef.current) {
      const updatedData = {
        ...formData,
        [name]: value
      }
      const currentData = JSON.stringify(updatedData)
      window.objetivosHasUnsavedChanges =
        originalDataRef.current !== currentData
    }
  }

  const handleToggleForm = () => {
    if (showForm && window.objetivosHasUnsavedChanges) {
      alertService
        .confirm(
          '¿Estás seguro?',
          'Tienes cambios sin guardar. ¿Deseas salir sin guardar?',
          {
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, continuar editando'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            setShowForm(false)
            setFormData({
              tipo: 'peso',
              medida: 'peso',
              valorObjetivo: '',
              fechaObjetivo: ''
            })
          }
        })
    } else {
      setShowForm(!showForm)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fechaObjetivo = new Date(formData.fechaObjetivo)
    const hoy = new Date()

    if (fechaObjetivo <= hoy) {
      alertService.error('Error', 'La fecha objetivo debe ser posterior a hoy')

      onMessage({
        text: 'La fecha objetivo debe ser posterior a hoy',
        type: 'error'
      })
      return
    }

    const objetivoData = {
      ...formData,
      valorObjetivo: Number(formData.valorObjetivo)
    }

    const result = await createObjetivo(objetivoData)

    if (result.success) {
      alertService.success(
        '¡Éxito!',
        'Tu objetivo ha sido creado correctamente'
      )

      setShowForm(false)
      setFormData({
        tipo: 'peso',
        medida: 'peso',
        valorObjetivo: '',
        fechaObjetivo: ''
      })
      window.objetivosHasUnsavedChanges = false
    } else {
      alertService.error(
        'Error',
        result.message || 'No se pudo crear el objetivo'
      )
    }

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  const handleDeleteClick = (objetivoId) => {
    alertService
      .confirm(
        'Eliminar Objetivo',
        '¿Estás seguro de que deseas eliminar este objetivo? Esta acción no se puede deshacer.',
        {
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          icon: 'warning'
        }
      )
      .then(async (result) => {
        if (result.isConfirmed) {
          await handleDeleteObjetivo(objetivoId)
        }
      })
  }

  const handleDeleteObjetivo = async (objetivoId) => {
    try {
      if (typeof deleteObjetivo !== 'function') {
        console.error('deleteObjetivo no es una función:', deleteObjetivo)
        alertService.error(
          'Error',
          'Error interno: función de eliminación no disponible'
        )

        onMessage({
          text: 'Error interno: función de eliminación no disponible',
          type: 'error'
        })
        return
      }

      const result = await deleteObjetivo(objetivoId)

      if (result.success) {
        alertService.success(
          '¡Éxito!',
          'El objetivo ha sido eliminado correctamente'
        )
      } else {
        alertService.error(
          'Error',
          result.message || 'No se pudo eliminar el objetivo'
        )
      }

      onMessage({
        text: result.message,
        type: result.success ? 'success' : 'error'
      })
    } catch (error) {
      console.error('Error al eliminar objetivo:', error)

      alertService.error('Error', error.message || 'Error al eliminar objetivo')

      onMessage({
        text: error.message || 'Error al eliminar objetivo',
        type: 'error'
      })
    }
  }

  const unidadesMedida = {
    peso: 'kg',
    grasa: '%',
    musculo: '%',
    default: 'cm'
  }

  const getUnidad = (medida) => {
    return unidadesMedida[medida] || unidadesMedida.default
  }

  const nombresMedida = {
    peso: 'Peso',
    grasa: '% Grasa',
    musculo: '% Músculo',
    pecho: 'Pecho',
    cintura: 'Cintura',
    cadera: 'Cadera',
    biceps: 'Bíceps',
    muslos: 'Muslos'
  }

  const getMedidaNombre = (medida) => {
    return nombresMedida[medida] || medida
  }

  const iconosTipo = {
    peso: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-peso-icon'></span>
    ),
    grasa: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-grasa-icon'></span>
    ),
    musculo: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-musculo-icon'></span>
    ),
    medida: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-medida-icon'></span>
    ),
    default: (
      <span className='cf-objetivos-tipo-icon cf-objetivos-default-icon'></span>
    )
  }

  const getTipoIcon = (tipo) => {
    return iconosTipo[tipo] || iconosTipo.default
  }

  const renderProgressBar = (progreso) => {
    const progressClass =
      progreso >= 100
        ? 'cf-objetivos-progress-complete'
        : progreso >= 75
        ? 'cf-objetivos-progress-almost'
        : 'cf-objetivos-progress-ongoing'

    return (
      <div className='cf-objetivos-progress-bar-container'>
        <div
          className={`cf-objetivos-progress-bar-fill ${progressClass}`}
          style={{
            width: `${Math.min(100, progreso)}%`
          }}
        ></div>
        <span className='cf-objetivos-progress-text'>
          {Math.round(progreso)}%
        </span>
      </div>
    )
  }

  const calcularDiasRestantes = (fechaObjetivo) => {
    const hoy = new Date()
    const fecha = new Date(fechaObjetivo)
    const diferencia = fecha - hoy
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)))
  }

  return (
    <div
      className={`cf-objetivos-container ${
        animationComplete ? 'cf-objetivos-fade-in' : ''
      }`}
    >
      <div className='cf-objetivos-header'>
        <div className='cf-objetivos-title-container'>
          <div className='cf-objetivos-icon'></div>
          <h2 className='cf-objetivos-title'>Mis Objetivos</h2>
        </div>
        <div className='cf-objetivos-subtitle'>
          Establece y haz seguimiento de tus metas de fitness
        </div>
        <button
          className={`cf-objetivos-add-btn ${
            showForm ? 'cf-objetivos-cancel' : ''
          }`}
          onClick={handleToggleForm}
        >
          <span
            className={`cf-objetivos-btn-icon ${
              showForm ? 'cf-objetivos-cancel-icon' : 'cf-objetivos-add-icon'
            }`}
          ></span>
          {showForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
        </button>
      </div>

      {showForm && (
        <div className='cf-objetivos-form-card'>
          <div className='cf-objetivos-form-header'>
            <span className='cf-objetivos-form-icon'></span>
            <h3 className='cf-objetivos-form-title'>Crear Nuevo Objetivo</h3>
          </div>
          <form onSubmit={handleSubmit} className='cf-objetivos-form'>
            <div className='cf-objetivos-form-row'>
              <div className='cf-objetivos-form-group'>
                <label htmlFor='medida'>
                  <span className='cf-objetivos-label-icon cf-objetivos-medida-label-icon'></span>
                  Medida
                </label>
                <div className='cf-objetivos-select-wrapper'>
                  <select
                    id='medida'
                    name='medida'
                    value={formData.medida}
                    onChange={handleChange}
                    required
                    className='cf-objetivos-select'
                  >
                    <option value='peso'>Peso</option>
                    <option value='grasa'>% Grasa</option>
                    <option value='musculo'>% Músculo</option>
                    <option value='pecho'>Pecho</option>
                    <option value='cintura'>Cintura</option>
                    <option value='cadera'>Cadera</option>
                    <option value='biceps'>Bíceps</option>
                    <option value='muslos'>Muslos</option>
                  </select>
                  <span className='cf-objetivos-select-arrow'></span>
                </div>
              </div>

              <div className='cf-objetivos-form-group'>
                <label htmlFor='tipo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-tipo-label-icon'></span>
                  Tipo de Objetivo
                </label>
                <div className='cf-objetivos-select-wrapper'>
                  <select
                    id='tipo'
                    name='tipo'
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className='cf-objetivos-select'
                  >
                    <option value='peso'>Cambio de Peso</option>
                    <option value='grasa'>Reducción de Grasa</option>
                    <option value='musculo'>Aumento Muscular</option>
                    <option value='medida'>Cambio de Medida</option>
                  </select>
                  <span className='cf-objetivos-select-arrow'></span>
                </div>
              </div>
            </div>

            <div className='cf-objetivos-form-row'>
              <div className='cf-objetivos-form-group'>
                <label htmlFor='valorObjetivo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-valor-label-icon'></span>
                  Valor Objetivo
                </label>
                <div className='cf-objetivos-input-wrapper'>
                  <input
                    type='number'
                    id='valorObjetivo'
                    name='valorObjetivo'
                    value={formData.valorObjetivo}
                    onChange={handleChange}
                    placeholder={`Ej: 70 ${getUnidad(formData.medida)}`}
                    required
                    step='0.1'
                    className='cf-objetivos-input'
                  />
                  <span className='cf-objetivos-input-unit'>
                    {getUnidad(formData.medida)}
                  </span>
                </div>
              </div>

              <div className='cf-objetivos-form-group'>
                <label htmlFor='fechaObjetivo'>
                  <span className='cf-objetivos-label-icon cf-objetivos-fecha-label-icon'></span>
                  Fecha Objetivo
                </label>
                <input
                  type='date'
                  id='fechaObjetivo'
                  name='fechaObjetivo'
                  value={formData.fechaObjetivo}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className='cf-objetivos-input cf-objetivos-date-input'
                />
              </div>
            </div>

            <div className='cf-objetivos-form-actions'>
              <button
                type='submit'
                className='cf-objetivos-save-btn'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='cf-objetivos-spinner'></span>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <span className='cf-objetivos-save-icon'></span>
                    <span>Guardar Objetivo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className='cf-objetivos-loading'>
          <div className='cf-objetivos-spinner'></div>
          <p>Cargando objetivos...</p>
        </div>
      ) : objetivos.length === 0 ? (
        <div className='cf-objetivos-empty'>
          <div className='cf-objetivos-empty-icon'></div>
          <p>No tienes objetivos establecidos.</p>
          <p>
            Crea tu primer objetivo para comenzar a hacer seguimiento de tu
            progreso.
          </p>
        </div>
      ) : (
        <div className='cf-objetivos-grid'>
          {objetivos.map((objetivo, index) => (
            <div
              key={objetivo._id || index}
              className={`cf-objetivos-card ${
                objetivo.completado ? 'cf-objetivos-card-completed' : ''
              }`}
            >
              <div className='cf-objetivos-card-header'>
                <div className='cf-objetivos-card-title'>
                  {getTipoIcon(objetivo.tipo)}
                  <h4>{getMedidaNombre(objetivo.medida)}</h4>
                </div>
                <div className='cf-objetivos-card-actions'>
                  <span
                    className={`cf-objetivos-status ${
                      objetivo.completado
                        ? 'cf-objetivos-status-completed'
                        : 'cf-objetivos-status-progress'
                    }`}
                  >
                    {objetivo.completado ? 'Completado' : 'En progreso'}
                  </span>
                  <button
                    className='cf-objetivos-delete-btn'
                    onClick={() => handleDeleteClick(objetivo._id)}
                    title='Eliminar objetivo'
                  >
                    <span className='cf-objetivos-delete-icon'></span>
                  </button>
                </div>
              </div>

              <div className='cf-objetivos-card-body'>
                <div className='cf-objetivos-values'>
                  <span className='cf-objetivos-valor-inicial'>
                    {objetivo.valorInicial} {getUnidad(objetivo.medida)}
                  </span>
                  <span className='cf-objetivos-arrow'></span>
                  <span className='cf-objetivos-valor-objetivo'>
                    {objetivo.valorObjetivo} {getUnidad(objetivo.medida)}
                  </span>
                </div>

                <div className='cf-objetivos-progress'>
                  {renderProgressBar(objetivo.progreso)}
                </div>

                <div className='cf-objetivos-meta'>
                  <div className='cf-objetivos-meta-item'>
                    <span className='cf-objetivos-meta-icon cf-objetivos-calendar-icon'></span>
                    <div className='cf-objetivos-meta-content'>
                      <span className='cf-objetivos-meta-label'>
                        Fecha límite:
                      </span>
                      <span className='cf-objetivos-meta-value'>
                        {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {!objetivo.completado && (
                    <div className='cf-objetivos-meta-item'>
                      <span className='cf-objetivos-meta-icon cf-objetivos-clock-icon'></span>
                      <div className='cf-objetivos-meta-content'>
                        <span className='cf-objetivos-meta-label'>
                          Días restantes:
                        </span>
                        <span className='cf-objetivos-meta-value cf-objetivos-days'>
                          {calcularDiasRestantes(objetivo.fechaObjetivo)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ObjetivosTab
