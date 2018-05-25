import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { getDisputeDetails } from '../actions/contractActions'

import Issue from './Issue'

class Dispute extends Component {

  render() {
    console.log(this.props.user, this.props.initiator, this.props.respondent)
    const { address } = this.props.match.params
    const { initiator, respondent, issuesCount, loading, user } = this.props

    return(
      <div>
        <h2>Initiator: {initiator}</h2>
        <h2>respondent: {respondent}</h2>
        <h2>issues: {issuesCount} </h2>
        <div style={styles.issuesContainer}>
          <Issue
            disputeAddress={address}
            loading={loading}
            userAddress={user}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const disputeAddress = this.props.match.params.address
    this.props.getDisputeDetails(disputeAddress)
  }

//   userRole = () => {
//     const { user, respondent, initiator } = this.props //arbitrator
//
//     switch(user) {
//       case respondent:
//         return 'respondent'
//         break
//       case initiator:
//         return 'initiator'
//         break
//       case arbitrator:
//         return 'arbitrator'
//         break
//       default:
//        return ''
//        break
//     }
//   }
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

const styles = {
  issuesContainer: {
    margin: '3%'
  }
}
