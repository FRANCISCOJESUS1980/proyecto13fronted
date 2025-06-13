import React from 'react'

const AnimationWrapper = React.memo(() => {
  return (
    <div className='cf-animation-wrapper'>
      <div className='cf-dumbbell-anim'></div>
      <div className='cf-kettlebell-anim'></div>
      <div className='cf-barbell-anim'></div>
    </div>
  )
})

AnimationWrapper.displayName = 'AnimationWrapper'

export default AnimationWrapper
