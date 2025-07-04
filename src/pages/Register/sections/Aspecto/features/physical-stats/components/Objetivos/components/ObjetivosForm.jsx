import ObjetivosFormFields from './ObjetivosFormFields'
import ObjetivosSaveButton from './ObjetivosSaveButton'

const ObjetivosForm = ({
  formData,
  loading,
  hasUnsavedChanges,
  onChange,
  onSubmit
}) => {
  return (
    <div className='cf-objetivos-form-card'>
      <div className='cf-objetivos-form-header'>
        <span className='cf-objetivos-form-icon'></span>
        <h3 className='cf-objetivos-form-title'>Crear Nuevo Objetivo</h3>
      </div>
      <form onSubmit={onSubmit} className='cf-objetivos-form'>
        <ObjetivosFormFields formData={formData} onChange={onChange} />
        <div className='cf-objetivos-form-actions'>
          <ObjetivosSaveButton
            loading={loading}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </div>
      </form>
    </div>
  )
}

export default ObjetivosForm
