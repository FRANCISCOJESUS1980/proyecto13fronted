import { memo } from 'react'

const MedicalHeader = memo(() => {
  return (
    <>
      <div className='cf-medico-logo-wrapper'>
        <div className='cf-medico-health-logo'></div>
      </div>
      <h1 className='cf-medico-heading'>Información Médica</h1>
    </>
  )
})

MedicalHeader.displayName = 'MedicalHeader'

export default MedicalHeader
