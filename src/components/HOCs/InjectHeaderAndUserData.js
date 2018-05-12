import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Redux from 'redux'
import { connect } from 'react-redux'

import { setUser } from '../../actions/contractActions'

import Header from '../Header'

export default function(ComposedComponent) {
  class InjectHeaderAndUserData extends Component {
    render() {
      return(
        <div>
          <Header loggedIn={!!this.props.user} />
          <ComposedComponent {...this.props} />
        </div>
      )
    }

    componentDidMount() {
      if (!this.props.user) this.props.setUser()
    }
  }

  const mapStateToProps = state => {
  	return {
  		user: state.userAndDisputes.user,
      disputes: state.userAndDisputes.disputes
    }
  }

  return connect(mapStateToProps, {
    setUser
  })(InjectHeaderAndUserData)
}
