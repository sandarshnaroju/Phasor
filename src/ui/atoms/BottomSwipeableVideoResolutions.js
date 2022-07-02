import React, {useEffect, useState, useRef} from 'react';
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
  const [currentResol, setCurrentResol] = useState('');
  const [resolutions, setResolutions] = useState(null);
  const currentTimeRef = useRef(null);
  const onResolutionCLick = index => {
    EventRegister.emit('clicked-resolution', {
      index,
      currentTime: currentTimeRef.current,
    });
    setCurrentResol(resolutions[index]['resolution']);
    closePanel();
  };
  const onBottomPanelActive = ({
    id,
    resolutionsList,
    showPanel,
    currentResolution,
    currentTime,
  }) => {
    setResolutions(resolutionsList);
    // console.log('list', resolutionsList.length);
    setCurrentResol(currentResolution);
    currentTimeRef.current = currentTime;
    setIsActive(showPanel);
  };
  const closePanel = () => {
    setIsActive(false);
    setCurrentResol('');
    setResolutions([]);
  };

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      'resolutions-panel',
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
      <View>
        <MyTitle
          text={'Quality for current video : ' + currentResol}
          style={[styles.textStyle, {color: props.theme.colors.text}]}
        />

        <View
          style={{
            height: getPercentageHeight(0.6) - 80,
            width: getPercentageWidth(1),
            justifyContent: 'center',
          }}>
          {resolutions != null && resolutions.length > 0 ? (
            <RecyclerList
              data={resolutions}
              onResolutionClick={onResolutionCLick}
              theme={props.theme}
              dataType={DATA_TYPE.VIDEO_RESOLUTIONS}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
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
