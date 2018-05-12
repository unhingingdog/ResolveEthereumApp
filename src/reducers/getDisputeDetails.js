import {
  GET_DISPUTE,
  GET_DISPUTE_DETAILS,
  SET_DISPUTES
} from '../types'

const initial_state = {
  currentDispute: null,
  disputeDetails: []
}

export default (state = initial_state, action) => {
	switch(action.type) {
    case SET_DISPUTES:
      return {...state, disputes: action.payload}
		case GET_DISPUTE:
			return {...state, currentDispute: action.payload}
    case GET_DISPUTE_DETAILS:
      return {...state, disputeDetails: action.payload}
		default:
			return state
	}
}
