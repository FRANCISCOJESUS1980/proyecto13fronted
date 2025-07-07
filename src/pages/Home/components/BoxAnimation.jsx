import { motion } from 'framer-motion'
import { memo } from 'react'

const boxAnimation = {
  rotate: 360
}

const boxTransition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'linear'
}

const BoxAnimation = memo(() => {
  return (
    <div className='cf-icon-container'>
      <motion.div animate={boxAnimation} transition={boxTransition}>
        <div className='cf-animated-box'></div>
      </motion.div>
    </div>
  )
})

BoxAnimation.displayName = 'BoxAnimation'

export default BoxAnimation
