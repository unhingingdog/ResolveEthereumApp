import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserView, isMobile, isBrowser } from 'react-device-detect'
import squid from '../assets/squid.png'
import mainScreenshot from '../assets/main-screenshot.png'
import 'pure-react-carousel/dist/react-carousel.es.css'

import Step from './Step'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

export default props => {
  return(
    <div>
      <BrowserView device={isBrowser}>
        <div style={styles.topContainer}>
          <div style={styles.logo}>
            <img src={squid} width="230" height="230" />
          </div>
          <h1 style={styles.title}>Judgment Squid</h1>
          <p style={styles.blurb}>The cheap, secure way to settle your dispute.</p>
          <p style={styles.disclaimer}>(Currently running on Ethereum's Rinkeby test network.)</p>
        </div>
      </BrowserView>

      <BrowserView device={isMobile}>
        <p>mobile</p>
      </BrowserView>
    </div>
  )
}

const styles = {
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '92vh',
    background: "linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)"
  },
  midContainer: {
    background: 'white',
    color: 'black',
    height: 300
  },
  title: {
    color: 'white',
    fontSize: 80,
  },
  logo: {
    paddingTop: '10%'
  },
  screenshot: {
    marginTop: 10,
    borderRadius: '10px',
    padding: 10,
    background: 'white'
  },
  blurb: {
    color: 'white',
    fontSize: 20
  },
  disclaimer: {
    color: 'white',
    fontSize: 15,
    marginTop: -17
  }
}
