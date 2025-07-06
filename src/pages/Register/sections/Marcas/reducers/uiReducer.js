import { UI_ACTION_TYPES, TABS } from '../constants/personalRecordsConstants.js'

export const initialUIState = {
  activeTab: TABS.ALL,
  showForm: false,
  animationComplete: false,
  viewDetails: null
}

export const uiReducer = (state, action) => {
  switch (action.type) {
    case UI_ACTION_TYPES.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      }
    case UI_ACTION_TYPES.TOGGLE_FORM:
      return {
        ...state,
        showForm: action.payload
      }
    case UI_ACTION_TYPES.SET_ANIMATION_COMPLETE:
      return {
        ...state,
        animationComplete: action.payload
      }
    case UI_ACTION_TYPES.SET_VIEW_DETAILS:
      return {
        ...state,
        viewDetails: action.payload
      }
    default:
      return state
  }
}
