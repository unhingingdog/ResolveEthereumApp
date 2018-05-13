import { combineReducers } from 'redux'
import setUser from './setUser'
import setLoadingStatus from './setLoadingStatus'
import getDisputeDetails from './getDisputeDetails'
import getIssues from './getIssues'

export default combineReducers({
	user: setUser,
	loading: setLoadingStatus,
	dispute: getDisputeDetails,
	issues: getIssues
})
