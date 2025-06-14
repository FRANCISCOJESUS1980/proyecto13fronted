import Header from '../../components/Header/page/Header'
import './Home.css'
import { motion } from 'framer-motion'
import crossfitVideo from '../../assets/videos/videocrossfit.mp4'

const Home = () => {
  return (
    <div className='cf-home'>
      <Header />
      <main className='cf-main-content'>
        <div className='cf-video-container'>
          <video
            className='cf-background-video'
            src={crossfitVideo}
            autoPlay
            loop
            muted
          />
        </div>
        <motion.div
          className='cf-motivation-text'
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              '0 0 10px #ff0000',
              '0 0 20px #ff0000',
              '0 0 10px #ff0000'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut'
          }}
        >
          <h2>SUPERA TUS LÍMITES</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='cf-overlay'
        >
          <h1>CROSSFIT: ROMPE TUS BARRERAS</h1>
          <p>Descubre la mejor comunidad de entrenamiento.</p>
        </motion.div>
      </main>

      <section className='cf-crossfit-animations'>
        <div className='cf-animation-container'>
          <motion.div
            className='cf-barbell'
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut'
            }}
          >
            <div className='cf-bar'></div>
            <div className='cf-plate cf-left'></div>
            <div className='cf-plate cf-right'></div>
          </motion.div>
        </div>

        <div className='cf-animation-container'>
          <motion.div
            className='cf-kettlebell'
            animate={{ rotate: [-45, 45, -45], y: [0, -50, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut'
            }}
          >
            <div className='cf-handle'></div>
            <div className='cf-body'></div>
          </motion.div>
        </div>

        <div className='cf-animation-container'>
          <motion.div
            className='cf-athlete'
            animate={{ y: [0, -30, 0], scaleY: [1, 0.9, 1] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut'
            }}
          >
            <div className='cf-head'></div>
            <div className='cf-body'></div>
            <div className='cf-legs'></div>
          </motion.div>
        </div>

        <div className='cf-icon-container'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
          >
            <div className='cf-animated-box'></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
