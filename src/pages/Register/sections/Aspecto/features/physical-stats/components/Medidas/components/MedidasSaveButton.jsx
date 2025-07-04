const MedidasSaveButton = ({ loading, hasUnsavedChanges }) => {
  return (
    <button
      type='submit'
      className={`cf-medidas-save-btn ${
        hasUnsavedChanges ? 'cf-medidas-save-btn--modified' : ''
      }`}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className='cf-medidas-spinner'></span>
          <span>Guardando...</span>
        </>
      ) : (
        <>
          <span className='cf-medidas-save-icon'></span>
          <span>
            {hasUnsavedChanges ? 'Guardar Cambios' : 'Guardar Medidas'}
          </span>
        </>
      )}
    </button>
  )
}

export default MedidasSaveButton
