import * as React from 'react'
import {TouchableRipple} from 'react-native-paper'
const MyComponent = props => (
  <TouchableRipple {...props}>{props.children}</TouchableRipple>
)

export default MyComponent
