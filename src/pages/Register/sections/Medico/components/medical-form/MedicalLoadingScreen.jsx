import { memo } from 'react'

const MedicalLoadingScreen = memo(() => {
  return (
    <div className='cf-medico-loading'>
      <div className='cf-medico-spinner'></div>
      Cargando información médica...
    </div>
  )
})

MedicalLoadingScreen.displayName = 'MedicalLoadingScreen'

export default MedicalLoadingScreen
