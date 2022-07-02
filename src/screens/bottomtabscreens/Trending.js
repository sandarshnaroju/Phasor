import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {DataContextProvider} from '../../context/Context';
import {fetchTrendingVideos} from '../../network/Network';
import RecyclerList from '../../recyclerview/RecyclerView';
import Header from '../../ui/components/Header';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../../utils/Constants';
const HomeScreen = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();
  const [feed, setFeed] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const getData = () => {
    fetchTrendingVideos()
      .then(val => {
        setFeed(val);
        setRefresh(false);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getData();
  }, []);
  const onFeedClick = (index, stremableLink) => {
    props.navigation.navigate('VideoPlayer', {videoId: feed[index]['videoId']});
  };
  const onRefresh = () => {
    setRefresh(true);
    getData();
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
          theme={theme}
          onFeedClick={onFeedClick}
          dataType={DATA_TYPE.TRENDING_FEED}
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
