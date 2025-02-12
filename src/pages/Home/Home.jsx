import Header from '../../components/Header/Header'
import './Home.css'
import video from '../../assets/imagenes/video.mp4'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <main className='main-content'>
        <video className='background-video' autoPlay loop muted>
          <source src={video} type='video.mp4' />
        </video>
        <div className='overlay'>
          <h1>CROSSFIT: ROMPE TUS LÍMITES</h1>
          <p>Descubre la mejor comunidad de entrenamiento.</p>
        </div>
      </main>
    </div>
  )
}

export default Home
