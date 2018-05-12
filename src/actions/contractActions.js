import thunk from 'redux-thunk'
import {
  SET_USER,
  SET_DISPUTES,
  GET_DISPUTE,
  GET_DISPUTE_DETAILS,
  GET_ISSUE
} from '../types'
import factory from '../ethereum/factory'
import Dispute from '../ethereum/Dispute'
import web3 from '../ethereum/web3'
import reducers from '../reducers'

export const setUser = () => {
  return async dispatch => {
    const users = await web3.eth.getAccounts()
    const user = users[0] || 'NONE'

    dispatch({ type: SET_USER, payload: user })
  }
}

export const setDisputes = user => {
  return async dispatch => {

    if (!user) {
      const users = await web3.eth.getAccounts()
      user = users[0] || 'NONE'
    }

    const disputes = await factory.methods.getUserDisputes(user).call()

    const disputesInArrayForm = []
    disputes.map(dispute => disputesInArrayForm.push(dispute))

    dispatch({ type: SET_DISPUTES, payload: disputesInArrayForm })
  }
}

export const getDisputeDetails = address => {
  return async dispatch => {
    const dispute = Dispute(address)
    const initiator = await dispute.methods.initiator().call()
    const respondent = await dispute.methods.respondent().call()
    const issueCount = parseInt(await dispute.methods.getIssuesCount().call())

    dispatch({ type: GET_DISPUTE_DETAILS, payload: [
      initiator,
      respondent,
      issueCount
    ]})
  }
}

export const getIssueDetails = (address, index) => {
  return async dispatch => {
    const dispute = Dispute(address)
    const issue = await dispute.methods.getIssue(index).call()

    dispatch({ type: GET_ISSUE, payload: issue })
  }
}
