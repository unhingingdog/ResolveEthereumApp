import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { setUser, setDisputes } from '../actions/contractActions'
import Redux from 'redux'
import { connect } from 'react-redux'

import HomePage from './HomePage'
import DisputesIndex from './DisputesIndex'
import NewDispute from './NewDispute'
import Dispute from './Dispute'
import InjectHeaderAndUserData from './HOCs/InjectHeaderAndUserData'



class App extends Component {
  render() {
    const { user, disputes } = this.props
    console.log('rendered')

    return(
      <BrowserRouter>
        <div>
          <Route
            exact path="/"
              component={InjectHeaderAndUserData(HomePage)}
          />
          <Route
            exact path="/new"
            component={InjectHeaderAndUserData(NewDispute)}
          />
          <Route
            exact path="/disputes"
            component={InjectHeaderAndUserData(DisputesIndex)}
          />
          <Route
            path="/dispute/:address"
            component={InjectHeaderAndUserData(Dispute)}
          />
        </div>
      </BrowserRouter>
    )
  }

  componentDidMount() {
    this.props.setUserAndDisputes()
  }
}

const mapStateToProps = state => {
	return {
		user: state.userAndDisputes.user,
    disputes: state.userAndDisputes.disputes
  }
}

export default connect(mapStateToProps, { setUserAndDisputes })(App)
