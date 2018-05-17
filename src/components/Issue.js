import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

import { LOADED } from '../types'
import {
  getIssues,
  acceptIssue,
  settleIssue
} from '../actions/contractActions'

class Issue extends Component {
  render() {
    return this.renderIssueDetails(this.props.issues)
  }

  async componentDidMount() {
    this.props.getIssues(this.props.disputeAddress)
  }

  renderIssueDetails = issues => {
    const { loading } = this.props

    if (loading === LOADED && issues.length === 0) {
      return <p>No issues submitted yet</p>
    }

    if (loading !== LOADED) return <p>Loading</p>

    return issues.map((issue, index) => {
      return(
        <div key={index + '-' + this.props.disputeAddress}>
          <h3>Issue: {issue.title}</h3>
          <h3>submitter: {issue.submitter}</h3>
          <h3>acceptor: {issue.acceptor}</h3>
          <h3>arbitrator: {issue.arbitrator}</h3>
          <h3>arbitratorFee: {issue.arbitratorFee}</h3>
          <h3>accepted: {issue.accepted ? 'true' : 'false'}</h3>
          <h3>resolved: {issue.resolved ? 'true' : 'false'}</h3>
          <h3>funds: {issue.funds}</h3>
          <button id={index} onClick={this.acceptIssue}>accept</button>
          <button id={index} onClick={this.acceptIssue}>settle</button>
        </div>
      )
    })
  }

  acceptIssue = event => {
    console.log(event.target.id)
    const { acceptIssue, disputeAddress } = this.props
    const { id: issueIndex } = event.target
    acceptIssue(disputeAddress, issueIndex)
  }

  settleIssue = event => {
  //   const { disputeAddress, settleIssue } = this.props
  //   const { issueIndex } = event.target
  //   settleIssue(disputeAddress, issueIndex, winnerAddress, award)
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
