import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import web3 from '../ethereum/web3'
import Issue from './Issue'
import Spinner from 'react-spinkit'
import { Accordion, Icon } from 'semantic-ui-react'

import {
  LOADED,
  LOADING_ISSUES,
  ACCEPTING_ISSUE,
  SETTLING_ISSUE
} from '../types'

import {
  getIssues,
  acceptIssue,
  settleIssue
} from '../actions/contractActions'

class Issues extends Component {
  render() {
    return this.renderIssueDetails(this.props.issues)
  }

  constructor(props) {
    super(props)

    this.state = {
      activeIssue: 0
    }
  }

  async componentDidMount() {
    return this.props.getIssues(this.props.disputeAddress)
  }

  async componentDidUpdate(prevProps) {
    const { getIssues, disputeAddress} = this.props
    if (prevProps.loading === ACCEPTING_ISSUE) getIssues(disputeAddress)
    if (prevProps.loading === SETTLING_ISSUE) getIssues(disputeAddress)
  }

  setActiveIssue = activeIssue => {
    this.setState({ activeIssue })
  }

  renderIssueDetails = issues => {
    const { loading, user, disputeAddress } = this.props

    return issues.map((issue, index) => {
      return(
        <Accordion styled>
          <Accordion.Title
            active={this.state.activeIssue === index}
            onClick={() => this.setActiveIssue(index)}
          >
            <h3><Icon name='balance scale' />{issue.title}</h3>
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIssue === index}>
          <Issue
            issueDetails={issue}
            key={index + issue}
            user={user}
            index={index}
            settleIssue={this.props.settleIssue}
            acceptIssue={this.props.acceptIssue}
            disputeAddress={disputeAddress}
            
          />
        </Accordion.Content>
      </Accordion>
      )
    })
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
})(Issues)
