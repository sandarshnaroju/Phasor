import * as React from 'react';
import {TextInput} from 'react-native-paper';

const MyComponent = props => {
  const theme = props.theme;
  return (
    <TextInput
      label={props.label}
      numberOfLines={5}
      multiline
      theme={{
        colors: {
          primary: theme.colors.primary,
        },
        fonts: {regular: {fontFamily: 'Nunito-Regular'}},
      }}
      onChangeText={props.onChangeText}
      defaultValue={props.defaultValue}
      value={props.value}
      {...props}
      style={{
        backgroundColor: theme.dark
          ? theme.colors.inputBackground
          : theme.colors.secondaryInputBackground,
        fontSize: 16,
        ...props.style,
      }}
    />
  );
};

export default MyComponent;
