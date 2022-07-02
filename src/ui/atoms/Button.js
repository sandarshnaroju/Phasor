import * as React from 'react';
import {Button} from 'react-native-paper';
const MyComponent = props => {
  return (
    <Button mode="text" {...props} loading={props.loading}>
      {props.title}
    </Button>
  );
};

export default MyComponent;
