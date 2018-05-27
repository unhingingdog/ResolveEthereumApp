import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { getDisputeDetails, getIssues } from '../actions/contractActions'
import { Accordion } from 'semantic-ui-react'

import NewIssue from './NewIssue'
import Issue from './Issue'

import { CREATING_ISSUE } from '../types'

class Dispute extends Component {

  render() {
    console.log(this.props.user, this.props.initiator, this.props.respondent)
    const { address } = this.props.match.params
    const { initiator, respondent, issuesCount, loading, user } = this.props
    const { newIssueActive } = this.state

    return(
      <div>
        <div style={styles.disputeDetails}>
          <h3>{this.userRole()} ({issuesCount} issues)</h3>
        </div>

        <div style={styles.issuesContainer}>
          <Issue
            disputeAddress={address}
            loading={loading}
            userAddress={user}
          />
        </div>

        { user === (respondent || initiator) &&
          <div style={styles.newIssue}>
            <Accordion styled>
              <Accordion.Title
                active={newIssueActive}
                onClick={() => this.setState({ newIssueActive: !newIssueActive})}
              >
                <h3>New Issue</h3>
              </Accordion.Title>
              <Accordion.Content active={newIssueActive}>
              <NewIssue
                disputeAddress={address}
                user={user}
               />
              </Accordion.Content>
            </Accordion>
          </div>
        }
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      newIssueActive: false
    }
  }

  componentDidMount() {
    const disputeAddress = this.props.match.params.address
    this.props.getDisputeDetails(disputeAddress)
  }

  componentDidUpdate(prevProps) {
    const disputeAddress = this.props.match.params.address
    if (prevProps.loading === CREATING_ISSUE)  {
      this.props.getIssues(disputeAddress)
      this.setState({ newIssueActive: false })
    }
  }

  userRole = () => {
    const { user, respondent, initiator } = this.props

    switch(user) {
      case respondent:
        return `Respondent: ${respondent.substr(0, 8)}...`
        break
      case initiator:
        return `Initiator: ${initiator.substr(0, 8)}...`
        break
      default:
       return ''
       break
    }
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
  getIssues
})(Dispute)

const styles = {
  issuesContainer: {
    margin: '3%'
  },
  disputeDetails: {
    margin: '3%'
  },
  newIssue: {
    margin: '3%'
  }
}
