import crossfitVideo from '../../../assets/videos/videocrossfit.mp4'
import MotivationText from './MotivationText'
import HeroOverlay from './HeroOverlay'

const HeroSection = () => {
  return (
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
      <MotivationText />
      <HeroOverlay />
    </main>
  )
}

export default HeroSection
