export const ACTIONS = {
  SELECT_MODE: 'SELECT_MODE',
  SET_SHOW_SETTINGS: 'SET_SHOW_SETTINGS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  TICK_TIMER: 'TICK_TIMER',
  TICK_COUNTDOWN: 'TICK_COUNTDOWN',
  END_COUNTDOWN: 'END_COUNTDOWN',
  SET_TIMER_COLOR: 'SET_TIMER_COLOR',
  INITIALIZE_TIMER: 'INITIALIZE_TIMER',
  COMPLETE_TIMER: 'COMPLETE_TIMER',
  NEXT_EMOM_ROUND: 'NEXT_EMOM_ROUND',
  TABATA_WORK_TO_REST: 'TABATA_WORK_TO_REST',
  TABATA_NEXT_ROUND: 'TABATA_NEXT_ROUND',
  TABATA_NEXT_CYCLE: 'TABATA_NEXT_CYCLE',
  TABATA_NEXT_CYCLE_WITH_REST: 'TABATA_NEXT_CYCLE_WITH_REST',
  CUSTOM_REST_TO_WORK: 'CUSTOM_REST_TO_WORK',
  CUSTOM_NEXT_ROUND: 'CUSTOM_NEXT_ROUND',
  CUSTOM_NEXT_ROUND_WITH_REST: 'CUSTOM_NEXT_ROUND_WITH_REST'
}

export const initialState = {
  selectedMode: null,
  isRunning: false,
  isPaused: false,
  showSettings: true,
  timeLeft: 0,
  totalTime: 0,
  isCountdown: false,
  countdownTime: 10,
  currentRound: 1,
  totalRounds: 1,
  currentCycle: 1,
  totalCycles: 1,
  isWorkPhase: true,
  workTime: 20,
  restTime: 10,
  emomInterval: 60,
  isRestPhase: false,
  timerColor: 'green',
  settings: {
    forTime: {
      hours: 0,
      minutes: 10,
      seconds: 0,
      description: 'Completa el WOD lo más rápido posible'
    },
    amrap: {
      hours: 0,
      minutes: 20,
      seconds: 0,
      description: 'Tantas rondas como sea posible en el tiempo dado'
    },
    emom: {
      intervalMinutes: 1,
      intervalSeconds: 0,
      totalMinutes: 10,
      totalSeconds: 0,
      description:
        'Cada minuto en el minuto - completa el trabajo y descansa hasta el siguiente minuto'
    },
    tabata: {
      workSeconds: 20,
      restSeconds: 10,
      rounds: 8,
      cycles: 1,
      restBetweenCycles: 60,
      description: 'Protocolo Tabata: 20 seg trabajo, 10 seg descanso'
    },
    custom: {
      hours: 0,
      minutes: 5,
      seconds: 0,
      rounds: 1,
      restBetweenRounds: 0,
      description: 'Timer personalizado para cualquier tipo de entrenamiento'
    }
  }
}

export const timerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_MODE:
      return {
        ...state,
        selectedMode: action.payload,
        showSettings: action.payload ? true : false,
        isRunning: false,
        isPaused: false,
        currentRound: 1,
        currentCycle: 1,
        isWorkPhase: true,
        isRestPhase: false,
        timerColor: 'green',
        isCountdown: false
      }

    case ACTIONS.SET_SHOW_SETTINGS:
      return { ...state, showSettings: action.payload }

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.mode]: {
            ...state.settings[action.payload.mode],
            [action.payload.field]: action.payload.value
          }
        }
      }

    case ACTIONS.START_TIMER:
      return {
        ...state,
        showSettings: false,
        isCountdown: true,
        countdownTime: 10,
        isRunning: true,
        isPaused: false,
        timerColor: 'green'
      }

    case ACTIONS.PAUSE_TIMER:
      return { ...state, isPaused: !state.isPaused }

    case ACTIONS.STOP_TIMER:
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        isCountdown: false,
        currentRound: 1,
        currentCycle: 1,
        isWorkPhase: true,
        isRestPhase: false,
        showSettings: true,
        timerColor: 'green'
      }

    case ACTIONS.RESET_TIMER:
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        isCountdown: false,
        currentRound: 1,
        currentCycle: 1,
        isWorkPhase: true,
        isRestPhase: false,
        timerColor: 'green'
      }

    case ACTIONS.TICK_TIMER:
      return { ...state, timeLeft: state.timeLeft - 1 }

    case ACTIONS.TICK_COUNTDOWN:
      return { ...state, countdownTime: state.countdownTime - 1 }

    case ACTIONS.END_COUNTDOWN:
      return { ...state, isCountdown: false }

    case ACTIONS.SET_TIMER_COLOR:
      return { ...state, timerColor: action.payload }

    case ACTIONS.INITIALIZE_TIMER:
      return { ...state, ...action.payload }

    case ACTIONS.COMPLETE_TIMER:
      return { ...state, isRunning: false, timerColor: 'green' }

    case ACTIONS.NEXT_EMOM_ROUND:
      return { ...state, ...action.payload }

    case ACTIONS.TABATA_WORK_TO_REST:
      return {
        ...state,
        isWorkPhase: false,
        timerColor: 'red',
        ...action.payload
      }

    case ACTIONS.TABATA_NEXT_ROUND:
      return {
        ...state,
        isWorkPhase: true,
        timerColor: 'green',
        ...action.payload
      }

    case ACTIONS.TABATA_NEXT_CYCLE:
      return {
        ...state,
        currentRound: 1,
        isWorkPhase: true,
        timerColor: 'green',
        ...action.payload
      }

    case ACTIONS.TABATA_NEXT_CYCLE_WITH_REST:
      return {
        ...state,
        currentRound: 1,
        isWorkPhase: false,
        timerColor: 'red',
        ...action.payload
      }

    case ACTIONS.CUSTOM_REST_TO_WORK:
      return {
        ...state,
        isRestPhase: false,
        timerColor: 'green',
        ...action.payload
      }

    case ACTIONS.CUSTOM_NEXT_ROUND:
      return { ...state, ...action.payload }

    case ACTIONS.CUSTOM_NEXT_ROUND_WITH_REST:
      return {
        ...state,
        isRestPhase: true,
        timerColor: 'red',
        ...action.payload
      }

    default:
      return state
  }
}
