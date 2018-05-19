import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createIssue } from '../actions/contractActions'

class NewIssue extends Component {
  render() {

    if (this.submissionIsComplete()) {
      return <Redirect to={`/dispute/${this.props.match.params.address}`} />
    }

    return(
      <div>
        <h1>New Issue</h1>
        <form onSubmit={this.handleSubmit} >
          <label>
            Issue title:
            <input
              type="text"
              id="issueTitle"
              value={this.state.issueTitle}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Arbitrator Address:
            <input
              type="text"
              id="arbitratorAddress"
              value={this.state.arbitratorAddress}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Stake (in ether):
            <input
              type="number"
              id="stake"
              value={this.state.stake}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Arbitrator fee:
            <input
              type="number"
              id="arbitratorFee"
              value={this.state.arbitratorFee}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      issueTitle: '',
      arbitratorAddress: '',
      stake: 0,
      arbitratorFee: 0,
      submissionComplete: false
    }
  }

  submissionIsComplete = () => this.state.submissionComplete

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { issueTitle, arbitratorAddress, stake, arbitratorFee } = this.state
    const { user, createIssue } = this.props
    const { address: disputeAddress } = this.props.match.params

    createIssue(
      user,
      disputeAddress,
      issueTitle,
      stake,
      arbitratorAddress,
      arbitratorFee
    )

    this.setState({ submissionComplete: true })
  }
}

const mapStateToProps = state => {
	return {}
}

export default connect(mapStateToProps, { createIssue })(NewIssue)
