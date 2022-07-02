import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {nFormatter, secondsToHms} from '../../utils/Constants';
import Caption from '../atoms/typography/Caption';
import Paragraph from '../atoms/typography/Paragraph';
import SubHeading from '../atoms/typography/SubHeading';

const {width} = Dimensions.get('window');
const HomeScreen = ({index, data, onClick, theme}) => {
  const onPress = () => {
    onClick(index);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.touchableOpacityStyle,
        {backgroundColor: theme.colors.background},
      ]}>
      {data != null &&
        data.videoThumbnails != null &&
        data.videoThumbnails[0] != null &&
        data.videoThumbnails[0]['url'] != null && (
          <Image
            source={{uri: data.videoThumbnails[0]['url']}}
            style={styles.imageStyle}
          />
        )}
      <View style={styles.videoInfoStyle}>
        <Paragraph theme={theme} text={data.title} numberOfLines={2} />

        <View style={styles.subTextViewStyle}>
          <SubHeading
            theme={theme}
            text={data.author}
            style={{color: 'grey', fontFamily: 'Nunito-Black'}}
            numberOfLines={1}
          />
          <Caption
            theme={theme}
            text={nFormatter(parseFloat(data.viewCount, 1)) + ' views'}
            numberOfLines={1}
          />
          <Caption theme={theme} text={data.publishedText} numberOfLines={1} />
        </View>
      </View>
      <Caption
        theme={theme}
        style={styles.videoTotalTimeTextStyle}
        text={secondsToHms(data.lengthSeconds)}
        numberOfLines={1}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {},
  subTextViewStyle: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoInfoStyle: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  touchableOpacityStyle: {
    height: 255,
    width: width,

    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    paddingHorizontal: 5,
  },
  imageStyle: {height: 180, width: width - 10},
  videoTotalTimeTextStyle: {
    position: 'absolute',
    top: 155,
    right: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'black',
    paddingHorizontal: 2,
  },
});

export default HomeScreen;
