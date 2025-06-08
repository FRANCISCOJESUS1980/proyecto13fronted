import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/loading'
import './Tarifas.css'

const Tarifas = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('mensual')
  const [fadeIn, setFadeIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTarifasData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 0))

        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      } catch (error) {
        console.error('Error al cargar datos de tarifas:', error)
        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      }
    }

    loadTarifasData()
  }, [])

  const handleBackNavigation = () => {
    navigate('/dashboard')
  }

  const planes = [
    {
      nombre: '8 Sesiones',
      sesiones: 8,
      precio: 40,
      caracteristicas: [
        '8 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero durante la sesión'
      ],
      popular: false
    },
    {
      nombre: '10 Sesiones',
      sesiones: 10,
      precio: 45,
      caracteristicas: [
        '10 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero durante la sesión'
      ],
      popular: false
    },
    {
      nombre: '12 Sesiones',
      sesiones: 12,
      precio: 50,
      caracteristicas: [
        '12 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero personal',
        '1 sesión PT al mes'
      ],
      popular: true
    },
    {
      nombre: '16 Sesiones',
      sesiones: 16,
      precio: 55,
      caracteristicas: [
        '16 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero personal',
        '1 sesión PT al mes'
      ],
      popular: false
    },
    {
      nombre: '20 Sesiones',
      sesiones: 20,
      precio: 60,
      caracteristicas: [
        '20 sesiones mensuales',
        'Evaluación física mensual',
        'Acceso a la app premium',
        'Casillero personal',
        '2 sesiones PT al mes'
      ],
      popular: false
    },
    {
      nombre: 'Ilimitado',
      sesiones: 'Ilimitadas',
      descripcion: '(2 sesiones diarias)',
      precio: 65,
      caracteristicas: [
        'Hasta 2 sesiones diarias',
        'Evaluación física mensual',
        'Acceso a la app premium',
        'Casillero personal premium',
        '2 sesiones PT al mes',
        'Programación personalizada'
      ],
      popular: false
    }
  ]

  const bonosEspeciales = [
    {
      nombre: 'Curso de iniciación + 2 meses',
      descripcion: '2 meses a 8 sesiones',
      precio: 80,
      caracteristicas: [
        'Curso de iniciación completo',
        '2 meses con 8 sesiones mensuales',
        'Evaluación física inicial y final',
        'Acceso a la app de seguimiento'
      ]
    },
    {
      nombre: 'Bono 5 sesiones',
      descripcion: '(2 meses caducidad)',
      precio: 40,
      caracteristicas: [
        '5 sesiones para usar en 2 meses',
        'Ideal para visitantes ocasionales',
        'Acceso a todas las clases',
        'Sin compromiso mensual'
      ]
    }
  ]

  const dropIns = [
    {
      nombre: 'Drop in socios',
      descripcion: 'open box/clase',
      precio: 6
    },
    {
      nombre: 'Drop in no socios',
      descripcion: 'open box',
      precio: 6
    },
    {
      nombre: 'Drop in no socios',
      descripcion: 'clases',
      precio: 10
    }
  ]

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO TARIFAS...'
        onComplete={() => setLoading(false)}
      />
    )
  }

  return (
    <div className={`precios-container ${fadeIn ? 'fade-in' : ''}`}>
      <Header />

      <div className='precios-back-button'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <main className='precios-main'>
        <section className='precios-hero'>
          <h1>Tarifas 2025</h1>
          <p>Elige el bono que mejor se adapte a tu rutina de entrenamiento</p>

          <div className='planes-tipo'>
            <button
              className={`plan-btn ${
                selectedPlan === 'mensual' ? 'active' : ''
              }`}
              onClick={() => setSelectedPlan('mensual')}
            >
              Bonos Mensuales
            </button>
            <button
              className={`plan-btn ${
                selectedPlan === 'especial' ? 'active' : ''
              }`}
              onClick={() => setSelectedPlan('especial')}
            >
              Bonos Especiales
            </button>
          </div>
        </section>

        {selectedPlan === 'mensual' && (
          <section className='planes-container'>
            {planes.map((plan, index) => (
              <div
                key={index}
                className={`plan-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className='popular-badge'>Más Popular</div>
                )}
                <h2>{plan.nombre}</h2>
                {plan.descripcion && (
                  <div className='plan-descripcion'>{plan.descripcion}</div>
                )}
                <div className='sesiones-info'>
                  <span className='sesiones-num'>{plan.sesiones}</span>
                  <span className='sesiones-text'>
                    {typeof plan.sesiones === 'number' ? 'sesiones' : ''}
                  </span>
                </div>
                <div className='precio'>
                  <span className='moneda'>€</span>
                  <span className='cantidad'>{plan.precio}</span>
                  <span className='periodo'>/mes</span>
                </div>
                <button
                  className={`btn-suscribir ${plan.popular ? 'popular' : ''}`}
                >
                  Comenzar Ahora
                </button>
                <div className='caracteristicas'>
                  <h3>Incluye:</h3>
                  {plan.caracteristicas.map((caracteristica, i) => (
                    <div key={i} className='caracteristica incluido'>
                      <span className='check-icon'>✓</span>
                      <span>{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {selectedPlan === 'especial' && (
          <>
            <section className='planes-container'>
              {bonosEspeciales.map((plan, index) => (
                <div key={index} className='plan-card'>
                  <h2>{plan.nombre}</h2>
                  {plan.descripcion && (
                    <div className='plan-descripcion'>{plan.descripcion}</div>
                  )}
                  <div className='precio'>
                    <span className='moneda'>€</span>
                    <span className='cantidad'>{plan.precio}</span>
                  </div>
                  <button className='btn-suscribir'>Comenzar Ahora</button>
                  <div className='caracteristicas'>
                    <h3>Incluye:</h3>
                    {plan.caracteristicas.map((caracteristica, i) => (
                      <div key={i} className='caracteristica incluido'>
                        <span className='check-icon'>✓</span>
                        <span>{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className='drop-ins-container'>
              <h2>Drop-ins</h2>
              <div className='drop-ins-grid'>
                {dropIns.map((dropIn, index) => (
                  <div key={index} className='drop-in-card'>
                    <h3>{dropIn.nombre}</h3>
                    <p className='drop-in-descripcion'>{dropIn.descripcion}</p>
                    <div className='drop-in-precio'>
                      <span className='moneda'>€</span>
                      <span className='cantidad'>{dropIn.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <section className='beneficios'>
          <h2>¿Por qué elegir nuestro Box?</h2>
          <div className='beneficios-grid'>
            <div className='beneficio'>
              <h3>Entrenadores Certificados</h3>
              <p>
                Todos nuestros coaches tienen certificaciones oficiales de
                CrossFit
              </p>
            </div>
            <div className='beneficio'>
              <h3>Comunidad Increíble</h3>
              <p>
                Únete a una comunidad que te apoyará en cada paso del camino
              </p>
            </div>
            <div className='beneficio'>
              <h3>Instalaciones Premium</h3>
              <p>
                Equipamiento de primera calidad y espacios amplios y ventilados
              </p>
            </div>
            <div className='beneficio'>
              <h3>Resultados Garantizados</h3>
              <p>Sistema probado de entrenamiento y seguimiento de progreso</p>
            </div>
          </div>
        </section>

        <section className='faq'>
          <h2>Preguntas Frecuentes</h2>
          <div className='faq-grid'>
            <div className='faq-item'>
              <h3>¿Cómo funcionan los bonos de sesiones?</h3>
              <p>
                Cada bono te da acceso a un número determinado de sesiones
                mensuales que puedes utilizar cuando mejor te convenga.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Puedo acumular sesiones no utilizadas?</h3>
              <p>
                Las sesiones no utilizadas no se acumulan para el siguiente mes,
                excepto en casos especiales.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Hay permanencia mínima?</h3>
              <p>
                No hay permanencia mínima en los bonos mensuales. Los bonos
                especiales tienen sus propias condiciones.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Qué pasa si quiero más sesiones?</h3>
              <p>
                Puedes adquirir sesiones adicionales como drop-in o cambiar a un
                bono superior en cualquier momento.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Tarifas
