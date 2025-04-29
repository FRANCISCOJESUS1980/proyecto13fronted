import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import {
  Facebook,
  Instagram,
  ArrowRight,
  Users,
  Calendar,
  Camera,
  Trophy,
  Dumbbell,
  Clock,
  Heart,
  Award,
  Share2,
  MessageCircle,
  ThumbsUp
} from 'lucide-react'
import './Redessociales.css'

const RedesSociales = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('instagram')

  const socialFeeds = {
    instagram: [
      {
        id: 1,
        image: 'public/imagenes/alterofilia1.JPG',
        caption:
          '¡Nuevo récord personal en Clean & Jerk! 💪 #CrossFit #Superación',
        likes: 124,
        comments: 18,
        date: '2h'
      },
      {
        id: 2,
        image: 'public/imagenes/alterofilia2.JPG',
        caption:
          'WOD de hoy: "Murph" - ¡Todos dieron el máximo! 🔥 #TeamAder #NoExcuses',
        likes: 98,
        comments: 12,
        date: '1d'
      },
      {
        id: 3,
        image: 'public/imagenes/alterofilia3.JPG',
        caption:
          '¡Nuevos equipos en el box! Ven a probarlos 🏋️‍♂️ #AderCrossFit #NuevoEquipo',
        likes: 156,
        comments: 24,
        date: '2d'
      }
    ],
    facebook: [
      {
        id: 1,
        image: 'public/imagenes/box.jpg',
        caption:
          '¡Inscripciones abiertas para la competición de verano! Reserva tu plaza ahora 🏆 #AderCompetition',
        likes: 87,
        comments: 32,
        shares: 15,
        date: '5h'
      },
      {
        id: 2,
        image: 'public/imagenes/boxfrente.jpg',
        caption:
          'Taller de nutrición este sábado con nuestra nutricionista deportiva. ¡No te lo pierdas! 🥗 #FuelYourWorkout',
        likes: 65,
        comments: 8,
        shares: 11,
        date: '1d'
      }
    ]
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='cf-social-loading'>
        <div className='cf-social-barbell-loader'>
          <div className='cf-social-barbell-left'></div>
          <div className='cf-social-barbell-bar'></div>
          <div className='cf-social-barbell-right'></div>
        </div>
        <p>Cargando redes sociales...</p>
      </div>
    )
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
        <div className='cf-social-hero'>
          <div className='cf-social-hero-content'>
            <h1 className='cf-social-heading'>
              <span className='cf-social-heading-highlight'>ADER</span>CROSSFIT
              <span className='cf-social-heading-dot'></span>
            </h1>
            <h2 className='cf-social-subheading'>Comunidad en Movimiento</h2>
            <p className='cf-social-description'>
              Conéctate con nuestra comunidad, comparte tus logros y mantente al
              día con los últimos eventos y WODs.
            </p>

            <div className='cf-social-stats'>
              <div className='cf-social-stat'>
                <div className='cf-social-stat-icon'>
                  <Users />
                </div>
                <div className='cf-social-stat-content'>
                  <span className='cf-social-stat-value'>2.5K+</span>
                  <span className='cf-social-stat-label'>Seguidores</span>
                </div>
              </div>

              <div className='cf-social-stat'>
                <div className='cf-social-stat-icon'>
                  <Calendar />
                </div>
                <div className='cf-social-stat-content'>
                  <span className='cf-social-stat-value'>15+</span>
                  <span className='cf-social-stat-label'>Eventos/mes</span>
                </div>
              </div>

              <div className='cf-social-stat'>
                <div className='cf-social-stat-icon'>
                  <Camera />
                </div>
                <div className='cf-social-stat-content'>
                  <span className='cf-social-stat-value'>500+</span>
                  <span className='cf-social-stat-label'>Fotos</span>
                </div>
              </div>
            </div>
          </div>

          <div className='cf-social-hero-image'>
            <div className='cf-social-pulse-ring'></div>
            <img
              src='public/imagenes/logoalex.jpg'
              alt='AderCrossfit Logo'
              className='cf-social-logo-image'
            />
          </div>
        </div>

        <div className='cf-social-networks-section'>
          <h2 className='cf-social-section-title'>
            <span className='cf-social-section-icon'>
              <Share2 />
            </span>
            Nuestras Redes Sociales
          </h2>

          <div className='cf-social-tabs'>
            <button
              className={`cf-social-tab ${
                activeTab === 'instagram' ? 'cf-social-tab-active' : ''
              }`}
              onClick={() => setActiveTab('instagram')}
            >
              <Instagram className='cf-social-tab-icon' />
              <span>Instagram</span>
            </button>
            <button
              className={`cf-social-tab ${
                activeTab === 'facebook' ? 'cf-social-tab-active' : ''
              }`}
              onClick={() => setActiveTab('facebook')}
            >
              <Facebook className='cf-social-tab-icon' />
              <span>Facebook</span>
            </button>
          </div>

          <div className='cf-social-tab-content'>
            {activeTab === 'instagram' && (
              <div className='cf-social-instagram-feed'>
                <div className='cf-social-feed-header'>
                  <div className='cf-social-feed-profile'>
                    <div className='cf-social-profile-image'>
                      <img
                        src='src/assets/imagenes/logo.png'
                        alt='AderCrossfit Profile'
                      />
                    </div>
                    <div className='cf-social-profile-info'>
                      <h3>adercrossfit</h3>
                      <p>Box de CrossFit Oficial</p>
                    </div>
                  </div>
                  <a
                    href='https://www.instagram.com/adercrossfit/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='cf-social-follow-button'
                  >
                    <span>Seguir</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className='cf-social-feed-grid'>
                  {socialFeeds.instagram.map((post) => (
                    <div key={post.id} className='cf-social-post'>
                      <div className='cf-social-post-image'>
                        <img
                          src={post.image || 'public/imagenes/grupocrosfit.JPG'}
                          alt={`Post ${post.id}`}
                        />
                      </div>
                      <div className='cf-social-post-content'>
                        <p className='cf-social-post-caption'>{post.caption}</p>
                        <div className='cf-social-post-stats'>
                          <div className='cf-social-post-stat'>
                            <ThumbsUp size={16} />
                            <span>{post.likes}</span>
                          </div>
                          <div className='cf-social-post-stat'>
                            <MessageCircle size={16} />
                            <span>{post.comments}</span>
                          </div>
                          <div className='cf-social-post-time'>
                            <Clock size={16} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='cf-social-feed-footer'>
                  <a
                    href='https://www.instagram.com/adercrossfit/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='cf-social-view-more'
                  >
                    <span>Ver más en Instagram</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'facebook' && (
              <div className='cf-social-facebook-feed'>
                <div className='cf-social-feed-header'>
                  <div className='cf-social-feed-profile'>
                    <div className='cf-social-profile-image'>
                      <img
                        src='src/assets/imagenes/logo.png'
                        alt='AderCrossfit Profile'
                      />
                    </div>
                    <div className='cf-social-profile-info'>
                      <h3>AderCrossfit Oficial</h3>
                      <p>Gimnasio/Centro de fitness</p>
                    </div>
                  </div>
                  <a
                    href='https://www.facebook.com/alex.adercrossfit/?locale=es_ES'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='cf-social-follow-button cf-social-facebook-button'
                  >
                    <span>Me gusta</span>
                    <ThumbsUp size={16} />
                  </a>
                </div>

                <div className='cf-social-feed-grid'>
                  {socialFeeds.facebook.map((post) => (
                    <div
                      key={post.id}
                      className='cf-social-post cf-social-facebook-post'
                    >
                      <div className='cf-social-post-image'>
                        <img
                          src={post.image || 'public/imagenes/grupocrosfit.JPG'}
                          alt={`Post ${post.id}`}
                        />
                      </div>
                      <div className='cf-social-post-content'>
                        <p className='cf-social-post-caption'>{post.caption}</p>
                        <div className='cf-social-post-stats'>
                          <div className='cf-social-post-stat'>
                            <ThumbsUp size={16} />
                            <span>{post.likes}</span>
                          </div>
                          <div className='cf-social-post-stat'>
                            <MessageCircle size={16} />
                            <span>{post.comments}</span>
                          </div>
                          <div className='cf-social-post-stat'>
                            <Share2 size={16} />
                            <span>{post.shares}</span>
                          </div>
                          <div className='cf-social-post-time'>
                            <Clock size={16} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='cf-social-feed-footer'>
                  <a
                    href='https://www.facebook.com/alex.adercrossfit/?locale=es_ES'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='cf-social-view-more cf-social-facebook-more'
                  >
                    <span>Ver más en Facebook</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='cf-social-features-section'>
          <h2 className='cf-social-section-title'>
            <span className='cf-social-section-icon'>
              <Award />
            </span>
            ¿Por qué seguirnos?
          </h2>

          <div className='cf-social-features-grid'>
            <div className='cf-social-feature-card'>
              <div className='cf-social-feature-icon'>
                <Dumbbell />
              </div>
              <h3>WODs Diarios</h3>
              <p>
                Hacemos los WODS personalmente a Diario para que siempre esteis
                avanzando y mejorando vuestro rendimento.
              </p>
            </div>

            <div className='cf-social-feature-card'>
              <div className='cf-social-feature-icon'>
                <Calendar />
              </div>
              <h3>Eventos Exclusivos</h3>
              <p>
                Sé el primero en enterarte de competiciones, talleres y eventos
                especiales.
              </p>
            </div>

            <div className='cf-social-feature-card'>
              <div className='cf-social-feature-icon'>
                <Trophy />
              </div>
              <h3>Logros de Atletas</h3>
              <p>
                Celebramos los PRs y logros de nuestra comunidad. ¡El próximo
                podrías ser tú!
              </p>
            </div>

            <div className='cf-social-feature-card'>
              <div className='cf-social-feature-icon'>
                <Heart />
              </div>
              <h3>Comunidad Unida</h3>
              <p>
                Forma parte de una familia que comparte la pasión por el fitness
                y el CrossFit.
              </p>
            </div>
          </div>
        </div>

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
            <img
              src='public/imagenes/grupocrosfit.JPG'
              alt='Comunidad AderCrossfit'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedesSociales
