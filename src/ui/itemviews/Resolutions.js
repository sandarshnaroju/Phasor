import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Paragraph from '../atoms/typography/Paragraph';
const {width} = Dimensions.get('window');
const Comments = ({index, data, onClick, theme}) => {
  const onPress = () => {
    onClick(index);
  };

  return (
    <Paragraph
      theme={theme}
      text={data.resolution}
      style={{
        fontSize: 18,
        paddingHorizontal: 50,
        paddingVertical: 10,
        fontFamily: 'Nunito-Bold',

        height: 60,
        textAlignVertical: 'center',
      }}
      numberOfLines={1}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {},
  commentViewStyle: {
    height: 100,
    width: width,
    paddingHorizontal: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.6,
  },
});

export default Comments;
