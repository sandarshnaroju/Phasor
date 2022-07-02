import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {DataContextProvider} from '../context/Context';
import {fetchVideosByText} from '../network/Network';
import RecyclerList from '../recyclerview/RecyclerView';
import SearchBar from '../ui/atoms/SearchBar';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../utils/Constants';
const HomeScreen = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();
  const [feed, setFeed] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const getData = text => {
    fetchVideosByText(text)
      .then(val => {
        setFeed(val);
        setRefresh(false);
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (
      props.route != null &&
      props.route.params != null &&
      props.route.params.searchTerm != null
    ) {
      getData(props.route.params.searchTerm);
      setSearchTerm(props.route.params.searchTerm);
      props.route.params.searchTerm = null;
    }
  }, [props.route]);
  const onFeedClick = index => {
    console.log(index);
    props.navigation.navigate('VideoPlayer', {videoId: feed[index]['videoId']});
  };
  const onRefresh = () => {
    setRefresh(true);
    getData();
  };
  const onSearchBarTouch = () => {
    props.navigation.goBack();
    props.route.params.onCallBack(searchTerm);
  };
  const onTextChange = () => {};
  const onBackPress = () => {
    props.navigation.goBack();
    props.route.params.onCallBack(searchTerm);
  };
  const onSubmitEditing = () => {};
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
      <SearchBar
        theme={theme}
        placeholder={'Search Youtube'}
        onChangeText={onTextChange}
        value={searchTerm}
        icon={'arrow-left'}
        onIconPress={onBackPress}
        style={[
          styles.searchBarStyle,
          {
            backgroundColor: theme.dark
              ? theme.colors.inputBackground
              : theme.colors.secondaryInputBackground,
          },
        ]}
        inputStyle={[
          styles.searchBarInputStyle,
          {
            backgroundColor: theme.dark
              ? theme.colors.inputBackground
              : theme.colors.secondaryInputBackground,
          },
        ]}
        returnKeyType={'search'}
        onSubmitEditing={onSubmitEditing}
        onTouchStart={onSearchBarTouch}
      />
      {renderLoaderOrData()}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  searchBarStyle: {
    height: 50,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarInputStyle: {
    fontSize: 14,
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    fontFamily: 'Nunito-Regular',
  },
  activityIndicatorViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
