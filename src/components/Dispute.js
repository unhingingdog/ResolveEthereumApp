import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { getDisputeDetails, getIssueDetails } from '../actions/contractActions'

class Dispute extends Component {


  render() {
    const { initiator, respondent } = this.props

    console.log(this.props)
    return(
      <div>
        <h2>Initiator: {initiator}</h2>
        <h2>respondent: {respondent}</h2>
        <p>{this.props.issue['0']}</p>
      </div>
    )
  }

  async componentDidMount() {
    const disputeAddress = this.props.match.params.address
    this.props.getDisputeDetails(disputeAddress)
    this.props.getIssueDetails(disputeAddress)
  }
}

const mapStateToProps = state => {
	return {
    initiator: state.disputeDetails.parties[0],
    respondent: state.disputeDetails.parties[1],
    issue: state.issueDetails
  }
}

export default connect(mapStateToProps, {
  getDisputeDetails,
  getIssueDetails
})(Dispute)
