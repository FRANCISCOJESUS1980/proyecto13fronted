import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocialMediaState } from '../hooks/useRedesSocialesState'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/loading'
import HeroSection from '../components/HeroSection'
import SocialNetworksSection from '../components/SocialNetworksSection'
import FeaturesSection from '../components/FeaturesSection'
import CTASection from '../components/CTASection'
import './Redessociales.css'

const RedesSociales = () => {
  const navigate = useNavigate()
  const {
    state: { loading, animationComplete, activeTab },
    actions: { setLoading, setAnimationComplete, setActiveTab }
  } = useSocialMediaState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, /*1500*/ 8000)
    return () => clearTimeout(timer)
  }, [setLoading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [setAnimationComplete])

  if (loading) {
    return <Loading isVisible={loading} onComplete={() => setLoading(false)} />
  }

  return (
    <div className='cf-social-container'>
      <Header />

      <div className='cf-social-back-button'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div
        className={`cf-social-content-wrapper ${
          animationComplete ? 'cf-social-content-visible' : ''
        }`}
      >
        <HeroSection />
        <SocialNetworksSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  )
}

export default RedesSociales
