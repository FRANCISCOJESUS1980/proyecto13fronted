const ObjetivosHeader = ({ showForm, onToggleForm }) => {
  return (
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
        onClick={onToggleForm}
      >
        <span
          className={`cf-objetivos-btn-icon ${
            showForm ? 'cf-objetivos-cancel-icon' : 'cf-objetivos-add-icon'
          }`}
        ></span>
        {showForm ? 'Cancelar' : 'Añadir Nuevo Objetivo'}
      </button>
    </div>
  )
}

export default ObjetivosHeader
