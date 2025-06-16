import React from 'react'
import { faqData } from '../data/planesData'

const FAQSection = React.memo(() => {
  return (
    <section className='faq'>
      <h2>Preguntas Frecuentes</h2>
      <div className='faq-grid'>
        {faqData.map((faq, index) => (
          <div key={index} className='faq-item'>
            <h3>{faq.pregunta}</h3>
            <p>{faq.respuesta}</p>
          </div>
        ))}
      </div>
    </section>
  )
})

FAQSection.displayName = 'FAQSection'

export default FAQSection
