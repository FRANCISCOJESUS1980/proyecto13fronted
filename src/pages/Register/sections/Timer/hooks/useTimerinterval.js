import { useEffect } from 'react'

export const useTimerInterval = ({
  state,
  intervalRef,
  hasPlayedHalfwayBeep,
  playCountdownBeep,
  playWarningBeep,
  handleTimerComplete,
  initializeTimer,
  playBeep
}) => {
  const { dispatch } = state.actions || {}

  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        if (state.isCountdown) {
          if (state.countdownTime <= 1) {
            initializeTimer()
            playBeep(1200, 500, 0.5)
          } else {
            playCountdownBeep(state.countdownTime - 1)
          }
        } else {
          const newTime = state.timeLeft - 1

          if (
            newTime === Math.floor(state.totalTime / 2) &&
            state.totalTime > 60 &&
            !hasPlayedHalfwayBeep.current
          ) {
            playWarningBeep()
            hasPlayedHalfwayBeep.current = true
          }

          if (newTime <= 3 && newTime > 0) {
            playCountdownBeep(newTime)
          }

          if (newTime <= 0) {
            handleTimerComplete()
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [
    state.isRunning,
    state.isPaused,
    state.isCountdown,
    state.timeLeft,
    state.totalTime,
    state.countdownTime,
    intervalRef,
    hasPlayedHalfwayBeep,
    playCountdownBeep,
    playWarningBeep,
    handleTimerComplete,
    initializeTimer,
    playBeep
  ])
}
