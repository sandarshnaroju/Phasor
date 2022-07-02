import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {EventRegister} from 'react-native-event-listeners';
import {getPercentageHeight, getPercentageWidth} from '../../utils/Constants';
import Paragraph from '../atoms/typography/Paragraph';
import MyTitle from '../atoms/typography/Title';
import MyVerticalGap from '../atoms/VerticalGap';
export default function BottomSwipeablePanel(props) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onBottomPanelActive = ({titleText, descriptionText, showPanel}) => {
    setDescription(descriptionText);
    setTitle(titleText);
    setIsActive(showPanel);
  };
  const closePanel = () => {
    setIsActive(false);
    setDescription('');
    setTitle('');
  };
  useEffect(() => {
    const listener = EventRegister.addEventListener(
      'description-panel',
      onBottomPanelActive,
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);
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
      <MyTitle
        text={'Description'}
        style={[
          styles.textStyle,
          {color: props.theme.colors.text, width: getPercentageWidth(1)},
        ]}
      />
      <View style={{marginTop: 40}}>
        <MyTitle
          text={title}
          style={[styles.titleStyle, {color: props.theme.colors.text}]}
        />

        <MyVerticalGap height={10} />

        <Paragraph
          theme={props.theme}
          text={description}
          style={[styles.descriptionStyle, {color: props.theme.colors.text}]}
        />
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
    position: 'absolute',
    top: 0,
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
