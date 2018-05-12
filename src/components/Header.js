import React from 'react'
import { Link } from 'react-router-dom'

export default ({ user }) => {
  let output

  if (user === 'NONE') {
    output = "Log into Metamask"
  } else {
    output = "Logged in"
  }

  return(
    <div style={styles.headerContainer}>
      <div style={styles.headerButton}>
        <h3><Link to="/new">New</Link></h3>
      </div>
      <div></div>
      <div style={styles.headerButton}>
        <h3>{ user ? output : 'Loading' }</h3>
      </div>
    </div>
  )
}

const styles = {
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 80px',
    gridGap: '5px',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'black',
    color: 'white',
    padding: '0 40px 0 40px'
  },
  headerButton: {
    textAlign: 'center'
  }
}
