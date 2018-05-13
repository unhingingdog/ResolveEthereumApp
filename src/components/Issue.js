import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

import { getIssueDetails } from '../actions/contractActions'

class Issue extends Component {
  render() {
    return this.renderIssueDetails(this.props.issue)
  }

  async componentDidMount() {
    const { getIssueDetails, disputeAddress } = this.props

    getIssueDetails(disputeAddress, 0)
  }

  renderIssueDetails = issue => {
    return(
      <div>
        <h3>Issue: {issue.name}</h3>
        <h3>submitter: {issue.submitter}</h3>
        <h3>acceptor: {issue.acceptor}</h3>
        <h3>arbitrator: {issue.arbitrator}</h3>
        <h3>arbitratorFee: {issue.arbitratorFee}</h3>
        <h3>accepted: {issue.accepted ? 'true' : 'false'}</h3>
        <h3>resolved: {issue.resolved ? 'true' : 'false'}</h3>
        <h3>funds: {issue.funds}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    issue: state.issue
  }
}

export default connect(mapStateToProps, {
  getIssueDetails
})(Issue)
