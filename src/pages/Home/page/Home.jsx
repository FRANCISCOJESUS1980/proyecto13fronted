import Header from '../../../components/Header/page/Header'
import HeroSection from '../components/HeroSection'
import AnimationsSection from '../components/AnimationsSection'
import './Home.css'

const Home = () => {
  return (
    <div className='cf-home'>
      <Header />
      <HeroSection />
      <AnimationsSection />
    </div>
  )
}

export default Home
