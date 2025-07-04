import MedidasSection from './MedidasSection'
import MedidasSaveButton from './MedidasSaveButton'
import { MEDIDAS_SECTIONS } from '../constants/medidasConfig'

const MedidasForm = ({
  formData,
  loading,
  hasUnsavedChanges,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className='cf-medidas-form'>
      <div className='cf-medidas-grid'>
        {MEDIDAS_SECTIONS.map((section) => (
          <MedidasSection
            key={section.id}
            section={section}
            formData={formData}
            onChange={onChange}
          />
        ))}
      </div>
      <div className='cf-medidas-actions'>
        <MedidasSaveButton
          loading={loading}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </form>
  )
}

export default MedidasForm
