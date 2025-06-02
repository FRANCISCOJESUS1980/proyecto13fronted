import { memo } from 'react'

export const LoginAnimations = memo(() => {
  return (
    <div className='animation-wrapper'>
      <div className='dumbbell-anim'></div>
      <div className='kettlebell-anim'></div>
      <div className='barbell-anim'></div>
    </div>
  )
})

LoginAnimations.displayName = 'LoginAnimations'
