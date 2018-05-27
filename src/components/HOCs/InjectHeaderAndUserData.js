import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Redux from 'redux'
import { connect } from 'react-redux'

import { LOADED } from '../../types'
import { setUser } from '../../actions/contractActions'

import Header from '../Header'

export default function(ComposedComponent) {
  class InjectHeaderAndUserData extends Component {
    render() {
      return(
        <div>
          <Header
            user={this.props.user}
            active={this.state.activeHeaderItem}
            changeActive={this.changeActiveHeaderItem}
            loading={this.props.loading}
          />
          <ComposedComponent {...this.props} />
        </div>
      )
    }

    constructor(props) {
      super(props)
      this.state = { activeHeaderItem: null }
    }

    componentDidMount() {
      const { user, setUser } = this.props

      if (!user) setUser()
    }

    changeActiveHeaderItem = event => {
      console.log(event.target.id)
      this.setState({ activeHeaderItem: event.target.id })
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
