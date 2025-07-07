import { motion } from 'framer-motion'
import { memo } from 'react'

const kettlebellAnimation = {
  rotate: [-45, 45, -45],
  y: [0, -50, 0]
}

const kettlebellTransition = {
  duration: 1.5,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut'
}

const KettlebellAnimation = memo(() => {
  return (
    <div className='cf-animation-container'>
      <motion.div
        className='cf-kettlebell'
        animate={kettlebellAnimation}
        transition={kettlebellTransition}
      >
        <div className='cf-handle'></div>
        <div className='cf-body'></div>
      </motion.div>
    </div>
  )
})

KettlebellAnimation.displayName = 'KettlebellAnimation'

export default KettlebellAnimation
