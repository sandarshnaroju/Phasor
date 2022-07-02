import React, {useRef, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import VideoPlayerControls from './VideoPlayerControls';
const {height, width} = Dimensions.get('window');
const Player = props => {
  const resolutionIndexRef = useRef(
    props.videoInfo['formatStreams'].length - 1,
  );
  const [resolutionIndex, setResolutionIndex] = useState(
    resolutionIndexRef.current,
  );
  const currentTimeRef = useRef(0);
  const onResolutionChangePanelClick = currentTime => {
    EventRegister.emit('resolutions-panel', {
      resolutionsList: props.videoInfo['formatStreams'],
      showPanel: true,
      currentResolution:
        props.videoInfo['formatStreams'][resolutionIndex]['resolution'],
      currentTime,
    });
  };

  const onResolutionCHange = ({index, currentTime}) => {
    currentTimeRef.current = currentTime;
    resolutionIndexRef.current = index;
    setResolutionIndex(resolutionIndexRef.current);
  };
  useEffect(() => {
    const resolListener = EventRegister.addEventListener(
      'clicked-resolution',
      onResolutionCHange,
    );
    return () => {
      currentTimeRef.current = 0;
      EventRegister.removeEventListener(resolListener);
    };
  }, []);
  useEffect(() => {
    if (props.videoInfo != null) {
      currentTimeRef.current = 0;
    }
  }, [props.videoInfo]);

  return (
    <VideoPlayerControls
      source={{
        uri: props.videoInfo['formatStreams'][resolutionIndex]['url'],
      }}
      navigator={null}
      style={{
        height: props.isLandScape ? width : height * 0.4,
        width: props.isLandScape ? height : width,
      }}
      disableBack={true}
      controlTimeout={2000}
      disableVolume={true}
      onEnterFullscreen={props.onEnterFullscreen}
      onExitFullscreen={props.onExitFullscreen}
      toggleResizeModeOnFullscreen={false}
      onEnd={props.onEnd}
      tapAnywhereToPause={true}
      seekColor={'red'}
      onResolutionChangePanelClick={onResolutionChangePanelClick}
      defaultSeekTime={currentTimeRef.current}
    />
  );
};

export default Player;
