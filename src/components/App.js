import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { setUser, setDisputes } from '../actions/contractActions'

import HomePage from './HomePage'
import DisputesIndex from './DisputesIndex'
import NewDispute from './NewDispute'
import Dispute from './Dispute'
import NewIssue from './NewIssue'
import InjectHeaderAndUserData from './HOCs/InjectHeaderAndUserData'

export default () => {

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
          exact path="/dispute/:address/issue"
          component={InjectHeaderAndUserData(NewIssue)}
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
