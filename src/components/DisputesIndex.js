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
      <div style={styles.addresses}>
        <h1>Your Disputes</h1>
        <h3>{this.renderDisputes()}</h3>
      </div>
    )
  }

  componentDidMount() {
    const { disputes, setDisputes, user } = this.props
    setDisputes(user)
  }

  renderDisputes = () => {
    return this.props.disputes.map((dispute, index) => {
      const url = `/dispute/${dispute}`

      return(
        <Link to={url}>
          <h3 key={index + 'dispute'}>{dispute}</h3>
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

const styles = {
  addresses: {
    margin: 30
  }
}
