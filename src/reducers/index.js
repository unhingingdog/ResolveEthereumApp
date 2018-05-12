import { combineReducers } from 'redux'
import setUser from './setUser'
import getDisputeDetails from './getDisputeDetails'
import getIssueDetails from './getIssueDetails'

export default combineReducers({
	user: setUser,
	dispute: getDisputeDetails,
	issue: getIssueDetails
})
