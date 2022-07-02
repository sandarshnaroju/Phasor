import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import MyIcon from '../atoms/Icon';
import MySurface from '../atoms/Surface';
import MyTextInput from '../atoms/text-inputs/TextInput';
const MyComponent = props => {
  const theme = props.theme;

  return (
    <MySurface
      style={[
        styles.mySurfaceStyle,
        {
          // borderBottomColor: theme.colors.border,

          height: 55,
          backgroundColor: theme.colors.background,
          borderColor: 'red',
          borderWidth: 2,
        },
        props.style,
      ]}>
      {props.leftIcon && (
        <MyIcon
          icon={props.leftIcon}
          color={theme.colors.text}
          size={24}
          onPress={props.onLeftIconPress}
        />
      )}
      <View style={styles.innerViewStyle}>
        <MyTextInput
          theme={theme}
          label={props.placeHolder}
          style={[
            styles.textInputStyle,
            {
              backgroundColor: props.textInputBackGroundColor
                ? props.textInputBackGroundColor
                : theme.colors.primary,
              height: 55,
            },
          ]}
          onChangeText={props.onChangeText}
          value={props.defaultSearchValue}
          labelStyle={{color: 'white'}}
        />

        {props.rightIcon && (
          <MyIcon
            icon={props.rightIcon}
            color={theme.colors.text}
            size={24}
            onPress={props.onrightIconPress}
          />
        )}
      </View>
    </MySurface>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  mySurfaceStyle: {
    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 0.2,
  },

  innerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  textInputStyle: {flex: 1},
});
