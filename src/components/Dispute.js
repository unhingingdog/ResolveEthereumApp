import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { getDisputeDetails } from '../actions/contractActions'

import Issue from './Issue'

class Dispute extends Component {

  render() {
    const { address } = this.props.match.params

    const { initiator, respondent, issuesCount, loading } = this.props

    return(
      <div>
        <h1>{this.props.loading}</h1>
        <h2>Initiator: {initiator}</h2>
        <h2>respondent: {respondent}</h2>
        <h2>issues: {issuesCount} </h2>
        <Issue
          disputeAddress={address}
          loading={loading} 
          userAddress={this.props.user}
        />
      </div>
    )
  }

  async componentDidMount() {
    const disputeAddress = this.props.match.params.address
    this.props.getDisputeDetails(disputeAddress)
  }
}

const mapStateToProps = state => {
	return {
    initiator: state.dispute.disputeDetails[0],
    respondent: state.dispute.disputeDetails[1],
    issuesCount: state.dispute.disputeDetails[2],
  }
}

export default connect(mapStateToProps, {
  getDisputeDetails,
})(Dispute)
