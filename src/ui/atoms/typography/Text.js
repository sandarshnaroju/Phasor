import * as React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
const MyComponent = props => (
  <Text {...props} style={[styles.paragraphStyle, props.style]}>
    {props.children}
  </Text>
);

export default MyComponent;
const styles = StyleSheet.create({
  paragraphStyle: {
    marginVertical: 0,
    fontFamily: 'Nunito-SemiBold',
  },
});
