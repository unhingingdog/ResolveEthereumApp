import { GET_ISSUE } from '../types'

const initial_state = {
	name: '',
	submitter: '',
	acceptor: '',
	arbitrator: '',
	arbitratorFee: 0,
	accepted: false,
	resolved: false,
	funds: 0
}

export default (state = initial_state, action) => {
	const { type, payload: issue } = action

	switch(type) {
		case GET_ISSUE:
			return {
				...state,
				name: issue[0],
				submitter: issue[1],
				acceptor: issue[2],
				arbitrator: issue[3],
				arbitratorFee: issue[4],
				accepted: issue[5],
				resolved: issue[6],
			}
		default:
			return state
	}
}
