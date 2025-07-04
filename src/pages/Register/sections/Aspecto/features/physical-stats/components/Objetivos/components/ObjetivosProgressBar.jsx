const ObjetivosProgressBar = ({ progreso }) => {
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

export default ObjetivosProgressBar
