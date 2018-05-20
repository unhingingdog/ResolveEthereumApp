import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Redux from 'redux'
import { connect } from 'react-redux'

import Loading from '../Loading'
import { LOADED } from '../../types'
import { setUser } from '../../actions/contractActions'

import Header from '../Header'

export default function(ComposedComponent) {
  class InjectHeaderAndUserData extends Component {
    render() {
      console.log('HEADER PROPS: ', this.props)
      console.log(this.props.loading)
      // if (this.isLoading() === LOADED) {
        return(
          <div>
            <Header user={this.props.user} />
            <ComposedComponent {...this.props} />
          </div>
        )
      // }

      // return(
      //   <div>
      //     <Header user={this.props.user} />
      //     <Loading status={this.props.loading} />
      //   </div>
      // )
    }

    componentDidMount() {
      const { user, setUser } = this.props

      if (!user) setUser()
    }

    isLoading = () => this.props.loading
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
