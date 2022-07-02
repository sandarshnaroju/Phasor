import * as React from 'react';
import { Checkbox } from 'react-native-paper';

const MyComponent = props => {
  const theme = props.theme;
  return (
    <Checkbox.Item
      color={theme.colors.primary}
      label={props.label}
      status={props.status}
      onPress={props.onPress}
      labelStyle={{
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: theme.colors.text,
      }}
      {...props}
    />
  );
};

export default MyComponent;
