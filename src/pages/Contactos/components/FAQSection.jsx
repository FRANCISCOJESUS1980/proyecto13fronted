import { ChevronDown, ChevronUp } from 'lucide-react'
import { memo } from 'react'
import { faqData } from '../data/faqData'
import { getAnimationDelay } from '../utils/animations'

const FAQSection = memo(({ faqActivo, onToggleFAQ }) => {
  return (
    <div className='cf-contacto-faq-container'>
      <h2 className='cf-contacto-section-title'>Preguntas Frecuentes</h2>
      <div className='cf-contacto-faq-list'>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isActive={faqActivo === index}
            onToggle={() => onToggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  )
})

const FAQItem = ({ faq, index, isActive, onToggle }) => (
  <div
    className={`cf-contacto-faq-item ${
      isActive ? 'cf-contacto-faq-active' : ''
    }`}
    style={{ animationDelay: getAnimationDelay(index) }}
  >
    <button className='cf-contacto-faq-pregunta' onClick={onToggle}>
      <span>{faq.pregunta}</span>
      {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    <div className='cf-contacto-faq-respuesta-container'>
      <p className='cf-contacto-faq-respuesta'>{faq.respuesta}</p>
    </div>
  </div>
)

FAQSection.displayName = 'FAQSection'

export default FAQSection
