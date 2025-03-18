import { useState } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats.js'
import Card from '../ui/Card/Card.jsx'
import Button from '../../../../../../../../components/Button/Button.jsx'
import ProgressBar from '../ui/ProgressBar/ProgressBar.jsx'
import './ObjetivosTab.css'

const ObjetivosTab = ({ onMessage }) => {
  const { objetivos, loading, createObjetivo } = usePhysicalStats()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'peso',
    medida: 'peso',
    valorObjetivo: '',
    fechaObjetivo: ''
  })

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

  const calcularDiasRestantes = (fechaObjetivo) => {
    const hoy = new Date()
    const fecha = new Date(fechaObjetivo)
    const diferencia = fecha - hoy
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)))
  }

  return (
    <div className='objetivos-container'>
      <div className='objetivos-header'>
        <h3>Mis Objetivos</h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          className={showForm ? 'cancel-btn' : 'add-btn'}
        >
          {showForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
        </Button>
      </div>

      {showForm && (
        <Card className='objetivo-form-card'>
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

            <Button
              type='submit'
              disabled={loading}
              className='save-objetivo-btn'
            >
              {loading ? 'Guardando...' : 'Guardar Objetivo'}
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className='loading-container'>
          <div className='loading-spinner'>Cargando objetivos...</div>
        </div>
      ) : objetivos.length === 0 ? (
        <Card className='no-objetivos-card'>
          <div className='no-data'>
            <p>No tienes objetivos establecidos.</p>
            <p>
              Crea tu primer objetivo para comenzar a hacer seguimiento de tu
              progreso.
            </p>
          </div>
        </Card>
      ) : (
        <div className='objetivos-grid'>
          {objetivos.map((objetivo, index) => (
            <Card
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
                  <ProgressBar
                    progress={objetivo.progreso}
                    showLabel={true}
                    color={objetivo.completado ? '#2ecc71' : '#3498db'}
                  />
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
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ObjetivosTab
