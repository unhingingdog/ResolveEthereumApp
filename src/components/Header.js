import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import MetamaskColor from '../assets/Metamask-icon-color.png'
import MetamaskGrey from '../assets/Metamask-icon-greyscale.png'
import { Dimmer, Loader, Icon } from 'semantic-ui-react'

import { NO_USER } from '../types'

export default ({ user, changeActive, active, loading }) => {
  let metaMaskStatus

  if (user === NO_USER) {
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
    <Menu pointing secondary top attached style={styles.header}>
      <Menu.Item
        name="Resolve"
        id="home"
        onClick={changeActive}
        as={ Link }
        to="/"
      >
        <Icon name="home" size="large" circular color="orange" inverted />
      </Menu.Item>
      <Menu.Menu position="right">
        { user !== NO_USER &&
          <Menu.Item
            name="Disputes"
            id="Disputes"
            active={active === 'Disputes'}
            onClick={changeActive}
            as={ NavLink }
            to="/disputes"
          />
        }
        { user !== NO_USER &&
          <Menu.Item
            name="New Dispute"
            id="New Dispute"
            active={active === 'New Dispute'}
            onClick={changeActive}
            as={ NavLink }
            to="/new"
          />
        }
        { user === NO_USER &&
          <Menu.Item>
            Log into
            <a href="https://metamask.io/">
              &nbsp; Metamask &nbsp;
            </a>
            to start
          </Menu.Item>
        }
        <Menu.Item name='MetamaskIcon'>
          <img src={metaMaskStatus} alt="metamask icon" height="30" width="21" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

const styles = {
  dimmer: {
     position: 'fixed'
  },
  header: {
    background: 'white'
  }
}
