import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {DataContextProvider} from '../../context/Context';
import {getVideosOfSubscribedChannels} from '../../network/Network';
import RecyclerList from '../../recyclerview/RecyclerView';
import Paragraph from '../../ui/atoms/typography/Paragraph';
import Header from '../../ui/components/Header';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../../utils/Constants';
const Subscriptions = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();
  const [feed, setFeed] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const getData = () => {
    getVideosOfSubscribedChannels()
      .then(val => {
        // console.log('sucess', val.length, val[0]['published']);
        if (val != null && val.length > 0) {
          setFeed(val.sort((a, b) => b.published - a.published));
        } else {
          setFeed([]);
        }
        setRefresh(false);
      })
      .catch(e => {
        console.log(e);
        setRefresh(false);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const onFeedClick = index => {
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
        <View style={styles.viewStyle}>
          <ActivityIndicator color={'red'} size={20} />
        </View>
      );
    } else if (feed != null && feed.length > 0) {
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
    } else {
      return (
        <View style={styles.viewStyle}>
          <Paragraph
            text={'Subscribe channels to see videos here'}
            theme={theme}
            style={{marginHorizontal: 30}}
          />
        </View>
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
  viewStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Subscriptions;
