const ObjetivosSaveButton = ({ loading, hasUnsavedChanges }) => {
  return (
    <button
      type='submit'
      className={`cf-objetivos-save-btn ${
        hasUnsavedChanges ? 'cf-objetivos-save-btn--modified' : ''
      }`}
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
          <span>
            {hasUnsavedChanges ? 'Guardar Cambios' : 'Guardar Objetivo'}
          </span>
        </>
      )}
    </button>
  )
}

export default ObjetivosSaveButton
