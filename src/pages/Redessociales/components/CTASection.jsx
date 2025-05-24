import { Instagram, Facebook, ArrowRight } from 'lucide-react'
import { memo } from 'react'

const CTASection = memo(() => {
  return (
    <div className='cf-social-cta-section'>
      <div className='cf-social-cta-content'>
        <h2>Únete a nuestra comunidad digital</h2>
        <p>
          Sigue nuestras redes sociales y mantente conectado con todo lo que
          sucede en AderCrossfit
        </p>

        <div className='cf-social-cta-buttons'>
          <a
            href='https://www.instagram.com/adercrossfit/'
            target='_blank'
            rel='noopener noreferrer'
            className='cf-social-cta-button cf-social-instagram-cta'
          >
            <Instagram size={20} />
            <span>Seguir en Instagram</span>
            <ArrowRight size={16} />
          </a>

          <a
            href='https://www.facebook.com/alex.adercrossfit/?locale=es_ES'
            target='_blank'
            rel='noopener noreferrer'
            className='cf-social-cta-button cf-social-facebook-cta'
          >
            <Facebook size={20} />
            <span>Seguir en Facebook</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className='cf-social-cta-image'>
        <img src='imagenes/grupocrosfit.JPG' alt='Comunidad AderCrossfit' />
      </div>
    </div>
  )
})

CTASection.displayName = 'CTASection'

export default CTASection
