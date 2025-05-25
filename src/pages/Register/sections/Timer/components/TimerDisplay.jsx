import { memo } from 'react'
import { useTimerContext } from '../context/TimerContext'
import CountdownDisplay from './display/CountdownDisplay'
import MainTimerDisplay from './display/MainTimerDisplay'

const TimerDisplay = memo(() => {
  const {
    state: { isCountdown }
  } = useTimerContext()

  return (
    <div className='timer-display'>
      {isCountdown ? <CountdownDisplay /> : <MainTimerDisplay />}
    </div>
  )
})

TimerDisplay.displayName = 'TimerDisplay'

export default TimerDisplay
