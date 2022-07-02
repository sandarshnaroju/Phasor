import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';

const MyComponent = props => {
  const theme = props.theme;
  return (
    <Badge
      style={[
        styles.badgeStyle,
        {
          color: theme.colors.avatarBackground,
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.avatarBackground,
          flex: props.flex,
        },
      ]}
      {...props}>
      {' '}
      {props.text}{' '}
    </Badge>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  badgeStyle: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 10,

    borderWidth: 0.5,
  },
});
