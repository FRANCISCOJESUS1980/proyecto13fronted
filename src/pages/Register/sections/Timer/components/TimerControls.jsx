import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { memo } from 'react'
import { useTimerContext } from '../context/TimerContext'

const TimerControls = memo(() => {
  const {
    state: { isRunning, isPaused },
    actions: { startTimer, pauseTimer, stopTimer, resetTimer }
  } = useTimerContext()

  return (
    <div className='timer-controls'>
      {!isRunning ? (
        <button className='control-button start' onClick={startTimer}>
          <Play size={32} />
          <span>Iniciar</span>
        </button>
      ) : (
        <button className='control-button pause' onClick={pauseTimer}>
          <Pause size={32} />
          <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
        </button>
      )}

      <button className='control-button stop' onClick={stopTimer}>
        <Square size={32} />
        <span>Parar</span>
      </button>

      <button className='control-button reset' onClick={resetTimer}>
        <RotateCcw size={32} />
        <span>Reset</span>
      </button>
    </div>
  )
})

TimerControls.displayName = 'TimerControls'

export default TimerControls
