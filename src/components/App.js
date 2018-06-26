import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { setUser, setDisputes } from '../actions/contractActions'
import { BrowserView, isMobile, isBrowser } from 'react-device-detect'

import HomePage from './HomePage'
import DisputesIndex from './DisputesIndex'
import NewDispute from './NewDispute'
import Dispute from './Dispute'
import InjectHeaderAndUserData from './HOCs/InjectHeaderAndUserData'
import NoMobile from './NoMobile'

export default () => {

  return(
    <div>
      <BrowserView device={isBrowser}>
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
      </BrowserView>
      <BrowserView device={isMobile}>
        <NoMobile />
      </BrowserView>
    </div>

  )
}
