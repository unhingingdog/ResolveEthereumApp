import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  console.log(props)
  return(
    <div style={styles.container}>
      <h1 style={styles.title}>Resolution Squid</h1>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    background: "linear-gradient(-45deg, #4f69ff 0%, #60abf8 99%, #4096ee 100%)"
  },
  title: {
    color: 'white',
    fontSize: 80,
    top: '30vh'
  }
}
