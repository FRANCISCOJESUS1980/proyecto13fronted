import { useState } from 'react'
import { X, PlusCircle, Trash } from 'lucide-react'
import { useFormData } from '../../hooks/useFormData'
import { useEntrenadores } from '../../hooks/useEntrenadores'
import { guardarClase } from '../../services/clasesService'
import './ClaseModal.css'

const ClaseModal = ({
  onClose,
  onSuccess,
  editingId,
  initialData,
  setError,
  setSuccess
}) => {
  const [loading, setLoading] = useState(false)
  const { entrenadores } = useEntrenadores()

  const {
    formData,
    setFormData,
    previewUrl,
    setPreviewUrl,
    modoCreacion,
    setModoCreacion,
    handleImageChange,
    addHorario,
    removeHorario,
    updateHorario
  } = useFormData(initialData)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await guardarClase(formData, editingId, modoCreacion)

      if (result.success) {
        setSuccess(
          `${result.clasesCreadas} horarios de clase ${
            editingId ? 'actualizados' : 'creados'
          } con éxito`
        )
        setTimeout(() => setSuccess(null), 3000)
        onSuccess()
      }

      if (result.clasesConError > 0) {
        setError(
          `Hubo errores al crear ${result.clasesConError} horarios. Por favor, inténtalo de nuevo.`
        )
      }
    } catch (error) {
      console.error('Error al guardar la clase:', error)
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='cf-clase-modal-overlay'>
      <div className='cf-clase-modal'>
        <div className='cf-clase-modal-header'>
          <h2>{editingId ? 'Editar Clase' : 'Nueva Clase'}</h2>
          <button onClick={onClose} className='cf-clase-btn-icon'>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='cf-clase-modal-form'>
          <div className='cf-clase-form-group'>
            <label htmlFor='nombre' className='cf-clase-form-label'>
              Nombre
            </label>
            <input
              type='text'
              id='nombre'
              className='cf-clase-form-input'
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className='cf-clase-form-group'>
            <label htmlFor='descripcion' className='cf-clase-form-label'>
              Descripción
            </label>
            <textarea
              id='descripcion'
              className='cf-clase-form-textarea'
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              required
            />
          </div>

          <div className='cf-clase-form-row'>
            <div className='cf-clase-form-group'>
              <label htmlFor='categoria' className='cf-clase-form-label'>
                Categoría
              </label>
              <select
                id='categoria'
                className='cf-clase-form-select'
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

            <div className='cf-clase-form-group'>
              <label htmlFor='nivel' className='cf-clase-form-label'>
                Nivel
              </label>
              <select
                id='nivel'
                className='cf-clase-form-select'
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

          <div className='cf-clase-form-group cf-clase-modo-creacion'>
            <label className='cf-clase-form-label'>Modo de creación</label>
            <div className='cf-clase-radio-group'>
              <label className='cf-clase-radio-label'>
                <input
                  type='radio'
                  name='modoCreacion'
                  className='cf-clase-radio-input'
                  value='semanal'
                  checked={modoCreacion === 'semanal'}
                  onChange={() => setModoCreacion('semanal')}
                />
                <p>Día de la semana (recurrente)</p>
              </label>
              <label className='cf-clase-radio-label'>
                <input
                  type='radio'
                  name='modoCreacion'
                  className='cf-clase-radio-input'
                  value='fecha'
                  checked={modoCreacion === 'fecha'}
                  onChange={() => setModoCreacion('fecha')}
                />
                <p>Fecha específica</p>
              </label>
            </div>
          </div>

          {modoCreacion === 'semanal' ? (
            <div className='cf-clase-form-group'>
              <label htmlFor='diaSemana' className='cf-clase-form-label'>
                Día de la semana
              </label>
              <select
                id='diaSemana'
                className='cf-clase-form-select'
                value={formData.diaSemana}
                onChange={(e) =>
                  setFormData({ ...formData, diaSemana: e.target.value })
                }
                required={modoCreacion === 'semanal'}
              >
                <option value=''>Seleccionar día</option>
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className='cf-clase-form-group'>
              <label htmlFor='fecha' className='cf-clase-form-label'>
                Fecha específica
              </label>
              <input
                type='date'
                id='fecha'
                className='cf-clase-form-input'
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                required={modoCreacion === 'fecha'}
              />
            </div>
          )}

          <div className='cf-clase-form-group'>
            <div className='cf-clase-horarios-header'>
              <label className='cf-clase-form-label'>Horarios</label>
              <button
                type='button'
                className='cf-clase-btn-add-horario'
                onClick={addHorario}
                disabled={editingId}
              >
                <PlusCircle size={16} />
                <span>Añadir horario</span>
              </button>
            </div>

            <div className='cf-clase-horarios-container'>
              {formData.horarios.map((horario, index) => (
                <div key={index} className='cf-clase-horario-item'>
                  <div className='cf-clase-horario-inputs'>
                    <div className='cf-clase-horario-input'>
                      <label
                        htmlFor={`horario-${index}`}
                        className='cf-clase-form-label'
                      >
                        Hora
                      </label>
                      <input
                        type='time'
                        id={`horario-${index}`}
                        className='cf-clase-form-input'
                        value={horario.hora}
                        onChange={(e) =>
                          updateHorario(index, 'hora', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className='cf-clase-horario-input'>
                      <label
                        htmlFor={`duracion-${index}`}
                        className='cf-clase-form-label'
                      >
                        Duración (min)
                      </label>
                      <input
                        type='number'
                        id={`duracion-${index}`}
                        className='cf-clase-form-input'
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
                      className='cf-clase-btn-remove-horario'
                      onClick={() => removeHorario(index)}
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='cf-clase-form-row'>
            <div className='cf-clase-form-group'>
              <label htmlFor='capacidadMaxima' className='cf-clase-form-label'>
                Capacidad Máxima
              </label>
              <input
                type='number'
                id='capacidadMaxima'
                className='cf-clase-form-input'
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

            <div className='cf-clase-form-group'>
              <label htmlFor='ubicacion' className='cf-clase-form-label'>
                Ubicación
              </label>
              <input
                type='text'
                id='ubicacion'
                className='cf-clase-form-input'
                value={formData.ubicacion}
                onChange={(e) =>
                  setFormData({ ...formData, ubicacion: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='cf-clase-form-group'>
            <label htmlFor='entrenador' className='cf-clase-form-label'>
              Entrenador (opcional)
            </label>
            <select
              id='entrenador'
              className='cf-clase-form-select'
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

          <div className='cf-clase-form-group'>
            <label htmlFor='imagen' className='cf-clase-form-label'>
              Imagen
            </label>
            <div className='cf-clase-avatar-upload'>
              <div
                className='cf-clase-avatar-preview'
                style={{
                  backgroundImage: previewUrl
                    ? `url(${previewUrl})`
                    : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999999' strokeWidth='1.5'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/%3E%3C/svg%3E\")"
                }}
              >
                <div className='cf-clase-avatar-overlay'>
                  <span>Cambiar</span>
                </div>
              </div>
              <input
                type='file'
                id='imagen'
                accept='image/*'
                onChange={handleImageChange}
                className='cf-clase-avatar-input'
              />
              <label htmlFor='imagen' className='cf-clase-avatar-label'>
                {previewUrl ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </label>
            </div>
          </div>

          <div className='cf-clase-modal-footer'>
            <button
              type='button'
              className='cf-clase-btn-secondary'
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='cf-clase-btn-primary'
              disabled={loading}
            >
              {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClaseModal
