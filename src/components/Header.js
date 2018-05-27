import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import MetamaskColor from '../assets/Metamask-icon-color.png'
import MetamaskGrey from '../assets/Metamask-icon-greyscale.png'
import { Dimmer, Loader } from 'semantic-ui-react'

export default ({ user, changeActive, active, loading }) => {
  let metaMaskStatus

  if (user === 'NONE') {
    metaMaskStatus = MetamaskGrey
  } else {
    metaMaskStatus = MetamaskColor
  }

  if (loading) {
    return(
      <Dimmer active style={styles.dimmer}>
        <Loader size="massive">{loading}</Loader>
      </Dimmer>
    )
  }

  return(
    <Menu pointing secondary>
      <Menu.Item
        name='Resolve'
        id='home'
        onClick={changeActive}
        as={ Link }
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='Disputes'
          id='Disputes'
          active={active === 'Disputes'}
          onClick={changeActive}
          as={ NavLink }
          to='/disputes'
        />
        <Menu.Item
          name='New Dispute'
          id='New Dispute'
          active={active === 'New Dispute'}
          onClick={changeActive}
          as={ NavLink }
          to='/new'
        />
        <Menu.Item name='MetamaskIcon'>
          <img src={metaMaskStatus} alt="metamask icon" height="30" width="21" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

// <div style={styles.headerContainer}>
//   <div style={styles.headerButton}>
//     <h3><Link to="/new">New</Link></h3>
//   </div>
//   <div></div>
//   <div style={styles.headerButton}>
//     <h3>{ user ? metaMaskStatus : 'Loading' }</h3>
//   </div>
// </div>

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
  },
  dimmer: {
     position: 'fixed'
  }
}
