import thunk from 'redux-thunk'
import {
  SET_USER,
  SET_DISPUTES,
  GET_DISPUTE,
  CREATE_DISPUTE,
  GET_DISPUTE_DETAILS,
  CREATE_ISSUE,
  GET_ISSUES,
  LOADING_START,
  LOADING_STOP,
  LOADING_DISPUTES,
  LOADING_ISSUES,
  CREATING_DISPUTE,
  CREATING_ISSUE,
  ACCEPTING_ISSUE,
  SETTLING_ISSUE,
  LOADED,
  NO_USER
} from '../types'

import factory from '../ethereum/factory'
import Dispute from '../ethereum/Dispute'
import web3 from '../ethereum/web3'
import reducers from '../reducers'

//User

export const setUser = () => {
  return async dispatch => {
    const users = await web3.eth.getAccounts()
    const user = users[0] || NO_USER

    dispatch({ type: SET_USER, payload: user })
  }
}

//Disputes

export const setDisputes = user => {
  console.log(user)
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: LOADING_DISPUTES })
    const disputes = await factory.methods.getUserDisputes(user).call()
    dispatch({ type: SET_DISPUTES, payload: disputes })
    dispatch({ type: LOADING_STOP })

  }
}

export const getDisputeDetails = address => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: LOADING_DISPUTES })

    if (!address) {
      dispatch({ type: GET_DISPUTE_DETAILS, payload: [] })
      dispatch({ type: LOADING_STOP })
    } else {
      const dispute = Dispute(address)
      const initiator = await dispute.methods.initiator().call()
      const respondent = await dispute.methods.respondent().call()
      const issueCount = parseInt(await dispute.methods.getIssuesCount().call())
      dispatch({ type: GET_DISPUTE_DETAILS, payload: [
        initiator,
        respondent,
        issueCount
      ]})
      dispatch({ type: LOADING_STOP })
    }
  }
}

export const createDispute = (userAddress, respondentAddress) => {
  return async dispatch => {
      dispatch({ type: LOADING_START, payload: CREATING_DISPUTE })
      console.log('creating dispute ', respondentAddress)

      try {
        await factory.methods.createDispute(respondentAddress).send({
          from: userAddress
        })
        console.log('transaction complete')
      } catch(error) {
        console.log(error)
      }

      dispatch({ type: LOADING_STOP })
  }
}

//Issues

export const createIssue = (
  userAddress,
  disputeAddress,
  issueTitle,
  stake,
  arbitratorAddress,
  arbitratorFee
) => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: CREATING_ISSUE })
    const dispute = await Dispute(disputeAddress)

    try {
      await dispute.methods.createIssue
        .call(0,
          issueTitle,
          arbitratorAddress,
          web3.utils.toWei(arbitratorFee, 'ether')
        )
        .send({
          from: userAddress,
          value: web3.utils.toWei(stake, 'ether')
         })
    } catch (error) {
      console.log(error)
    }

    dispatch({ type: LOADING_STOP })
  }
}

export const acceptIssue = (userAddress, disputeAddress, issueIndex, stake) => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: ACCEPTING_ISSUE })
    const dispute = Dispute(disputeAddress)

    try {
      await dispute.methods.acceptIssue(issueIndex).send({
        from: userAddress,
        value: stake
      })
      dispatch({ type: LOADING_STOP })
    } catch (error) {
      console.log(error)
    }
  }
}

export const settleIssue = (
  userAddress,
  disputeAddress,
  issueIndex,
  winnerAddress,
  awardAmount
) => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: SETTLING_ISSUE })
    const dispute = Dispute(disputeAddress)
    awardAmount = web3.utils.toWei(awardAmount, 'ether')

    try {
      await dispute.methods.settleIssue(issueIndex, winnerAddress, awardAmount)
        .send({
          from: userAddress
        })
    } catch (error) {
      console.log(error)
    }
    dispatch({ type: LOADING_STOP })
  }
}

export const getIssues = address => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: LOADING_ISSUES })

    const dispute = Dispute(address)
    const emptyIssuesArray = '0'.repeat(
      await dispute.methods.getIssuesCount().call()
    ).split('')

    const payload = await getListOfIssues(dispute, emptyIssuesArray)

    dispatch({ type: GET_ISSUES, payload })
    dispatch({ type: LOADING_STOP })
  }
}

//getIssues helper methods

const getListOfIssues = (dispute, issuesArray) => {
  return Promise.all(issuesArray.map(
    (issue, index) => getIssueDetails(dispute, index)
  ))
    .then(issues => issues)
    .catch(error => console.log(error))
}

const getIssueDetails = async (dispute, index) => {
  const contractIssueOutput = await dispute.methods.getIssue(index).call()
  const title = await dispute.methods.getIssueTitle(index).call()
  return {
    title,
    submitter: contractIssueOutput[0],
    acceptor: contractIssueOutput[1],
    arbitrator: contractIssueOutput[2],
    arbitratorFee: contractIssueOutput[3],
    accepted: contractIssueOutput[4],
    resolved: contractIssueOutput[5],
    funds: contractIssueOutput[6]
  }
}
