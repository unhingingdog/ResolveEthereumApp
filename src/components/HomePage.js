import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import squid from '../assets/squid.png'
import mainScreenshot from '../assets/main-screenshot.png'
import 'pure-react-carousel/dist/react-carousel.es.css'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

export default (props) => {
  return(
    <div>
      <div style={styles.topContainer}>
        <div style={styles.logo}>
          <img src={squid} width="230" height="230" />
        </div>
        <h1 style={styles.title}>Judgment Squid</h1>
        <p style={styles.blurb}>The cheap, secure way to settle your beef.</p>
      </div>
      <div style={styles.midContainer}>

      </div>
    </div>
  )
}

const styles = {
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 530,
    background: "linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)"
  },
  midContainer: {
    background: 'white',
    height: 300
  },
  title: {
    color: 'white',
    fontSize: 80,
  },
  logo: {
    paddingTop: 65
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
  }
}

//<img src={mainScreenshot} width="540" height="500" />
