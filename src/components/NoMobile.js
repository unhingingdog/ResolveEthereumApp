import React from 'react'
import squid from '../assets/squid.png'

export default () => {
  return(
    <div style={styles.container}>
      <div style={styles.logo}>
        <img src={squid} width="230" height="230" />
      </div>
      <p style={styles.text}>
        Judgment Squid won't work on a phone. Please come back on a computer.
      </p>
    </div>
  )
}

const styles = {
  container: {
    background: 'linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)',
    height: '100vh',
    textAlign: 'center',
    color: 'white',
    paddingTop: '25vh'
  },
  text: {
    padding: 20,
    fontFamily: 'Quicksand, san-serif',
    fontSize: 20
  }
}
