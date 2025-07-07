import { motion } from 'framer-motion'
import { memo } from 'react'

const barbellAnimation = {
  y: [0, -20, 0]
}

const barbellTransition = {
  duration: 2,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut'
}

const BarbellAnimation = memo(() => {
  return (
    <div className='cf-animation-container'>
      <motion.div
        className='cf-barbell'
        animate={barbellAnimation}
        transition={barbellTransition}
      >
        <div className='cf-bar'></div>
        <div className='cf-plate cf-left'></div>
        <div className='cf-plate cf-right'></div>
      </motion.div>
    </div>
  )
})

BarbellAnimation.displayName = 'BarbellAnimation'

export default BarbellAnimation
