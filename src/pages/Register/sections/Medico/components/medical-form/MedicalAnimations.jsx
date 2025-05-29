import { memo } from 'react'

const MedicalAnimations = memo(() => {
  return (
    <div className='cf-medico-animation-wrapper'>
      <div className='cf-medico-heartbeat-anim'></div>
      <div className='cf-medico-pulse-anim'></div>
    </div>
  )
})

MedicalAnimations.displayName = 'MedicalAnimations'

export default MedicalAnimations
