import { useEffect } from 'react'
import { useContactState } from '../hooks/useContactState'
import Header from '../../../components/Header/Header'
import ContactHeader from '../components/ContactHeader'
import ContactInfo from '../components/Contactinfo'
import ContactForm from '../components/ContactForm'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'
import './Contacto.css'

const Contacto = () => {
  const {
    state: { mensajeEnviado, faqActivo, fadeIn },
    actions: { handleSubmit, handleNuevoMensaje, toggleFAQ, setFadeIn }
  } = useContactState()

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [setFadeIn])

  return (
    <div
      className={`cf-contacto-container ${fadeIn ? 'cf-contacto-fade-in' : ''}`}
    >
      <Header />
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
