import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

const MyComponent = props => {
  const theme = props.theme;
  return (
    <Chip
      mode="outlined"
      style={{backgroundColor: theme.colors.background}}
      textStyle={styles.textStyle}
      selectedColor={theme.colors.primary}
      {...props}>
      {props.text}
    </Chip>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  textStyle: {fontFamily: 'Nunito-Bold'},
});
