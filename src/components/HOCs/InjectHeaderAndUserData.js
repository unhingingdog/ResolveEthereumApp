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
          <Header user={this.props.user} />
          <ComposedComponent {...this.props} />
        </div>
      )
    }

    componentDidMount() {
      const { user, setUser } = this.props

      if (!user) setUser()
    }
  }

  const mapStateToProps = state => {
  	return {
  		user: state.user,
      loading: state.loading
    }
  }

  return connect(mapStateToProps, {
    setUser
  })(InjectHeaderAndUserData)
}
