import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Avatar from '../atoms/avatars/SimpleAvatar';
import Caption from '../atoms/typography/Caption';
import Paragraph from '../atoms/typography/Paragraph';
const {height, width} = Dimensions.get('window');
const Comments = ({index, data, onCommentCLick, theme}) => {
  const onPress = () => {
    onCommentCLick(index);
  };

  return (
    <View onPress={onPress} style={styles.commentViewStyle}>
      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        <Avatar
          theme={theme}
          imageSource={{
            uri:
              data.authorThumbnails != null && data.authorThumbnails.length > 0
                ? data.authorThumbnails[0]['url']
                : '',
          }}
          size={20}
          style={{borderRadius: 20}}
        />
        <Paragraph
          theme={theme}
          text={data.author}
          style={{fontSize: 14, marginLeft: 10, fontFamily: 'Nunito-Bold'}}
          numberOfLines={1}
        />
      </View>

      <Caption
        theme={theme}
        style={{paddingLeft: 25, color: theme.colors.text, fontSize: 15}}
        text={data.content}
        numberOfLines={2}
      />
    </View>
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
