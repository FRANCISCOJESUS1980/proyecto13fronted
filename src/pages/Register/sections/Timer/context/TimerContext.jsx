import { createContext, useContext } from 'react'
import { useTimerState } from '../hooks/useTimerState'

const TimerContext = createContext(null)

export const TimerProvider = ({ children }) => {
  const timerState = useTimerState()

  return (
    <TimerContext.Provider value={timerState}>{children}</TimerContext.Provider>
  )
}

export const useTimerContext = () => {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimerContext debe ser usado dentro de un TimerProvider')
  }
  return context
}
