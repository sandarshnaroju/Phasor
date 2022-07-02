import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPercentageWidth} from '../../utils/Constants';
import HorizontalGap from '../atoms/HorizontalGap';
import Title from '../atoms/typography/Title';
import {DataContextProvider} from '../../context/Context';
const Header = props => {
  const context = DataContextProvider();
  const theme = props.theme;

  return (
    <View
      style={[
        styles.mainViewStyle,
        {backgroundColor: theme.colors.background},
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons
          name={context.isNight ? 'white-balance-sunny' : 'weather-night'}
          color={context.isNight ? 'yellow' : theme.colors.text}
          size={25}
          onPress={() => {
            context.nightModePress();
          }}
        />

        <HorizontalGap width={10} />
        <Title
          theme={theme}
          style={{color: theme.colors.text}}
          text={'SimpleTube'}
        />
      </View>
      <MaterialCommunityIcons
        name="magnify"
        color={theme.colors.text}
        size={25}
        onPress={props.onSearchPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    height: 55,
    width: getPercentageWidth(1),
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    elevation: 4,
    marginBottom: 3,
  },
});

export default Header;
