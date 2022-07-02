import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPercentageHeight, getPercentageWidth} from '../../utils/Constants';
import Paragraph from '../atoms/typography/Paragraph';

const HomeScreen = ({index, data, onSuggestionClick, theme}) => {
  const onPress = () => {
    if (data != null && data !== '') {
      onSuggestionClick(index);
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.totalViewStyle}>
      {data != null && data !== '' && (
        <MaterialCommunityIcons
          name={'magnify'}
          color={theme.colors.text}
          size={getPercentageHeight(0.03)}
        />
      )}

      <Paragraph
        numberOfLines={1}
        style={[
          styles.suggestionNameTextStyle,
          {
            width: getPercentageWidth(0.7),
          },
        ]}
        text={data}
        theme={theme}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {},
  suggestionNameTextStyle: {textAlign: 'left', marginLeft: 20},
  totalViewStyle: {
    flexDirection: 'row',

    paddingHorizontal: 20,
    alignItems: 'center',
    height: 60,
  },
});

export default HomeScreen;
