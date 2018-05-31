import React from 'react'
import { Icon } from 'semantic-ui-react'

export default ({ children }) => {
  return(
    <div style={styles.container}>
      <p><Icon name="cube" /> {children}</p>
    </div>
  )
}

const styles = {
  container: {
    margin: '8%',
    fontSize: 20
  }
}
