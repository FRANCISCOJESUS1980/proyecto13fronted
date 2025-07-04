import ObjetivosCard from './ObjetivosCard'

const ObjetivosList = ({ objetivos, loading, onDelete }) => {
  if (loading) {
    return (
      <div className='cf-objetivos-loading'>
        <div className='cf-objetivos-spinner'></div>
        <p>Cargando objetivos...</p>
      </div>
    )
  }

  if (objetivos.length === 0) {
    return (
      <div className='cf-objetivos-empty'>
        <div className='cf-objetivos-empty-icon'></div>
        <p>No tienes objetivos establecidos.</p>
        <p>
          Crea tu primer objetivo para comenzar a hacer seguimiento de tu
          progreso.
        </p>
      </div>
    )
  }

  return (
    <div className='cf-objetivos-grid'>
      {objetivos.map((objetivo, index) => (
        <ObjetivosCard
          key={objetivo._id || index}
          objetivo={objetivo}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ObjetivosList
