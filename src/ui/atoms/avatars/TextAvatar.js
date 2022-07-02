import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
const MyComponent = props => {
  const theme = props.theme;
  return (
    <Avatar.Text
      size={40}
      style={[
        styles.myAvatarStyle,
        {
          backgroundColor: props.color ? props.color : theme.colors.primary,
        },
      ]}
      label={props.label}
      labelStyle={styles.labelStyle}
      {...props}
    />
  );
};
export default MyComponent;
const styles = StyleSheet.create({
  myAvatarStyle: {
    borderRadius: 5,
  },
  labelStyle: {fontSize: 20, fontFamily: 'Nunito-Bold'},
});
