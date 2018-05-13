import { LOADING_START, LOADING_STOP, LOADED } from '../types'

const initial_state = LOADED

export default (state = initial_state, action) => {
  switch(action.type) {
    case LOADING_START:
      return action.payload
    case LOADING_STOP:
      return LOADED
    default:
      return state
  }
}
