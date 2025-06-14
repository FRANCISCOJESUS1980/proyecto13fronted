import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/page/Header'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/loading'
import './Videos.css'

const Videos = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [videosReady, setVideosReady] = useState(false)
  const [videos] = useState([
    {
      id: 1,
      title: 'Técnica de Clean & Jerk',
      description:
        'Aprende la técnica correcta para realizar el Clean & Jerk, uno de los movimientos olímpicos fundamentales.',
      url: 'https://www.youtube.com/embed/9HyWjAk7fhY'
    },
    {
      id: 2,
      title: 'Técnica de Snatch',
      description:
        'Guía completa para realizar el Snatch correctamente, mejorando tu potencia y coordinación.',
      url: 'https://www.youtube.com/embed/9xQp2sldyts'
    },
    {
      id: 3,
      title: 'Técnica de Pull-ups',
      description:
        'Cómo realizar pull-ups con la técnica adecuada para maximizar el desarrollo de la espalda y brazos.',
      url: 'https://www.youtube.com/embed/eGo4IYlbE5g'
    },
    {
      id: 4,
      title: 'Técnica de Muscle-ups',
      description:
        'Domina el muscle-up, uno de los movimientos más desafiantes de la gimnasia en CrossFit.',
      url: 'https://www.youtube.com/embed/astSQRh1-i0'
    },
    {
      id: 5,
      title: 'Técnica de Handstand Push-ups',
      description:
        'Aprende a realizar handstand push-ups de forma segura y efectiva para desarrollar hombros fuertes.',
      url: 'https://www.youtube.com/embed/0wDEO6shVjc'
    },
    {
      id: 6,
      title: 'Técnica de Double Unders',
      description:
        'Mejora tu coordinación y resistencia con la técnica correcta de double unders con la cuerda.',
      url: 'https://www.youtube.com/embed/82jNjDS19lg'
    },
    {
      id: 7,
      title: 'Técnica de Toes to Bar',
      description:
        'Aprende a ejecutar toes to bar correctamente para fortalecer tu core y mejorar tu control corporal.',
      url: 'https://www.youtube.com/embed/6dHvTlsMvNY'
    },
    {
      id: 8,
      title: 'Técnica de Thruster',
      description:
        'Domina el thruster, un movimiento compuesto que combina front squat y press de hombros.',
      url: 'https://www.youtube.com/embed/L219ltL15zk'
    },
    {
      id: 9,
      title: 'Técnica de Box Jump',
      description:
        'Aprende a realizar box jumps de forma segura y efectiva para mejorar tu potencia de piernas.',
      url: 'https://www.youtube.com/embed/52r_Ul5k03g'
    },
    {
      id: 10,
      title: 'Técnica de Wall Ball',
      description:
        'Mejora tu técnica de wall ball, un ejercicio completo que trabaja todo el cuerpo.',
      url: 'https://www.youtube.com/embed/fpUD0mcFp_0'
    }
  ])

  const videoRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideosReady(true)
      setIsLoading(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cf-video-card-visible')
        }
      })
    }, options)

    if (!isLoading) {
      videoRefs.current.forEach((el) => {
        if (el) observer.observe(el)
      })
    }

    return () => {
      videoRefs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [isLoading])

  const handleBackNavigation = () => {
    navigate('/dashboard')
  }

  if (isLoading) {
    return (
      <Loading
        isVisible={isLoading}
        loadingText='CARGANDO VIDEOS...'
        onComplete={() => setIsLoading(false)}
      />
    )
  }

  return (
    <div className='cf-videos-container'>
      <Header />

      <div className='cf-videos-header'>
        <Button
          variant='secondary'
          onClick={handleBackNavigation}
          leftIcon={<span>←</span>}
          className='cf-videos-backbutton'
        >
          Volver al Dashboard
        </Button>
        <h1 className='cf-videos-title'>Videos de Movimientos de CrossFit</h1>
      </div>

      <main className='cf-videos-main'>
        <p className='cf-videos-description'>
          Aprende la técnica correcta de los principales movimientos de CrossFit
          con nuestros videos explicativos. Dominar estos movimientos te ayudará
          a mejorar tu rendimiento y prevenir lesiones.
        </p>

        <div className='cf-videos-grid'>
          {videos.map((video, index) => (
            <div
              key={video.id}
              className='cf-video-card'
              ref={(el) => (videoRefs.current[index] = el)}
            >
              <div className='cf-video-frame'>
                <iframe
                  width='100%'
                  height='100%'
                  src={`${video.url}?rel=0`}
                  title={video.title}
                  frameBorder='0'
                  loading='lazy'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
              <div className='cf-video-info'>
                <h3 className='cf-video-title'>{video.title}</h3>
                <p className='cf-video-description'>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Videos
