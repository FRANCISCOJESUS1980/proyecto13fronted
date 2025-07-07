import { motion } from 'framer-motion'
import { memo } from 'react'

const motivationAnimation = {
  scale: [1, 1.1, 1],
  textShadow: ['0 0 10px #ff0000', '0 0 20px #ff0000', '0 0 10px #ff0000']
}

const motivationTransition = {
  duration: 2,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'easeInOut'
}

const MotivationText = memo(() => {
  return (
    <motion.div
      className='cf-motivation-text'
      animate={motivationAnimation}
      transition={motivationTransition}
    >
      <h2>SUPERA TUS LÍMITES</h2>
    </motion.div>
  )
})

MotivationText.displayName = 'MotivationText'

export default MotivationText
