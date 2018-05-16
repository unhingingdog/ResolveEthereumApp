import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

import { createDispute } from '../actions/contractActions'

class NewDisupte extends Component {
  render() {
    console.log(this.state.respondentAddress)
    return(
      <div>
        <h1>New Dispute</h1>
        <form onSubmit={this.handleSubmit} >
          <label>
            Respondent Address:
            <input
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
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
      respondentAddress: ''
    }
  }

  handleChange = event => {
    this.setState({ respondentAddress: event.target.value })
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

export default connect(mapStateToProps, { createDispute })(NewDisupte)
