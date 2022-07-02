import * as React from 'react'
import {Switch} from 'react-native-paper'

const MyComponent = props => {
  return (
    <Switch
      value={props.switchValue}
      onValueChange={props.onSwitchValueChange}
      {...props}
    />
  )
}

export default MyComponent
