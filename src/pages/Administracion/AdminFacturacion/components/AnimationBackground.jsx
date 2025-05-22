import React from 'react'

export const AnimationBackground = React.memo(() => {
  return (
    <div className='cf-animation-wrapper'>
      <div className='cf-dumbbell-anim'></div>
      <div className='cf-kettlebell-anim'></div>
      <div className='cf-barbell-anim'></div>
    </div>
  )
})
