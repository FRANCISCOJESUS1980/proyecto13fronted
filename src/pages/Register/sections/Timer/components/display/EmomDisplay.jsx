import { memo } from 'react'
import { useTimerContext } from '../../context/TimerContext'

const EmomDisplay = memo(() => {
  const {
    state: { currentRound, totalRounds }
  } = useTimerContext()

  return (
    <div className='round-display'>
      Ronda {currentRound} de {totalRounds}
    </div>
  )
})

EmomDisplay.displayName = 'EmomDisplay'

export default EmomDisplay
