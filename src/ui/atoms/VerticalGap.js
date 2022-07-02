import * as React from 'react';
import {View} from 'react-native';

const MyComponent = props => {
  return (
    <View
      style={{
        height: props.height,
      }}></View>
  );
};

export default MyComponent;
