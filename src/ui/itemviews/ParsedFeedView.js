import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Caption from '../atoms/typography/Caption';
import Paragraph from '../atoms/typography/Paragraph';
import SubHeading from '../atoms/typography/SubHeading';

const {width} = Dimensions.get('window');
const HomeScreen = ({index, data, onClick, theme}) => {
  const onPress = () => {
    onClick(index);
  };
  const thumbnail =
    data != null &&
    data.richItemRenderer != null &&
    data.richItemRenderer.content != null &&
    data.richItemRenderer.content.videoRenderer != null &&
    data.richItemRenderer.content.videoRenderer.thumbnail != null &&
    data.richItemRenderer.content.videoRenderer.thumbnail.thumbnails != null &&
    data.richItemRenderer.content.videoRenderer.thumbnail.thumbnails.length > 0
      ? data.richItemRenderer.content.videoRenderer.thumbnail.thumbnails
      : null;
  const videoTitle =
    data != null &&
    data.richItemRenderer != null &&
    data.richItemRenderer.content != null &&
    data.richItemRenderer.content.videoRenderer != null &&
    data.richItemRenderer.content.videoRenderer.title != null &&
    data.richItemRenderer.content.videoRenderer.title.runs != null &&
    data.richItemRenderer.content.videoRenderer.title.runs[0] != null &&
    data.richItemRenderer.content.videoRenderer.title.runs[0].text != null
      ? data.richItemRenderer.content.videoRenderer.title.runs[0].text
      : '';
  const channelOwnerName =
    data != null &&
    data.richItemRenderer != null &&
    data.richItemRenderer.content != null &&
    data.richItemRenderer.content.videoRenderer != null &&
    data.richItemRenderer.content.videoRenderer.ownerText != null &&
    data.richItemRenderer.content.videoRenderer.ownerText.runs != null &&
    data.richItemRenderer.content.videoRenderer.ownerText.runs[0] != null &&
    data.richItemRenderer.content.videoRenderer.ownerText.runs[0].text != null
      ? data.richItemRenderer.content.videoRenderer.ownerText.runs[0].text
      : '';
  const videoViewCount =
    data != null &&
    data.richItemRenderer != null &&
    data.richItemRenderer.content != null &&
    data.richItemRenderer.content.videoRenderer != null &&
    data.richItemRenderer.content.videoRenderer.viewCountText != null &&
    typeof data.richItemRenderer.content.videoRenderer.viewCountText ===
      'object'
      ? data.richItemRenderer.content.videoRenderer.viewCountText.simpleText !=
        null
        ? data.richItemRenderer.content.videoRenderer.viewCountText.simpleText
        : data.richItemRenderer.content.videoRenderer.viewCountText.runs !=
            null &&
          data.richItemRenderer.content.videoRenderer.viewCountText.runs[0] !=
            null &&
          data.richItemRenderer.content.videoRenderer.viewCountText.runs[0]
            .text != null
        ? data.richItemRenderer.content.videoRenderer.viewCountText.runs[0]
            .text + ' watching'
        : ''
      : '';
  // if (index == 9) {
  //   console.log(
  //     'anom',
  //     Object.keys(data.richItemRenderer.content.videoRenderer.viewCountText),
  //     data.richItemRenderer.content.videoRenderer.viewCountText,
  //   );
  // }
  // if (index == 8) {
  //   console.log(
  //     'gen',
  //     Object.keys(data.richItemRenderer.content.videoRenderer.viewCountText),
  //     data.richItemRenderer.content.videoRenderer.viewCountText,
  //   );
  // }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.touchableOpacityStyle,
        {backgroundColor: theme.colors.background},
      ]}>
      {thumbnail != null &&
        thumbnail[0] != null &&
        thumbnail[0]['url'] != null && (
          <Image
            source={{uri: thumbnail[0]['url']}}
            style={styles.imageStyle}
          />
        )}
      <View
        style={[
          styles.videoInfoStyle,
          {backgroundColor: theme.colors.background},
        ]}>
        <Paragraph theme={theme} text={videoTitle} numberOfLines={2} />

        <View style={styles.subTextViewStyle}>
          <SubHeading
            theme={theme}
            text={channelOwnerName}
            style={{color: 'grey', fontFamily: 'Nunito-Black'}}
            numberOfLines={1}
          />
          <Caption theme={theme} text={videoViewCount} numberOfLines={1} />
        </View>
      </View>
      {/* <Caption
        theme={theme}
        style={styles.videoTotalTimeTextStyle}
        text={secondsToHms(data.lengthSeconds)}
        numberOfLines={1}
      /> */}
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
