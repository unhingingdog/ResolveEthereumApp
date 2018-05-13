import { combineReducers } from 'redux'
import setUser from './setUser'
import getDisputeDetails from './getDisputeDetails'
import getIssues from './getIssues'

export default combineReducers({
	user: setUser,
	dispute: getDisputeDetails,
	issues: getIssues
})
