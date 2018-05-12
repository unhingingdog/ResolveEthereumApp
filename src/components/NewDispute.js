import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'

class NewDisupte extends Component {
  render() {
    console.log('NEW DISPUTE:', this.props)
    return(
      <div>
        <h1>New Dispute</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {

  }
}

export default connect(mapStateToProps, {})(NewDisupte)
