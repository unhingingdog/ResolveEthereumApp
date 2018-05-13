import { GET_ISSUES } from '../types'

const initial_state = []

export default (state = initial_state, action) => {
	const { type, payload } = action

	switch(type) {
		case GET_ISSUES:
			return payload
		default:
			return state
	}
}
