import { motion } from 'framer-motion'
import { memo } from 'react'

const athleteAnimation = {
  y: [0, -30, 0],
  scaleY: [1, 0.9, 1]
}

const athleteTransition = {
  duration: 1,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut'
}

const AthleteAnimation = memo(() => {
  return (
    <div className='cf-animation-container'>
      <motion.div
        className='cf-athlete'
        animate={athleteAnimation}
        transition={athleteTransition}
      >
        <div className='cf-head'></div>
        <div className='cf-body'></div>
        <div className='cf-legs'></div>
      </motion.div>
    </div>
  )
})

AthleteAnimation.displayName = 'AthleteAnimation'

export default AthleteAnimation
