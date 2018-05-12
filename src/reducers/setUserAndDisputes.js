import { SET_USER, SET_DISPUTES } from '../types'

const initial_state = { user: '', disputes: [], currentDispute: null }

export default (state = initial_state, action) => {
	switch(action.type) {
		case SET_USER:
			return {...state, user: action.payload}
		case SET_DISPUTES:
			return {...state, disputes: action.payload}
		default:
			return state
	}
}
