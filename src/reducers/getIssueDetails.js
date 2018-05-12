import { GET_ISSUE } from '../types'

const initial_state = {}

export default (state = initial_state, action) => {
	switch(action.type) {
		case GET_ISSUE:
			return {...state, issueDetails: action.payload}
		default:
			return state
	}
}
