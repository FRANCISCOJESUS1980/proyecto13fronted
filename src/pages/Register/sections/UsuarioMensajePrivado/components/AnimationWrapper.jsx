import React from 'react'

const AnimationWrapper = React.memo(() => {
  return (
    <div className='cf-mensajes-animation-wrapper'>
      <div className='cf-mensajes-bubble-anim'></div>
      <div className='cf-mensajes-chat-anim'></div>
    </div>
  )
})

AnimationWrapper.displayName = 'AnimationWrapper'

export default AnimationWrapper
