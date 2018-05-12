import thunk from 'redux-thunk'
import {
  SET_USER,
  SET_DISPUTES,
  GET_DISPUTE,
  GET_PARTIES,
  GET_ISSUE
} from '../types'
import factory from '../ethereum/factory'
import Dispute from '../ethereum/Dispute'
import web3 from '../ethereum/web3'
import reducers from '../reducers'

export const setUser = () => {
  return async dispatch => {
    const users = await web3.eth.getAccounts()
    dispatch({ type: SET_USER, payload: users[0] })
  }
}

export const setDisputes = user => {
  return async dispatch => {
    const disputes = await factory.methods.getUserDisputes(user).call()

    const disputesarr = []
    disputes.map(dispute => disputesarr.push(dispute))

    dispatch({ type: SET_DISPUTES, payload: disputesarr })
  }
}

export const getDisputeDetails = address => {
  return async dispatch => {
    const dispute = Dispute(address)
    const initiator = await dispute.methods.initiator().call()
    const respondent = await dispute.methods.respondent().call()

    dispatch({ type: GET_PARTIES, payload: [initiator, respondent] })
  }
}

export const getIssueDetails = address => {
  return async dispatch => {
    const dispute = Dispute(address)
    const issue = await dispute.methods.getIssue(0).call()

    dispatch({ type: GET_ISSUE, payload: issue })
  }
}
