import { memo } from 'react'
import { useTimerContext } from '../../context/TimerContext'

const CountdownDisplay = memo(() => {
  const {
    state: { countdownTime }
  } = useTimerContext()

  return (
    <div className='countdown-display'>
      <h2>Prepárate</h2>
      <div className='countdown-number'>{countdownTime}</div>
    </div>
  )
})

CountdownDisplay.displayName = 'CountdownDisplay'

export default CountdownDisplay
