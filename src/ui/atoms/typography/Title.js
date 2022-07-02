import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
const MyComponent = props => (
  <Text {...props} style={[styles.defaultStyle, props.style]}>
    {props.text}
  </Text>
);

export default MyComponent;

const styles = StyleSheet.create({
  defaultStyle: {fontFamily: 'Nunito-Bold', fontSize: 20},
});
