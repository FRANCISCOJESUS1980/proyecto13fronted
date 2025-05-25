import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'
import { TimerProvider, useTimerContext } from '../context/TimerContext'
import Header from '../../../../../components/Header/Header'
import ModeSelection from '../components/ModeSelection'
import TimerSettings from '../components/TimerSettings'
import TimerDisplay from '../components/TimerDisplay'
import TimerControls from '../components/TimerControls'
import './Timer.css'

const TimerContent = () => {
  const navigate = useNavigate()
  const {
    state: { selectedMode, isRunning, isCountdown, showSettings },
    actions: { selectMode, setShowSettings, initializeAudio }
  } = useTimerContext()

  useEffect(() => {
    initializeAudio()
  }, [initializeAudio])

  if (!selectedMode) {
    return (
      <div className='timer-container'>
        <Header />
        <div className='timer-header'>
          <button
            className='back-button'
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={24} />
          </button>
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
        <button className='back-button' onClick={() => selectMode(null)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className='timer-title'>{selectedMode.toUpperCase()}</h1>
        <button
          className='settings-button'
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={24} />
        </button>
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
