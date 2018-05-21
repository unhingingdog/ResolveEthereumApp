import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import web3 from '../ethereum/web3'
import Spinner from 'react-spinkit'

import { LOADED, LOADING_ISSUES } from '../types'
import {
  getIssues,
  acceptIssue,
  settleIssue
} from '../actions/contractActions'

class Issue extends Component {
  render() {
    if (this.props.loading === LOADING_ISSUES) <p>loading</p>

    return this.renderIssueDetails(this.props.issues)
  }

  constructor(props) {
    super(props)

    this.state = {
      awardAmount: 0
    }
  }

  async componentDidMount() {
    return this.props.getIssues(this.props.disputeAddress)
  }

  renderIssueDetails = issues => {
    const { loading } = this.props

    return issues.map((issue, index) => {
      return(
        <div key={index + '-' + this.props.disputeAddress}>
          <h3>Issue: {issue.title}</h3>
          <h3>submitter: {issue.submitter}</h3>
          <h3>acceptor: {issue.acceptor}</h3>
          <h3>arbitrator: {issue.arbitrator}</h3>
          <h3>arbitratorFee: {web3.utils.fromWei(issue.arbitratorFee)} eth</h3>
          <h3>accepted: {issue.accepted ? 'true' : 'false'}</h3>
          <h3>resolved: {issue.resolved ? 'true' : 'false'}</h3>
          <h3>funds: {web3.utils.fromWei(issue.funds, 'ether')} eth</h3>
          <button id={index} onClick={this.acceptIssue}>accept</button>
          <input
            type="number"
            value={this.state.awardAmount}
            onChange={this.handleInputChange}
            id="awardAmount"
          />
          Settle
          <button
            id={index}
            onClick={e => this.settleIssue(e, issue.submitter)}
          >
            submitter ({issue.submitter})
          </button>
          <button
            id={index}
            onClick={e => this.settleIssue(e, issue.acceptor)}
          >
            acceptor ({issue.acceptor})
          </button>
        </div>
      )
    })
  }

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  acceptIssue = event => {
    const { acceptIssue, disputeAddress, userAddress, issues } = this.props
    const { id: issueIndex } = event.target
    const stake = issues[issueIndex].funds

    acceptIssue(userAddress, disputeAddress, issueIndex, stake)
  }

  settleIssue = (event, winnerAddress) => {
    const { disputeAddress, settleIssue, userAddress } = this.props
    const { id: issueIndex } = event.target
    const { awardAmount } = this.state

    settleIssue(
      userAddress,
      disputeAddress,
      issueIndex,
      winnerAddress,
      awardAmount
    )
  }
}

const mapStateToProps = state => {
  return {
    issues: state.issues
  }
}

export default connect(mapStateToProps, {
  getIssues,
  acceptIssue,
  settleIssue
})(Issue)
