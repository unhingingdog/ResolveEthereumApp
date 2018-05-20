import React from 'react'
import Spinner from 'react-spinkit'

export default ({ status }) => {
  return(
    <div className="loading-container" style={styles.container}>
      <Spinner name="ball-spin-fade-loader" style={styles.spinner} />
      <h3 style={styles.statusText}>{status}</h3>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    background: 'yellow',
    height: '100vh'
  },
  spinner: {
    top: '40vh',
    background: 'coral',
    display: 'flex',
    flex: 1
  },
  statusText: {
    background: 'mistyrose',
    position: 'absolute'
  }
}
