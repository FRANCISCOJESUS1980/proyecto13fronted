import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'
import { TimerProvider, useTimerContext } from '../context/TimerContext'
import Header from '../../../../../components/Header/page/Header'
import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/loading'
import ModeSelection from '../components/ModeSelection'
import TimerSettings from '../components/TimerSettings'
import TimerDisplay from '../components/TimerDisplay'
import TimerControls from '../components/TimerControls'
import './Timer.css'

const TimerContent = () => {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const {
    state: { selectedMode, isRunning, isCountdown, showSettings },
    actions: { selectMode, setShowSettings, initializeAudio }
  } = useTimerContext()

  useEffect(() => {
    const loadTimerPage = async () => {
      try {
        await initializeAudio()
      } catch (error) {
        console.error('Error al cargar timer:', error)
      } finally {
        setPageLoading(false)
      }
    }

    loadTimerPage()
  }, [initializeAudio])

  if (pageLoading) {
    return (
      <Loading
        isVisible={pageLoading}
        loadingText='CARGANDO TIMER...'
        onComplete={() => setPageLoading(false)}
      />
    )
  }

  if (!selectedMode) {
    return (
      <div className='timer-container'>
        <Header />
        <div className='timer-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/dashboard')}
            leftIcon={<ArrowLeft size={24} />}
          >
            Volver al Dashboard
          </Button>
          <h1 className='timer-title'>CrossFit Timer</h1>
        </div>
        <ModeSelection onSelectMode={selectMode} />
      </div>
    )
  }

  return (
    <div
      className={`timer-container ${
        isRunning || isCountdown ? 'timer-running' : ''
      }`}
    >
      <Header />
      <div className='timer-header'>
        <Button
          variant='secondary'
          onClick={() => selectMode(null)}
          leftIcon={<ArrowLeft size={24} />}
        >
          Volver
        </Button>
        <h1 className='timer-title'>{selectedMode.toUpperCase()}</h1>
        <Button
          variant='primary'
          onClick={() => setShowSettings(!showSettings)}
          leftIcon={<Settings size={24} />}
        >
          Ajustes
        </Button>
      </div>

      {showSettings && <TimerSettings />}
      <TimerDisplay />
      <TimerControls />
    </div>
  )
}

const Timer = () => {
  return (
    <TimerProvider>
      <TimerContent />
    </TimerProvider>
  )
}

export default Timer
