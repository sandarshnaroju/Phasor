import * as React from 'react';
import {ProgressBar} from 'react-native-paper';

const MyComponent = props => {
  const theme = props.theme;
  return (
    <ProgressBar
      progress={props.progress}
      color={theme.colors.primary}
      style={{height: 3}}
      {...props}
    />
  );
};

export default MyComponent;
