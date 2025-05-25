import { memo } from 'react'
import { useTimerContext } from '../../context/TimerContext'

const TabataDisplay = memo(() => {
  const {
    state: {
      isWorkPhase,
      currentRound,
      totalRounds,
      currentCycle,
      totalCycles,
      settings
    }
  } = useTimerContext()

  const getTabataPhaseDisplay = () => {
    if (currentCycle <= totalCycles && currentRound <= totalRounds) {
      if (
        settings.tabata.restBetweenCycles > 0 &&
        !isWorkPhase &&
        currentRound === totalRounds
      ) {
        return 'DESCANSO ENTRE CICLOS'
      }
      return isWorkPhase ? 'TRABAJO' : 'DESCANSO'
    }
    return 'COMPLETADO'
  }

  return (
    <div className='tabata-display'>
      <div className={`phase-display phase-${isWorkPhase ? 'work' : 'rest'}`}>
        {getTabataPhaseDisplay()}
      </div>
      <div className='round-display'>
        Ronda {currentRound} de {totalRounds}
      </div>
      {totalCycles > 1 && (
        <div className='cycle-display'>
          Ciclo {currentCycle} de {totalCycles}
        </div>
      )}
    </div>
  )
})

TabataDisplay.displayName = 'TabataDisplay'

export default TabataDisplay
