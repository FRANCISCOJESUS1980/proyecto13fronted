import { useReducer, useCallback, useRef, useEffect } from 'react'
import { timerReducer, initialState, ACTIONS } from '../state/timerReducer'
import { useTimerLogic } from './useTimerLogic'
import { useAudioSystem } from './useAudioSystem'

export const useTimerState = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState)
  const intervalRef = useRef(null)
  const hasPlayedHalfwayBeep = useRef(false)

  const {
    audioContextRef,
    playBeep,
    playCountdownBeep,
    playWarningBeep,
    playFinalAlarm,
    playTransitionBeep
  } = useAudioSystem()

  const { initializeTimer, handleTimerComplete } = useTimerLogic({
    state,
    dispatch,
    hasPlayedHalfwayBeep,
    playBeep,
    playFinalAlarm,
    playTransitionBeep
  })

  const getCurrentPhaseColor = useCallback(() => {
    switch (state.selectedMode) {
      case 'tabata':
        return state.isWorkPhase ? 'green' : 'red'
      case 'custom':
        return state.isRestPhase ? 'red' : 'green'
      default:
        return 'green'
    }
  }, [state.selectedMode, state.isWorkPhase, state.isRestPhase])

  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        if (state.isCountdown) {
          if (state.countdownTime <= 1) {
            dispatch({ type: ACTIONS.END_COUNTDOWN })
            setTimeout(() => initializeTimer(), 100)
            playBeep(1200, 500, 0.5)
          } else {
            dispatch({ type: ACTIONS.TICK_COUNTDOWN })
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
            dispatch({ type: ACTIONS.SET_TIMER_COLOR, payload: 'orange' })
          } else if (newTime > 3) {
            const currentColor = getCurrentPhaseColor()
            if (state.timerColor === 'orange') {
              dispatch({ type: ACTIONS.SET_TIMER_COLOR, payload: currentColor })
            }
          }

          if (newTime <= 0) {
            dispatch({ type: ACTIONS.TICK_TIMER })
            setTimeout(() => {
              handleTimerComplete()
            }, 100)
          } else {
            dispatch({ type: ACTIONS.TICK_TIMER })
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
    state.timerColor,
    dispatch,
    initializeTimer,
    playBeep,
    playCountdownBeep,
    playWarningBeep,
    handleTimerComplete,
    getCurrentPhaseColor
  ])

  const initializeAudio = useCallback(() => {}, [])

  const selectMode = useCallback(
    (mode) => {
      dispatch({ type: ACTIONS.SELECT_MODE, payload: mode })
      if (mode) {
        setTimeout(() => {
          initializeTimer()
        }, 100)
      }
    },
    [initializeTimer]
  )

  const setShowSettings = useCallback((show) => {
    dispatch({ type: ACTIONS.SET_SHOW_SETTINGS, payload: show })
  }, [])

  const updateSettings = useCallback((mode, field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_SETTINGS,
      payload: { mode, field, value: Number.parseInt(value) || 0 }
    })
  }, [])

  const startTimer = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume()
    }
    dispatch({ type: ACTIONS.START_TIMER })
  }, [audioContextRef])

  const pauseTimer = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_TIMER })
  }, [])

  const stopTimer = useCallback(() => {
    dispatch({ type: ACTIONS.STOP_TIMER })
    hasPlayedHalfwayBeep.current = false
    setTimeout(() => initializeTimer(), 100)
  }, [initializeTimer])

  const resetTimer = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_TIMER })
    hasPlayedHalfwayBeep.current = false
    setTimeout(() => initializeTimer(), 100)
  }, [initializeTimer])

  const formatTime = useCallback((seconds) => {
    const safeSeconds = Math.max(0, seconds)

    const hours = Math.floor(safeSeconds / 3600)
    const mins = Math.floor((safeSeconds % 3600) / 60)
    const secs = safeSeconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }, [])

  return {
    state,
    actions: {
      selectMode,
      setShowSettings,
      updateSettings,
      startTimer,
      pauseTimer,
      stopTimer,
      resetTimer,
      formatTime,
      initializeAudio
    }
  }
}
