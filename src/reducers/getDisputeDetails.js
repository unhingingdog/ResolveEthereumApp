import { GET_DISPUTE, GET_PARTIES } from '../types'

const initial_state = {
  currentDispute: null,
  parties: []
}

export default (state = initial_state, action) => {
	switch(action.type) {
		case GET_DISPUTE:
			return {...state, currentDispute: action.payload}
    case GET_PARTIES:
      return {...state, parties: action.payload}
		default:
			return state
	}
}
