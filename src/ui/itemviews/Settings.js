import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPercentageHeight, getPercentageWidth} from '../../utils/Constants';
import Paragraph from '../atoms/typography/Paragraph';

const HomeScreen = props => {
  const onPress = () => {
    props.onFeedClick(props.index);
  };
  // console.log(props.data);

  return (
    <TouchableOpacity onPress={onPress} style={styles.totalViewStyle}>
      <View style={{width: getPercentageWidth(0.8)}}>
        <Paragraph
          numberOfLines={1}
          style={[styles.titleStyle]}
          text={props.data.title}
          theme={props.theme}
        />
        <Paragraph
          numberOfLines={1}
          style={[
            styles.subTitleStyle,
            {color: props.theme.dark ? 'silver' : 'grey'},
          ]}
          text={props.data.subTitle}
          theme={props.theme}
        />
      </View>

      {props.data != null && props.data.icon !== '' && (
        <MaterialCommunityIcons
          name={props.data.icon}
          color={
            props.data.icon == 'white-balance-sunny'
              ? 'yellow'
              : props.theme.colors.text
          }
          size={getPercentageHeight(0.03)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {},
  titleStyle: {textAlign: 'left', marginLeft: 10, fontSize: 18},
  subTitleStyle: {
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 14,
  },
  totalViewStyle: {
    flexDirection: 'row',

    paddingHorizontal: 10,
    alignItems: 'center',
    height: 60,
    borderBottomColor: 'grey',

    borderBottomWidth: 0.5,
  },
});

export default HomeScreen;
