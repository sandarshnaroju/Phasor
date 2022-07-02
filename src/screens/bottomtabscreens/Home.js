import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {DataContextProvider} from '../../context/Context';
// import {useTheme} from 'react-native-paper';
import {fetchPopularVideos, parseYoutubeHomePage} from '../../network/Network';
import RecyclerList from '../../recyclerview/RecyclerView';
import Header from '../../ui/components/Header';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
  getYoutubeDataObject,
  HOME_FEED_TYPE,
  removeSectionRender,
} from '../../utils/Constants';

const HomeScreen = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();

  const [feed, setFeed] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [renderedFeedType, setRenderedFeedType] = useState(
    HOME_FEED_TYPE.PARSED,
  );

  const getData = () => {
    fetchPopularVideos()
      .then(val => {
        setFeed(val);
        setRefresh(false);
        setRenderedFeedType(HOME_FEED_TYPE.INVIDIOUS);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getYoutubeData = () => {
    parseYoutubeHomePage()
      .then(val => {
        const dataObject = getYoutubeDataObject(val);
        if (
          dataObject != null &&
          dataObject.contents != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0] != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0]
            .tabRenderer != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
            .content != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
            .content.richGridRenderer != null &&
          dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
            .content.richGridRenderer.contents != null
        ) {
          // console.log(
          //   ' length',
          //   dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0]
          //     .tabRenderer.content.richGridRenderer.contents.length,
          // );

          setFeed(
            removeSectionRender(
              dataObject.contents.twoColumnBrowseResultsRenderer.tabs[0]
                .tabRenderer.content.richGridRenderer.contents,
            ),
          );
          setRefresh(false);
          setRenderedFeedType(HOME_FEED_TYPE.PARSED);
        } else {
          getData();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    // getData();
    getYoutubeData();
  }, []);
  const onFeedClick = index => {
    if (renderedFeedType == HOME_FEED_TYPE.INVIDIOUS) {
      props.navigation.navigate('VideoPlayer', {
        videoId: feed[index]['videoId'],
      });
    } else {
      const data = feed[index];
      if (
        data.richItemRenderer != null &&
        data.richItemRenderer.content != null &&
        data.richItemRenderer.content.videoRenderer != null &&
        data.richItemRenderer.content.videoRenderer.videoId != null
      ) {
        props.navigation.navigate('VideoPlayer', {
          videoId: data.richItemRenderer.content.videoRenderer.videoId,
        });
      }
      //data.richItemRenderer.content.videoRenderer
    }
  };
  const onRefresh = () => {
    setRefresh(true);
    // getData();
    getYoutubeData();
  };
  const onSearchPress = () => {
    props.navigation.navigate('SearchSuggestions');
  };

  const renderLoaderOrData = () => {
    if (refresh) {
      return (
        <View
          style={[
            styles.activityIndicatorViewStyle,
            {backgroundColor: theme.colors.background},
          ]}>
          <ActivityIndicator color={'red'} size={20} />
        </View>
      );
    } else {
      return (
        <RecyclerList
          data={feed != null && feed.length > 0 ? feed : [{}]}
          onFeedClick={onFeedClick}
          theme={theme}
          dataType={
            renderedFeedType == HOME_FEED_TYPE.PARSED
              ? DATA_TYPE.PARSED_FEED
              : DATA_TYPE.TRENDING_FEED
          }
          contentContainerStyle={{
            paddingBottom: 400,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={['blue', 'red']}
            />
          }
        />
      );
    }
  };

  return (
    <View
      style={{
        height: getPercentageHeight(1),
        width: getPercentageWidth(1),
        backgroundColor: theme.colors.background,
      }}>
      <Header theme={theme} onSearchPress={onSearchPress} />
      {renderLoaderOrData()}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
