import * as React from 'react'
import {Modal, Portal} from 'react-native-paper'

const MyComponent = props => {
  return (
    <Portal>
      <Modal {...props}>{props.children}</Modal>
    </Portal>
  )
}

export default MyComponent
