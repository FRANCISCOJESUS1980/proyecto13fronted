import { memo } from 'react'
import { useTimerContext } from '../../context/TimerContext'

const CustomDisplay = memo(() => {
  const {
    state: { isRestPhase, currentRound, totalRounds }
  } = useTimerContext()

  const getCustomPhaseDisplay = () => {
    return isRestPhase ? 'DESCANSO' : 'TRABAJO'
  }

  if (totalRounds <= 1) return null

  return (
    <div className='custom-display'>
      <div className={`phase-display phase-${isRestPhase ? 'rest' : 'work'}`}>
        {getCustomPhaseDisplay()}
      </div>
      <div className='round-display'>
        Ronda {currentRound} de {totalRounds}
      </div>
    </div>
  )
})

CustomDisplay.displayName = 'CustomDisplay'

export default CustomDisplay
