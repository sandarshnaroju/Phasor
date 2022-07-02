import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

const MyComponent = (props) => {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      action={{
        label: props.label,
        onPress: props.onLabelPress,
      }}>
      {props.text}
    </Snackbar>
  );
};

const styles = StyleSheet.create({});

export default MyComponent;
