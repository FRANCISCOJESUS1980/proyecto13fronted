import { motion } from 'framer-motion'
import { memo } from 'react'

const overlayAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

const HeroOverlay = memo(() => {
  return (
    <motion.div {...overlayAnimation} className='cf-overlay'>
      <h1>CROSSFIT: ROMPE TUS BARRERAS</h1>
      <p>Descubre la mejor comunidad de entrenamiento.</p>
    </motion.div>
  )
})

HeroOverlay.displayName = 'HeroOverlay'

export default HeroOverlay
