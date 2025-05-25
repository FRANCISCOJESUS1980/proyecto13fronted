import { memo } from 'react'
import { useTimerContext } from '../../context/TimerContext'
import EmomDisplay from './EmomDisplay'
import TabataDisplay from './TabataDisplay'
import CustomDisplay from './CustomDisplay'

const MainTimerDisplay = memo(() => {
  const {
    state: { timeLeft, timerColor, selectedMode },
    actions: { formatTime }
  } = useTimerContext()

  const renderModeSpecificDisplay = () => {
    switch (selectedMode) {
      case 'emom':
        return <EmomDisplay />
      case 'tabata':
        return <TabataDisplay />
      case 'custom':
        return <CustomDisplay />
      default:
        return null
    }
  }

  return (
    <>
      <div className={`main-timer timer-${timerColor}`}>
        {formatTime(timeLeft)}
      </div>
      {renderModeSpecificDisplay()}
    </>
  )
})

MainTimerDisplay.displayName = 'MainTimerDisplay'

export default MainTimerDisplay
