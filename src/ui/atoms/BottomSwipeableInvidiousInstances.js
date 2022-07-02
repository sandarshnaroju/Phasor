import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {storeVidSource} from '../../database/Database';
import {getPercentageHeight, getPercentageWidth} from '../../utils/Constants';
import MyTitle from '../atoms/typography/Title';
import Paragraph from './typography/Paragraph';
import {setGlobalUrl} from '../../network/global';
const INVIDIOUS_INSTANCES = [
  'https://vid.puffyan.us',
  'https://inv.riverside.rocks',
  'https://invidious.osi.kr',
  'https://invidio.xamh.de',
];
export default function BottomSwipeablePanel(props) {
  const [isActive, setIsActive] = useState(false);

  const currentInstanceRef = useRef('');
  const [currentInstance, setCurrentInstance] = useState(
    currentInstanceRef.current,
  );

  const onBottomPanelActive = ({showPanel, currentInstanceUrl}) => {
    currentInstanceRef.current = currentInstanceUrl;
    setCurrentInstance(currentInstanceRef.current);
    setIsActive(showPanel);
  };
  const closePanel = () => {
    setIsActive(false);
    currentInstanceRef.current = '';
    setCurrentInstance(currentInstanceRef.current);
  };

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      'invidious-instances-panel',
      onBottomPanelActive,
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);
  const onInstancePress = ins => {
    storeVidSource(ins);

    setCurrentInstance(ins);
    setGlobalUrl(ins);
    EventRegister.emit('settings-load', true);
    closePanel();
  };
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
          text={'Select Instance'}
          style={[styles.textStyle, {color: props.theme.colors.text}]}
        />
        {INVIDIOUS_INSTANCES.map((ins, inde) => (
          <Paragraph
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              color: ins == currentInstance ? 'green' : 'grey',
            }}
            text={ins}
            key={ins + inde}
            theme={props.theme}
            onPress={() => {
              onInstancePress(ins);
            }}
          />
        ))}
        {/* <View
          style={{
            height: getPercentageHeight(0.6) - 80,
            width: getPercentageWidth(1),
            justifyContent: 'center',
          }}>
          <RecyclerList
            data={INVIDIOUS_INSTANCES}
            onResolutionClick={onResolutionCLick}
            theme={props.theme}
            dataType={DATA_TYPE.VIDEO_RESOLUTIONS}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        </View> */}
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
