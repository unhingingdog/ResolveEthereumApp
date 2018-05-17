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
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: LOADING_DISPUTES })

    if (!user) {
      const users = await web3.eth.getAccounts()
      user = users[0] || 'NONE'
    }

    const disputes = await factory.methods.getUserDisputes(user).call()

    const disputesInArrayForm = []
    disputes.map(dispute => disputesInArrayForm.push(dispute))

    dispatch({ type: SET_DISPUTES, payload: disputesInArrayForm })
    dispatch({ type: LOADING_STOP })
  }
}

export const getDisputeDetails = address => {
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: LOADING_DISPUTES })

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

export const createDispute = (userAddress, respondentAddress) => {
  return async dispatch => {
      dispatch({ type: LOADING_START, payload: CREATING_DISPUTE })
      console.log('creating dispute ', respondentAddress)

      try {
        await factory.methods.createDispute(respondentAddress).send({
          from: userAddress,
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
  console.log('CREATE ISSUE FIRED')
  return async dispatch => {
    dispatch({ type: LOADING_START, payload: CREATING_ISSUE })
    const dispute = await Dispute(disputeAddress)

    console.log(web3.utils.toWei(arbitratorFee, 'ether'))

    try {
      console.log(dispute.methods.createIssue)
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
        console.log('issue deployed')

    } catch (error) {
      console.log(error)
    }

    dispatch({ type: LOADING_STOP })
  }
}

export const acceptIssue = disputeAddress => {
  return async dispatch => {
    console.log('FIRED')
    const dispute = Dispute(disputeAddress)

  }
}

export const settleIssue = (disputeAddress, winnerAddress, award) => {
  return async dispatch => {
    const dispute = Dispute(disputeAddress)
    // await dispute.methods.settleIssue
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
    (issue, index) => getIssueDetails(dispute, index))
  )
    .then(issues => issues)
    .catch(error => console.log(error))
}

const getIssueDetails = async (dispute, index) => {
  const contractIssueOutput = await dispute.methods.getIssue(index).call()
  return {
    title: contractIssueOutput[0],
    submitter: contractIssueOutput[1],
    acceptor: contractIssueOutput[2],
    arbitrator: contractIssueOutput[3],
    arbitratorFee: contractIssueOutput[4],
    accepted: contractIssueOutput[5],
    resolved: contractIssueOutput[6],
    funds: 'todo'
  }
}
