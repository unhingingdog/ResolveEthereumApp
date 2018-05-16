import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

import { createIssue } from '../actions/contractActions'

class NewIssue extends Component {
  render() {

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
            Arbitrator fee:
            <input
              type="text"
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
      arbitratorFee: 0
    }
  }

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.respondentAddress.length > 41) {
      this.props.createDispute(this.props.user, this.state.respondentAddress)
      this.setState({ respondentAddress: 'submitted' })
    } else {
      this.setState({ respondentAddress: 'Invalid' })
    }
  }
}

const mapStateToProps = state => {
	return {}
}

export default connect(mapStateToProps, { createIssue })(NewIssue)
