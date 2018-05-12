import { combineReducers } from 'redux'
import setUserAndDisputes from './setUserAndDisputes'
import getDisputeDetails from './getDisputeDetails'
import getIssueDetails from './getIssueDetails'

export default combineReducers({
	userAndDisputes: setUserAndDisputes,
	disputeDetails: getDisputeDetails,
	issueDetails: getIssueDetails
})
