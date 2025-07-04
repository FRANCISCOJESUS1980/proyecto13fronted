import ObjetivosProgressBar from './ObjetivosProgressBar'

const ObjetivosCard = ({ objetivo, onDelete }) => {
  const getUnidad = (medida) => {
    const unidades = {
      peso: 'kg',
      grasa: '%',
      musculo: '%',
      default: 'cm'
    }
    return unidades[medida] || unidades.default
  }

  const getMedidaNombre = (medida) => {
    const nombres = {
      peso: 'Peso',
      grasa: '% Grasa',
      musculo: '% Músculo',
      pecho: 'Pecho',
      cintura: 'Cintura',
      cadera: 'Cadera',
      biceps: 'Bíceps',
      muslos: 'Muslos'
    }
    return nombres[medida] || medida
  }

  const getTipoIcon = (tipo) => {
    const iconClass = `cf-objetivos-tipo-icon cf-objetivos-${tipo}-icon`
    return <span className={iconClass}></span>
  }

  const calcularDiasRestantes = (fechaObjetivo) => {
    const hoy = new Date()
    const fecha = new Date(fechaObjetivo)
    const diferencia = fecha - hoy
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)))
  }

  return (
    <div
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
            onClick={() => onDelete(objetivo._id)}
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
          <ObjetivosProgressBar progreso={objetivo.progreso} />
        </div>

        <div className='cf-objetivos-meta'>
          <div className='cf-objetivos-meta-item'>
            <span className='cf-objetivos-meta-icon cf-objetivos-calendar-icon'></span>
            <div className='cf-objetivos-meta-content'>
              <span className='cf-objetivos-meta-label'>Fecha límite:</span>
              <span className='cf-objetivos-meta-value'>
                {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
              </span>
            </div>
          </div>

          {!objetivo.completado && (
            <div className='cf-objetivos-meta-item'>
              <span className='cf-objetivos-meta-icon cf-objetivos-clock-icon'></span>
              <div className='cf-objetivos-meta-content'>
                <span className='cf-objetivos-meta-label'>Días restantes:</span>
                <span className='cf-objetivos-meta-value cf-objetivos-days'>
                  {calcularDiasRestantes(objetivo.fechaObjetivo)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ObjetivosCard
