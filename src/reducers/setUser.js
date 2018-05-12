import { SET_USER } from '../types'

const initial_state = ''

export default (state = initial_state, action) => {
	switch(action.type) {
		case SET_USER:
			return action.payload
		default:
			return state
	}
}
