import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {SwipeablePanel} from 'rn-swipeable-panel';
import RecyclerList from '../../recyclerview/RecyclerView';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../../utils/Constants';
import MyTitle from '../atoms/typography/Title';
export default function BottomSwipeablePanel(props) {
  const [isActive, setIsActive] = useState(false);
  const [vidId, setVidId] = useState(null);
  const [comments, setComments] = useState(null);

  const onCommentCLick = () => {};
  const onBottomPanelActive = ({id, commentsList, showPanel}) => {
    setIsActive(showPanel);
    setVidId(id);
    setComments(commentsList);
  };
  const closePanel = () => {
    setIsActive(false);
    setVidId('');
    setComments([]);
  };

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      'comments-panel',
      onBottomPanelActive,
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);
  const onCommentsScrollEndReached = () => {};

  return (
    <SwipeablePanel
      isActive={isActive}
      openLarge={true}
      closeOnTouchOutside={true}
      showCloseButton={false}
      onClose={closePanel}
      noBar={true}
      style={[
        styles.swipeablePanelStyle,
        {
          backgroundColor: props.theme.colors.background,
          width: getPercentageWidth(1),
          height: getPercentageHeight(0.6),
        },
      ]}
      barStyle={styles.barStyle}
      scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
      closeIconStyle={{backgroundColor: props.theme.colors.background}}>
      <View>
        <MyTitle
          text={'Comments'}
          style={[styles.textStyle, {color: props.theme.colors.text}]}
        />

        <View
          style={{
            height: getPercentageHeight(0.6) - 80,
            width: getPercentageWidth(1),
            justifyContent: 'center',
          }}>
          {comments != null && comments.length > 0 ? (
            <RecyclerList
              data={comments}
              onCommentCLick={onCommentCLick}
              theme={props.theme}
              dataType={DATA_TYPE.COMMENTS}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              onEndReached={onCommentsScrollEndReached}
            />
          ) : (
            <ActivityIndicator
              animating={true}
              color={'#0066a7'}
              style={{alignSelf: 'center'}}
            />
          )}
        </View>
      </View>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  swipeablePanelStyle: {
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  titleStyle: {paddingHorizontal: 10},
  descriptionStyle: {
    paddingHorizontal: 10,
  },

  textStyle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    textAlignVertical: 'center',
    height: 40,
  },
  parsedTextStyle: {
    paddingHorizontal: 20,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
  contentContainerStyle: {
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  url: {
    // textDecorationLine: 'underline',
  },

  email: {
    // textDecorationLine: 'underline',
  },
  barStyle: {width: '50%'},
});
