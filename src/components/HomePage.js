import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserView, isMobile, isBrowser } from 'react-device-detect'
import squid from '../assets/squid.png'
import mainScreenshot from '../assets/main-screenshot.png'
import 'pure-react-carousel/dist/react-carousel.es.css'

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
        </div>
        <div style={styles.midBackground}>
          <div style={styles.midContainer}>
            <div style={styles.about}>
              <p>
                Judgment Squid is a decentralised arbitration platform running
                on the Ethereum blockchain. It allows parties to resolve
                disputes by directing funds into locked, smart-contract based
                accounts.
              </p>
              <p>
                Nominated arbitrators can distribute these funds to the
                parties only. This removes many of the risks and expenses
                associated with centrally administered arbitration.
              </p>
              <p>
                (Currently running on Ethereums Rinkeby test network.)
              </p>
            </div>
          </div>
        </div>
        <div style={styles.lowerContainer}>
          <p style={styles.copyRight}>Hamish Gilkison</p>
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
    height: '90vh',
    background: 'linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)',
    minWidth: 500
  },
  midBackground: {
    position: 'absolute',
    background: 'white',
    color: 'black',
    height: 340,
    width: '100vw',
    transform: 'skewY(358.5deg)',
    marginTop: -30
  },
  lowerContainer: {
    background: 'linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)',
    marginTop: 280,
    height: 100,
    width: '100vw',
  },
  midContainer: {
    transform: 'skewY(1.5deg)',
  },
  title: {
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
    fontFamily: 'IM Fell English SC, serif'
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
    fontSize: 20,
    fontFamily: 'Quicksand, san-serif',
  },
  disclaimer: {
    color: 'white',
    fontSize: 15,
    marginTop: -17,
  },
  about: {
    margin: '100px 10% 0 10%',
    background: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand, san-serif'
  },
  copyRight: {
    color: 'white',
    fontFamily: 'Quicksand, san-serif',
    fontSize: 12,
  }
}
