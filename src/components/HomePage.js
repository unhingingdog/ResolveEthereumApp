import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  console.log(props)
  return(
    <div>
      <h1>test</h1>
      <h3><Link to="/disputes">Disputes</Link></h3>
    </div>
  )
}
