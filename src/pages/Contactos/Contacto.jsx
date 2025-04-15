import { useState, useEffect } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send
} from 'lucide-react'
import Header from '../../components/Header/Header'
import handleSubmitHelper from '../../utils/HandleSubmit'
import './Contacto.css'

const Contacto = () => {
  const [mensajeEnviado, setMensajeEnviado] = useState(false)
  const [faqActivo, setFaqActivo] = useState(null)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [])

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'contacto', { setMensajeEnviado })
  }

  const handleNuevoMensaje = () => {
    setMensajeEnviado(false)
  }

  const toggleFAQ = (index) => {
    setFaqActivo(faqActivo === index ? null : index)
  }

  const preguntasFrecuentes = [
    {
      pregunta: '¿Qué es CrossFit?',
      respuesta:
        'CrossFit es un programa de entrenamiento de alta intensidad que combina ejercicios funcionales de diversas disciplinas.'
    },
    {
      pregunta: '¿Necesito experiencia previa?',
      respuesta:
        'No, nuestros entrenamientos se adaptan a cualquier nivel, desde principiantes hasta avanzados.'
    },
    {
      pregunta: '¿Cuánto dura una clase?',
      respuesta:
        'Cada sesión dura aproximadamente 60 minutos, incluyendo calentamiento, entrenamiento y estiramiento.'
    },
    {
      pregunta: '¿Cuántas veces a la semana debo entrenar?',
      respuesta:
        'Recomendamos entre 3 a 5 sesiones por semana para obtener los mejores resultados.'
    }
  ]

  const testimonios = [
    {
      nombre: 'Carlos Martínez',
      comentario:
        'Gracias a CrossFit, he mejorado mi resistencia y fuerza. ¡Entrenamientos increíbles!',
      imagen:
        'https://www.blogdelfotografo.com/wp-content/uploads/2022/01/retrato-anillo-luz.webp'
    },
    {
      nombre: 'Laura Sánchez',
      comentario:
        'Nunca pensé que podría levantar tanto peso. La comunidad aquí es espectacular.',
      imagen:
        'https://i.pinimg.com/236x/e8/fd/15/e8fd158ff73599778d125120421af8ae.jpg'
    },
    {
      nombre: 'Pedro López',
      comentario:
        'El mejor gimnasio en el que he estado, los entrenadores son geniales.',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s'
    }
  ]

  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`
  }

  return (
    <div
      className={`cf-contacto-container ${fadeIn ? 'cf-contacto-fade-in' : ''}`}
    >
      <Header />
      <div className='cf-contacto-content'>
        <div className='cf-contacto-header'>
          <h1 className='cf-contacto-title'>Contáctanos Hoy</h1>
          <p className='cf-contacto-subtitle'>
            Estamos aquí para responder tus preguntas y ayudarte a comenzar
          </p>
        </div>

        <div className='cf-contacto-secciones'>
          <div className='cf-contacto-info'>
            <div className='cf-contacto-info-card'>
              <h2 className='cf-contacto-info-title'>
                Información de Contacto
              </h2>
              <div className='cf-contacto-info-items'>
                <div className='cf-contacto-info-item'>
                  <div className='cf-contacto-info-icon'>
                    <MapPin size={20} />
                  </div>
                  <div className='cf-contacto-info-text'>
                    <span className='cf-contacto-info-label'>Dirección</span>
                    <span className='cf-contacto-info-value'>
                      Calle Narciso Monturiol 11, San José de la Rinconada,
                      España
                    </span>
                  </div>
                </div>

                <div className='cf-contacto-info-item'>
                  <div className='cf-contacto-info-icon'>
                    <Phone size={20} />
                  </div>
                  <div className='cf-contacto-info-text'>
                    <span className='cf-contacto-info-label'>Teléfono</span>
                    <span className='cf-contacto-info-value'>
                      +34 647 40 69 38
                    </span>
                  </div>
                </div>

                <div className='cf-contacto-info-item'>
                  <div className='cf-contacto-info-icon'>
                    <Mail size={20} />
                  </div>
                  <div className='cf-contacto-info-text'>
                    <span className='cf-contacto-info-label'>Email</span>
                    <span className='cf-contacto-info-value'>
                      contacto@crosfitgym.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='cf-contacto-mapa-container'>
              <iframe
                title='Ubicación Gimnasio'
                src='https://www.google.com/maps/embed?...'
                className='cf-contacto-mapa'
                allowFullScreen
                loading='lazy'
              ></iframe>
            </div>
          </div>

          <div className='cf-contacto-formulario-container'>
            {!mensajeEnviado ? (
              <div className='cf-contacto-formulario'>
                <div className='cf-contacto-formulario-header'>
                  <div className='cf-contacto-formulario-icon'>
                    <MessageSquare size={24} />
                  </div>
                  <h2 className='cf-contacto-formulario-title'>
                    Envíanos un Mensaje
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className='cf-contacto-form'>
                  <div className='cf-contacto-form-group'>
                    <label htmlFor='nombre' className='cf-contacto-form-label'>
                      Nombre
                    </label>
                    <input
                      type='text'
                      id='nombre'
                      placeholder='Tu nombre'
                      required
                      className='cf-contacto-form-input'
                    />
                  </div>

                  <div className='cf-contacto-form-group'>
                    <label htmlFor='email' className='cf-contacto-form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Tu correo electrónico'
                      required
                      className='cf-contacto-form-input'
                    />
                  </div>

                  <div className='cf-contacto-form-group'>
                    <label htmlFor='mensaje' className='cf-contacto-form-label'>
                      Mensaje
                    </label>
                    <textarea
                      id='mensaje'
                      rows='4'
                      placeholder='Escribe tu mensaje'
                      required
                      className='cf-contacto-form-textarea'
                    ></textarea>
                  </div>

                  <button type='submit' className='cf-contacto-form-submit'>
                    <Send size={18} />
                    <span>Enviar mensaje</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className='cf-contacto-mensaje-exito'>
                <div className='cf-contacto-mensaje-exito-icon'></div>
                <h3 className='cf-contacto-mensaje-exito-title'>
                  ¡Gracias por tu mensaje!
                </h3>
                <p className='cf-contacto-mensaje-exito-text'>
                  Te contactaremos pronto.
                </p>
                <button
                  onClick={handleNuevoMensaje}
                  className='cf-contacto-mensaje-exito-btn'
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='cf-contacto-faq-container'>
          <h2 className='cf-contacto-section-title'>Preguntas Frecuentes</h2>
          <div className='cf-contacto-faq-list'>
            {preguntasFrecuentes.map((faq, index) => (
              <div
                key={index}
                className={`cf-contacto-faq-item ${
                  faqActivo === index ? 'cf-contacto-faq-active' : ''
                }`}
                style={{ animationDelay: getAnimationDelay(index) }}
              >
                <button
                  className='cf-contacto-faq-pregunta'
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.pregunta}</span>
                  {faqActivo === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <div className='cf-contacto-faq-respuesta-container'>
                  <p className='cf-contacto-faq-respuesta'>{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='cf-contacto-testimonios-container'>
          <h2 className='cf-contacto-section-title'>
            Testimonios de Nuestros Clientes
          </h2>
          <div className='cf-contacto-testimonios-grid'>
            {testimonios.map((testimonio, index) => (
              <div
                key={index}
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
                  <p className='cf-contacto-testimonio-texto'>
                    "{testimonio.comentario}"
                  </p>
                  <h4 className='cf-contacto-testimonio-nombre'>
                    - {testimonio.nombre}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
