import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Redux from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { NO_USER } from '../types'

import { setDisputes } from '../actions/contractActions'

class DisputesIndex extends Component {
  render() {

    if (this.props.user === NO_USER) {
      return <Redirect to="/" />
    }

    return(
        <h3>{this.renderDisputes()}</h3>
    )
  }

  componentDidMount() {
    const { disputes, setDisputes, user } = this.props

    if (!disputes || disputes.length === 0) {
      return setDisputes(user)
    }
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
