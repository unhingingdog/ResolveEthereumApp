import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Redux from 'redux'
import { connect } from 'react-redux'

import { setDisputes } from '../actions/contractActions'

class DisputesIndex extends Component {

  render() {
    return(
        <h2>{!this.props.disputes ? "loading" : this.renderDisputes()}</h2>
    )
  }

  componentDidMount() {
    this.props.setDisputes(this.props.user)
  }

  renderDisputes = () => {
    return this.props.disputes.map((dispute, key) => {
      const url = `/dispute/${dispute}`

      return(
        <Link to={url}>
          <h3 key={key}>{dispute}</h3>
        </Link>
      )
    })
  }
}

const mapStateToProps = state => {
	return {
    disputes: state.dispute.disputes
  }
}

export default connect(mapStateToProps, { setDisputes })(DisputesIndex)
