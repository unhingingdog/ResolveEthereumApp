import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

import { getIssueDetails } from '../actions/contractActions'

class Issue extends Component {
  render() {

    return(
      <div>
        <h3>Issue: {this.props.issue.name}</h3>
        <h3>submitter: {this.props.issue.submitter}</h3>
        <h3>acceptor: {this.props.issue.acceptor}</h3>
        <h3>arbitrator: {this.props.issue.arbitrator}</h3>
        <h3>arbitratorFee: {this.props.issue.arbitratorFee}</h3>
        <h3>accepted: {this.props.issue.accepted ? 'true' : 'false'}</h3>
        <h3>resolved: {this.props.issue.resolved ? 'true' : 'false'}</h3>
        <h3>funds: {this.props.issue.funds}</h3>
      </div>
    )
  }

  async componentDidMount() {
    const { getIssueDetails, disputeAddress } = this.props

    getIssueDetails(disputeAddress, 0)
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
