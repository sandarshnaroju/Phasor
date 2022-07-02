import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {EventRegister} from 'react-native-event-listeners';
import {DataContextProvider} from '../context/Context';
import {readSubscription, storeSubscriptions} from '../database/Database';
import {fetchVideoCommentsById, fetchVideoInfoById} from '../network/Network';
import RecyclerList from '../recyclerview/RecyclerView';
import Avatar from '../ui/atoms/avatars/SimpleAvatar';
// import BottomSwipeableInfo from '../ui/atoms/BottomSwipeableInfo';
// import BottomSwipeableComments from '../ui/atoms/BottomSwipeableComments';
import Button from '../ui/atoms/Button';
import MyIcon from '../ui/atoms/Icon';
import Caption from '../ui/atoms/typography/Caption';
import Paragraph from '../ui/atoms/typography/Paragraph';
import SubHeading from '../ui/atoms/typography/SubHeading';
import VerticalGap from '../ui/atoms/VerticalGap';
import VideoPlayer from '../ui/components/Player';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
  nFormatter,
  PANEL_INFO,
} from '../utils/Constants';
const {height, width} = Dimensions.get('window');

const VideoPlayerScreen = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();
  const [videoInfo, setVideoInfo] = useState(null);
  const [commentsInfo, setCommentsInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [subscribedChannels, setSubscribedChannels] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isLandScapeRef = useRef(false);
  const [isLandScape, setIsLandScape] = useState(isLandScapeRef.current);
  const deviceOrientationRef = useRef(null);
  const isInfoPanelActiveRef = useRef(null);
  const [isInfoPanelActive, setIsInfoPanelActive] = useState(
    isInfoPanelActiveRef.current,
  );
  const videoPlayerRef = useRef(null);
  const getVideoInfo = id => {
    fetchVideoInfoById(id)
      .then(data => {
        setVideoInfo(data);
        setIsLoading(false);
        // console.log('sss', data['formatStreams'][0]['resolution']);
      })
      .catch(e => {
        console.log('indo', e);
      });
  };
  const loadSubbedChannels = () => {
    readSubscription()
      .then(val => {
        if (val != null) {
          const parsed = JSON.parse(val);

          setSubscribedChannels(parsed);
          const subscriptionStatus = parsed.find(
            authId => authId == videoInfo.authorId,
          );
          setIsSubscribed(subscriptionStatus != null ? true : false);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (videoInfo != null) {
      loadSubbedChannels();
    }
  }, [videoInfo]);
  const onOrientationChange = orientation => {
    console.log('chnagee', orientation);

    deviceOrientationRef.current = orientation;
  };
  const onDeviceChange = orientation => {
    deviceOrientationRef.current = orientation;
  };
  const onExitFullscreen = () => {
    isLandScapeRef.current = false;
    setIsLandScape(isLandScapeRef.current);
    Orientation.lockToPortrait();
  };
  const onEnterFullscreen = () => {
    isLandScapeRef.current = true;
    setIsLandScape(isLandScapeRef.current);

    switch (deviceOrientationRef.current) {
      case 'PORTRAIT':
        Orientation.lockToLandscapeLeft();
        break;
      case 'LANDSCAPE-LEFT':
        Orientation.lockToLandscapeLeft();
        break;
      case 'LANDSCAPE-RIGHT':
        Orientation.lockToLandscapeRight();
        break;
      case 'PORTRAIT-UPSIDEDOWN':
        Orientation.lockToLandscapeLeft();
        break;
      default:
        Orientation.lockToLandscapeLeft();
        break;
    }
  };
  const getCurrentOrientation = deviceOrientation => {
    deviceOrientationRef.current = deviceOrientation;
  };
  const onBackPress = () => {
    if (isLandScapeRef.current) {
      isLandScapeRef.current = false;
      setIsLandScape(isLandScapeRef.current);
      Orientation.lockToPortrait();
      return true;
    } else if (isInfoPanelActiveRef.current == PANEL_INFO.COMMENTS) {
      isInfoPanelActiveRef.current = null;
      EventRegister.emit('comments-panel', {
        id: '',
        commentsList: [{}],
        showPanel: false,
      });
      isInfoPanelActiveRef.current = null;
      return true;
    } else if (isInfoPanelActiveRef.current == PANEL_INFO.DESCRIPTION) {
      EventRegister.emit('description-panel', {
        titleText: '',
        descriptionText: '',
        showPanel: false,
      });
      isInfoPanelActiveRef.current = null;
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    Orientation.getOrientation(getCurrentOrientation);
    Orientation.addOrientationListener(onOrientationChange);
    Orientation.addDeviceOrientationListener(onDeviceChange);
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      Orientation.removeOrientationListener(onOrientationChange);
      Orientation.removeDeviceOrientationListener(onDeviceChange);
      Orientation.lockToPortrait();
    };
  }, []);
  const getVideoComments = id => {
    fetchVideoCommentsById(id)
      .then(data => {
        setCommentsInfo(data);
        // console.log(' comments success', data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (
      props.route != null &&
      props.route.params != null &&
      props.route.params.videoId != null
    ) {
      getVideoInfo(props.route.params.videoId);
      getVideoComments(props.route.params.videoId);

      setIsLoading(true);

      props.route.params.videoId = null;
    }
  }, [props.route]);

  const onSubscribePress = () => {
    let subbed = [];
    if (subscribedChannels != null) {
      if (isSubscribed) {
        const indexOfChannel = subscribedChannels.findIndex(
          authId => authId == videoInfo.authorId,
        );

        const updatedChannels = [
          ...subscribedChannels.slice(0, indexOfChannel),
          ...subscribedChannels.slice(
            indexOfChannel + 1,
            subscribedChannels.length + 1,
          ),
        ];
        setIsSubscribed(false);
        setSubscribedChannels(updatedChannels);
        subbed = updatedChannels;
      } else {
        subbed = [...subscribedChannels, videoInfo.authorId];
        setIsSubscribed(true);
      }
    } else {
      subbed = [videoInfo.authorId];
      setIsSubscribed(true);
    }
    storeSubscriptions(JSON.stringify(subbed))
      .then(val => {})
      .catch(() => {});
  };
  const onFeedClick = index => {
    if (
      videoInfo.recommendedVideos != null &&
      videoInfo.recommendedVideos.length > 0
    ) {
      const tempVideoInfo = videoInfo;
      setVideoInfo(null);
      props.navigation.navigate('VideoPlayer', {
        videoId: tempVideoInfo.recommendedVideos[index - 2]['videoId'],
      });
    }
  };
  const onVideoNamePress = () => {
    isInfoPanelActiveRef.current = PANEL_INFO.DESCRIPTION;
    //setIsInfoPanelActive(isInfoPanelActiveRef.current);
    //description-panel
    EventRegister.emit('description-panel', {
      titleText: videoInfo.title,
      descriptionText: videoInfo.description,
      showPanel: true,
    });
  };
  const onCommentViewPress = () => {
    isInfoPanelActiveRef.current = PANEL_INFO.COMMENTS;
    // setIsInfoPanelActive(isInfoPanelActiveRef.current);
    EventRegister.emit('comments-panel', {
      id: '',
      commentsList:
        commentsInfo != null && commentsInfo.comments != null
          ? commentsInfo.comments
          : [{}],
      showPanel: true,
    });
  };
  const onVideoEndReached = () => {
    // if (
    //   videoInfo.recommendedVideos != null &&
    //   videoInfo.recommendedVideos.length > 0
    // ) {
    //   props.navigation.navigate('VideoPlayer', {
    //     videoId: videoInfo.recommendedVideos[0]['videoId'],
    //   });
    // }
  };

  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         height: getPercentageHeight(1),
  //         width: getPercentageWidth(1),
  //         justifyContent: 'center',
  //         // backgroundColor: theme.colors.background,
  //         backgroundColor: 'red',
  //       }}>
  //       <ActivityIndicator
  //         animating={true}
  //         color={'#0066a7'}
  //         style={{alignSelf: 'center'}}
  //       />
  //     </View>
  //   );
  // }

  const zeroIndexData = () => {
    return (
      <View
        style={[
          styles.mainViewStyle,
          {
            height: isLandScape ? width : height * 0.4,
            width: isLandScape ? height : width,
          },
        ]}>
        {videoInfo != null &&
        videoInfo['formatStreams'] != null &&
        videoInfo['formatStreams'].length > 0 ? (
          <VideoPlayer
            videoInfo={videoInfo}
            isLandScape={isLandScape}
            onEnterFullscreen={onEnterFullscreen}
            onExitFullscreen={onExitFullscreen}
            onEnd={onVideoEndReached}
          />
        ) : (
          <ActivityIndicator
            animating={true}
            color={'white'}
            style={{alignSelf: 'center'}}
            size={30}
          />
        )}
      </View>
    );
  };

  const firstIndexData = () => {
    return (
      videoInfo != null && (
        <View
          style={[
            styles.firstIndexDataViewStyle,
            {backgroundColor: theme.colors.background},
          ]}>
          <View style={styles.videoNameAndInfoStyle}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={onVideoNamePress}>
              <Paragraph
                theme={theme}
                text={videoInfo['title']}
                numberOfLines={2}
                style={{width: getPercentageWidth(1) - 60}}
              />

              <MyIcon
                icon={'chevron-down'}
                color={theme.colors.text}
                size={25}
              />
            </TouchableOpacity>

            <View style={styles.videoStatsStyle}>
              <Caption
                theme={theme}
                text={nFormatter(parseFloat(videoInfo['viewCount'])) + ' views'}
              />
              <Caption theme={theme} text={videoInfo['publishedText']} />
              <Caption
                theme={theme}
                text={nFormatter(parseFloat(videoInfo['likeCount'])) + ' likes'}
              />
            </View>
          </View>
          <View style={styles.subscriptionBarStyle}>
            <Avatar
              theme={theme}
              imageSource={{
                uri:
                  videoInfo.authorThumbnails != null &&
                  videoInfo.authorThumbnails.length > 0
                    ? videoInfo.authorThumbnails[0]['url']
                    : '',
              }}
              size={40}
              style={{borderRadius: 20}}
            />
            <View style={styles.subNameAndFollowerCountStyle}>
              <SubHeading
                theme={theme}
                text={videoInfo.author}
                numberOfLines={1}
              />
              <VerticalGap height={5} />
              <Caption theme={theme} text={videoInfo.subCountText + ' likes'} />
            </View>
            <Button
              theme={theme}
              title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              color={'#fe2712'}
              mode={isSubscribed ? 'outline' : 'contained'}
              style={styles.subscribeButtonStyle}
              onPress={onSubscribePress}
            />
          </View>

          <TouchableOpacity
            onPress={onCommentViewPress}
            style={styles.firstCommentViewStyle}>
            <Paragraph
              theme={theme}
              text={
                commentsInfo != null && commentsInfo.commentCount != null
                  ? 'Comments - ' + commentsInfo.commentCount
                  : 'Tap to load'
              }
              numberOfLines={1}
            />
            <View style={styles.commentLogoAndTextStyle}>
              <Avatar
                theme={theme}
                imageSource={{
                  uri:
                    commentsInfo != null &&
                    commentsInfo.comments != null &&
                    commentsInfo.comments[0] != null &&
                    commentsInfo.comments[0].authorThumbnails != null &&
                    commentsInfo.comments[0].authorThumbnails.length > 0
                      ? commentsInfo.comments[0].authorThumbnails[0]['url']
                      : '',
                }}
                size={30}
                style={{borderRadius: 20}}
              />

              <Caption
                theme={theme}
                text={
                  commentsInfo != null &&
                  commentsInfo.comments != null &&
                  commentsInfo.comments[0] != null
                    ? commentsInfo.comments[0].content
                    : ''
                }
                numberOfLines={2}
                style={styles.commentTextStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
      )
    );
  };
  const getRecyclerViewData = () => {
    if (videoInfo != null) {
      if (
        videoInfo.recommendedVideos != null &&
        videoInfo.recommendedVideos.length > 0
      ) {
        return [zeroIndexData, firstIndexData, ...videoInfo.recommendedVideos];
      } else {
        return [zeroIndexData, firstIndexData];
      }
    } else {
      return [zeroIndexData];
    }
  };

  return (
    <View
      style={{
        height: getPercentageHeight(1),
        width: getPercentageWidth(1),
        backgroundColor: theme.colors.background,
      }}>
      <RecyclerList
        data={getRecyclerViewData()}
        onFeedClick={onFeedClick}
        theme={theme}
        dataType={DATA_TYPE.RECOMMENDED_FEED}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        stickyItemViewIndexes={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    justifyContent: 'center',

    backgroundColor: 'black',
    flex: 1,
  },
  fullScreenViewStyle: {
    justifyContent: 'center',

    backgroundColor: 'black',
    height: width,
    width: height,
  },

  subscriptionBarStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,

    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  },
  subNameAndFollowerCountStyle: {
    marginLeft: 20,

    height: 60,

    justifyContent: 'center',
    flex: 1,
  },
  subscribeButtonStyle: {height: 45, justifyContent: 'center'},
  firstIndexDataViewStyle: {
    paddingHorizontal: 10,

    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  videoNameAndInfoStyle: {
    height: 70,

    paddingTop: 10,
  },
  videoStatsStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  firstCommentViewStyle: {
    height: 85,
    width: width,

    paddingVertical: 10,
  },
  commentLogoAndTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  commentTextStyle: {
    fontSize: 13,
    width: getPercentageWidth(1) - 80,
    marginLeft: 15,
  },
});

export default VideoPlayerScreen;
