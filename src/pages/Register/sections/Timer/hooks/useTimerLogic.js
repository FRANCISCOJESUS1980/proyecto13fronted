import { useCallback } from 'react'
import { ACTIONS } from '../state/timerReducer'

export const useTimerLogic = ({
  state,
  dispatch,
  hasPlayedHalfwayBeep,
  playBeep,
  playFinalAlarm,
  playTransitionBeep
}) => {
  const initializeTimer = useCallback(() => {
    hasPlayedHalfwayBeep.current = false

    switch (state.selectedMode) {
      case 'forTime':
        const forTimeTotal =
          state.settings.forTime.hours * 3600 +
          state.settings.forTime.minutes * 60 +
          state.settings.forTime.seconds
        dispatch({
          type: ACTIONS.INITIALIZE_TIMER,
          payload: {
            timeLeft: forTimeTotal,
            totalTime: forTimeTotal,
            totalRounds: 1,
            currentRound: 1,
            timerColor: 'green'
          }
        })
        break

      case 'amrap':
        const amrapTotal =
          state.settings.amrap.hours * 3600 +
          state.settings.amrap.minutes * 60 +
          state.settings.amrap.seconds
        dispatch({
          type: ACTIONS.INITIALIZE_TIMER,
          payload: {
            timeLeft: amrapTotal,
            totalTime: amrapTotal,
            totalRounds: 1,
            currentRound: 1,
            timerColor: 'green'
          }
        })
        break

      case 'emom':
        const emomInterval =
          state.settings.emom.intervalMinutes * 60 +
          state.settings.emom.intervalSeconds
        const emomTotal =
          state.settings.emom.totalMinutes * 60 +
          state.settings.emom.totalSeconds
        dispatch({
          type: ACTIONS.INITIALIZE_TIMER,
          payload: {
            timeLeft: emomInterval,
            totalTime: emomInterval,
            emomInterval: emomInterval,
            totalRounds: Math.floor(emomTotal / emomInterval),
            currentRound: 1,
            timerColor: 'green'
          }
        })
        break

      case 'tabata':
        dispatch({
          type: ACTIONS.INITIALIZE_TIMER,
          payload: {
            timeLeft: state.settings.tabata.workSeconds,
            totalTime: state.settings.tabata.workSeconds,
            workTime: state.settings.tabata.workSeconds,
            restTime: state.settings.tabata.restSeconds,
            totalRounds: state.settings.tabata.rounds,
            totalCycles: state.settings.tabata.cycles,
            currentRound: 1,
            currentCycle: 1,
            isWorkPhase: true,
            timerColor: 'green'
          }
        })
        break

      case 'custom':
        const customTotal =
          state.settings.custom.hours * 3600 +
          state.settings.custom.minutes * 60 +
          state.settings.custom.seconds
        dispatch({
          type: ACTIONS.INITIALIZE_TIMER,
          payload: {
            timeLeft: customTotal,
            totalTime: customTotal,
            totalRounds: state.settings.custom.rounds,
            currentRound: 1,
            isRestPhase: false,
            timerColor: 'green'
          }
        })
        break
    }
  }, [state.selectedMode, state.settings, dispatch, hasPlayedHalfwayBeep])

  const handleTimerComplete = useCallback(() => {
    switch (state.selectedMode) {
      case 'emom':
        if (state.currentRound < state.totalRounds) {
          dispatch({
            type: ACTIONS.NEXT_EMOM_ROUND,
            payload: {
              currentRound: state.currentRound + 1,
              timeLeft: state.emomInterval,
              totalTime: state.emomInterval,
              timerColor: 'green'
            }
          })
          hasPlayedHalfwayBeep.current = false
          playBeep(800, 200, 0.3)
        } else {
          playFinalAlarm()
          dispatch({ type: ACTIONS.COMPLETE_TIMER })
        }
        break

      case 'tabata':
        if (state.isWorkPhase) {
          dispatch({
            type: ACTIONS.TABATA_WORK_TO_REST,
            payload: {
              timeLeft: state.restTime,
              totalTime: state.restTime,
              timerColor: 'red'
            }
          })
          hasPlayedHalfwayBeep.current = false
          playTransitionBeep(false)
        } else {
          if (state.currentRound < state.totalRounds) {
            dispatch({
              type: ACTIONS.TABATA_NEXT_ROUND,
              payload: {
                currentRound: state.currentRound + 1,
                timeLeft: state.workTime,
                totalTime: state.workTime,
                timerColor: 'green'
              }
            })
            hasPlayedHalfwayBeep.current = false
            playTransitionBeep(true)
          } else {
            if (state.currentCycle < state.totalCycles) {
              const restBetweenCycles = state.settings.tabata.restBetweenCycles
              if (restBetweenCycles > 0) {
                dispatch({
                  type: ACTIONS.TABATA_NEXT_CYCLE_WITH_REST,
                  payload: {
                    currentCycle: state.currentCycle + 1,
                    timeLeft: restBetweenCycles,
                    totalTime: restBetweenCycles,
                    timerColor: 'red'
                  }
                })
                playBeep(400, 1000, 0.3)
              } else {
                dispatch({
                  type: ACTIONS.TABATA_NEXT_CYCLE,
                  payload: {
                    currentCycle: state.currentCycle + 1,
                    timeLeft: state.workTime,
                    totalTime: state.workTime,
                    timerColor: 'green'
                  }
                })
                playTransitionBeep(true)
              }
              hasPlayedHalfwayBeep.current = false
            } else {
              playFinalAlarm()
              dispatch({ type: ACTIONS.COMPLETE_TIMER })
            }
          }
        }
        break

      case 'custom':
        if (state.isRestPhase) {
          const customTotal =
            state.settings.custom.hours * 3600 +
            state.settings.custom.minutes * 60 +
            state.settings.custom.seconds
          dispatch({
            type: ACTIONS.CUSTOM_REST_TO_WORK,
            payload: {
              timeLeft: customTotal,
              totalTime: customTotal,
              timerColor: 'green'
            }
          })
          hasPlayedHalfwayBeep.current = false
          playTransitionBeep(true)
        } else {
          if (state.currentRound < state.totalRounds) {
            const restBetweenRounds = state.settings.custom.restBetweenRounds
            if (restBetweenRounds > 0) {
              dispatch({
                type: ACTIONS.CUSTOM_NEXT_ROUND_WITH_REST,
                payload: {
                  currentRound: state.currentRound + 1,
                  timeLeft: restBetweenRounds,
                  totalTime: restBetweenRounds,
                  timerColor: 'red'
                }
              })
              playTransitionBeep(false)
            } else {
              const customTotal =
                state.settings.custom.hours * 3600 +
                state.settings.custom.minutes * 60 +
                state.settings.custom.seconds
              dispatch({
                type: ACTIONS.CUSTOM_NEXT_ROUND,
                payload: {
                  currentRound: state.currentRound + 1,
                  timeLeft: customTotal,
                  totalTime: customTotal,
                  timerColor: 'green'
                }
              })
              playBeep(800, 200, 0.3)
            }
            hasPlayedHalfwayBeep.current = false
          } else {
            playFinalAlarm()
            dispatch({ type: ACTIONS.COMPLETE_TIMER })
          }
        }
        break

      default:
        playFinalAlarm()
        dispatch({ type: ACTIONS.COMPLETE_TIMER })
        break
    }
  }, [
    state.selectedMode,
    state.currentRound,
    state.totalRounds,
    state.currentCycle,
    state.totalCycles,
    state.isWorkPhase,
    state.isRestPhase,
    state.emomInterval,
    state.restTime,
    state.workTime,
    state.settings,
    dispatch,
    hasPlayedHalfwayBeep,
    playBeep,
    playFinalAlarm,
    playTransitionBeep
  ])

  return {
    initializeTimer,
    handleTimerComplete
  }
}
