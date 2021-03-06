import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import { createIssue } from '../actions/contractActions'

class NewIssue extends Component {
  render() {
    return(
      <div>
        <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Input
              label="Title"
              type="text"
              id="issueTitle"
              value={this.state.issueTitle}
              onChange={this.handleInputChange}
              style={styles.input}
            />
            <Form.Input
              label="Arbitrator Address"
              type="text"
              id="arbitratorAddress"
              value={this.state.arbitratorAddress}
              onChange={this.handleInputChange}
              style={styles.input}
            />
            <Form.Input
              label="Stake"
              type="number"
              id="stake"
              value={this.state.stake}
              onChange={this.handleInputChange}
              style={styles.input}
              min="0"
              step="0.01"
            />
            <Form.Input
              label="fee"
              type="number"
              id="arbitratorFee"
              value={this.state.arbitratorFee}
              onChange={this.handleInputChange}
              style={styles.input}
              min="0"
              step="0.01"
            />
          <Button primary type="submit">Submit</Button>
        </Form>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentWillUpdate() {
    if (this.state.submissionComplete) this.setState(defaultState)
  }

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { issueTitle, arbitratorAddress, stake, arbitratorFee } = this.state
    const { user, createIssue, disputeAddress } = this.props

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

const defaultState = {
  issueTitle: '',
  arbitratorAddress: '',
  stake: 0,
  arbitratorFee: 0,
  submissionComplete: false
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    margin: '2 0 2 0'
  }
}
