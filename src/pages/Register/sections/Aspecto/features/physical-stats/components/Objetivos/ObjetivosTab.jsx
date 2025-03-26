import { useState, useEffect } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import './ObjetivosTab.css'

const ObjetivosTab = ({ onMessage }) => {
  const { objetivos, loading, createObjetivo, fetchObjetivos } =
    usePhysicalStats()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'peso',
    medida: 'peso',
    valorObjetivo: '',
    fechaObjetivo: ''
  })

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

      fetchObjetivos()
    }

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  const getUnidad = (medida) => {
    switch (medida) {
      case 'peso':
        return 'kg'
      case 'grasa':
      case 'musculo':
        return '%'
      default:
        return 'cm'
    }
  }

  const getMedidaNombre = (medida) => {
    switch (medida) {
      case 'peso':
        return 'Peso'
      case 'grasa':
        return '% Grasa'
      case 'musculo':
        return '% Músculo'
      case 'pecho':
        return 'Pecho'
      case 'cintura':
        return 'Cintura'
      case 'cadera':
        return 'Cadera'
      case 'biceps':
        return 'Bíceps'
      case 'muslos':
        return 'Muslos'
      default:
        return medida
    }
  }

  const renderProgressBar = (progreso) => {
    return (
      <div className='progress-bar-container'>
        <div
          className='progress-bar-fill'
          style={{
            width: `${progreso}%`,
            backgroundColor: progreso >= 100 ? '#2ecc71' : '#3498db'
          }}
        ></div>
        <span className='progress-text'>{Math.round(progreso)}%</span>
      </div>
    )
  }

  const calcularDiasRestantes = (fechaObjetivo) => {
    const hoy = new Date()
    const fecha = new Date(fechaObjetivo)
    const diferencia = fecha - hoy
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)))
  }

  console.log('ObjetivosTab: Objetivos cargados:', objetivos)

  return (
    <div className='objetivos-container'>
      <div className='objetivos-header'>
        <h3>Mis Objetivos</h3>
        <button
          className={`add-goal-btn ${showForm ? 'cancel' : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
        </button>
      </div>

      {showForm && (
        <div className='objetivo-form-card'>
          <form onSubmit={handleSubmit} className='objetivo-form'>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='medida'>Medida</label>
                <select
                  id='medida'
                  name='medida'
                  value={formData.medida}
                  onChange={handleChange}
                  required
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
              </div>

              <div className='form-group'>
                <label htmlFor='tipo'>Tipo de Objetivo</label>
                <select
                  id='tipo'
                  name='tipo'
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value='peso'>Cambio de Peso</option>
                  <option value='grasa'>Reducción de Grasa</option>
                  <option value='musculo'>Aumento Muscular</option>
                  <option value='medida'>Cambio de Medida</option>
                </select>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='valorObjetivo'>Valor Objetivo</label>
                <input
                  type='number'
                  id='valorObjetivo'
                  name='valorObjetivo'
                  value={formData.valorObjetivo}
                  onChange={handleChange}
                  placeholder={`Ej: 70 ${getUnidad(formData.medida)}`}
                  required
                  step='0.1'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='fechaObjetivo'>Fecha Objetivo</label>
                <input
                  type='date'
                  id='fechaObjetivo'
                  name='fechaObjetivo'
                  value={formData.fechaObjetivo}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <button type='submit' className='save-goal-btn' disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Objetivo'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className='loading-container'>Cargando objetivos...</div>
      ) : objetivos.length === 0 ? (
        <div className='no-objetivos-card'>
          <div className='no-data'>
            <p>No tienes objetivos establecidos.</p>
            <p>
              Crea tu primer objetivo para comenzar a hacer seguimiento de tu
              progreso.
            </p>
          </div>
        </div>
      ) : (
        <div className='objetivos-grid'>
          {objetivos.map((objetivo, index) => (
            <div
              key={index}
              className={`objetivo-card ${
                objetivo.completado ? 'completed' : ''
              }`}
            >
              <div className='objetivo-header'>
                <h4>{getMedidaNombre(objetivo.medida)}</h4>
                <span
                  className={`objetivo-status ${
                    objetivo.completado ? 'completed' : ''
                  }`}
                >
                  {objetivo.completado ? 'Completado' : 'En progreso'}
                </span>
              </div>

              <div className='objetivo-details'>
                <div className='objetivo-values'>
                  <span className='valor-inicial'>
                    {objetivo.valorInicial} {getUnidad(objetivo.medida)}
                  </span>
                  <span className='arrow'>→</span>
                  <span className='valor-objetivo'>
                    {objetivo.valorObjetivo} {getUnidad(objetivo.medida)}
                  </span>
                </div>

                <div className='objetivo-progress'>
                  {renderProgressBar(objetivo.progreso)}
                </div>

                <div className='objetivo-meta'>
                  <div className='objetivo-fecha'>
                    <span className='meta-label'>Fecha límite:</span>
                    <span className='meta-value'>
                      {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                    </span>
                  </div>

                  {!objetivo.completado && (
                    <div className='objetivo-dias'>
                      <span className='meta-label'>Días restantes:</span>
                      <span className='meta-value'>
                        {calcularDiasRestantes(objetivo.fechaObjetivo)}
                      </span>
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
