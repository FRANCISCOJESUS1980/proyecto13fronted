import { memo } from 'react'
import { testimonialsData } from '../data/testimonialsData'
import { getAnimationDelay } from '../utils/animations'

const TestimonialsSection = memo(() => {
  return (
    <div className='cf-contacto-testimonios-container'>
      <h2 className='cf-contacto-section-title'>
        Testimonios de Nuestros Clientes
      </h2>
      <div className='cf-contacto-testimonios-grid'>
        {testimonialsData.map((testimonio, index) => (
          <TestimonialCard key={index} testimonio={testimonio} index={index} />
        ))}
      </div>
    </div>
  )
})

const TestimonialCard = ({ testimonio, index }) => (
  <div
    className='cf-contacto-testimonio-card'
    style={{ animationDelay: getAnimationDelay(index) }}
  >
    <div className='cf-contacto-testimonio-imagen-container'>
      <img
        src={testimonio.imagen || '/placeholder.svg'}
        alt={testimonio.nombre}
        className='cf-contacto-testimonio-imagen'
        onError={(e) => {
          e.target.onerror = null
          e.target.src = '/placeholder.svg'
        }}
      />
    </div>
    <div className='cf-contacto-testimonio-content'>
      <p className='cf-contacto-testimonio-texto'>"{testimonio.comentario}"</p>
      <h4 className='cf-contacto-testimonio-nombre'>- {testimonio.nombre}</h4>
    </div>
  </div>
)

TestimonialsSection.displayName = 'TestimonialsSection'

export default TestimonialsSection
