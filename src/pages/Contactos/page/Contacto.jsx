import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContactState } from '../hooks/useContactState'
import Header from '../../../components/Header/page/Header'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/loading'
import ContactHeader from '../components/ContactHeader'
import ContactInfo from '../components/Contactinfo'
import ContactForm from '../components/ContactForm'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'
import './Contacto.css'

const Contacto = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const {
    state: { mensajeEnviado, faqActivo, fadeIn },
    actions: { handleSubmit, handleNuevoMensaje, toggleFAQ, setFadeIn }
  } = useContactState()

  useEffect(() => {
    const loadContactData = async () => {
      try {
        //await new Promise((resolve) => setTimeout(resolve, 0))

        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      } catch (error) {
        console.error('Error al cargar datos de contacto:', error)
        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      }
    }

    loadContactData()
  }, [setFadeIn])

  const handleBackNavigation = () => {
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO PÁGINA DE CONTACTO...'
        onComplete={() => setLoading(false)}
      />
    )
  }

  return (
    <div
      className={`cf-contacto-container ${fadeIn ? 'cf-contacto-fade-in' : ''}`}
    >
      <Header />

      <div className='cf-contacto-back-button'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div className='cf-contacto-content'>
        <ContactHeader />

        <div className='cf-contacto-secciones'>
          <ContactInfo />
          <ContactForm
            mensajeEnviado={mensajeEnviado}
            onSubmit={handleSubmit}
            onNuevoMensaje={handleNuevoMensaje}
          />
        </div>

        <FAQSection faqActivo={faqActivo} onToggleFAQ={toggleFAQ} />

        <TestimonialsSection />
      </div>
    </div>
  )
}

export default Contacto
