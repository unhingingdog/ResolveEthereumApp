import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Input, Button, Icon } from 'semantic-ui-react'

import { createDispute } from '../actions/contractActions'

class NewDisupte extends Component {
  render() {
    if (this.submissionIsComplete()) {
      return <Redirect to="/disputes" />
    }

    return(
      <div style={styles.container}>
        <h1 style={styles.title}>New Dispute</h1>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <Input
            fluid
            label="Respondent Address"
            value={this.state.text}
            onChange={this.handleChange}
            icon={<Icon
              name="briefcase"
              inverted
              circular
              link
              onClick={this.handleSubmit}
            />}
            onSubmit={this.handleSubmit}
          />
        </form>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      respondentAddress: '',
      submissionComplete: false
    }
  }

  submissionIsComplete = () => this.state.submissionComplete

  handleChange = event => {
    this.setState({ respondentAddress: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.respondentAddress.length > 41) {
      this.props.createDispute(this.props.user, this.state.respondentAddress)
      this.setState({ submissionComplete: true })
    } else {
      this.setState({ respondentAddress: 'Invalid' })
    }
  }
}

const mapStateToProps = state => {
	return {}
}

export default connect(mapStateToProps, { createDispute })(NewDisupte)

const styles = {
  container: {
    background: 'linear-gradient(135deg, #ff0000 0%,#ff7f00 100%)',
    height: '91vh',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'column'
  },
  title: {
    marginTop: '35vh',
    fontSize: 40
  },
  form: {
    width: '80vw',
    paddingTop: 20
  }
}
