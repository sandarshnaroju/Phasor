import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DataContextProvider} from '../context/Context';
import {fetchSearchSuggestions} from '../network/Network';
import RecyclerList from '../recyclerview/RecyclerView';
import SearchBar from '../ui/atoms/SearchBar';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../utils/Constants';

const SearchSuggestions = props => {
  const context = DataContextProvider();

  const theme = context.getTheme();
  const [feed, setFeed] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fetch = text => {
    fetchSearchSuggestions(text)
      .then(val => {
        setFeed(val.suggestions);
        setRefresh(false);
        // console.log('va', val);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (
      props.route != null &&
      props.route.params != null &&
      props.route.params.searchTerm != null
    ) {
      fetch(props.route.params.searchTerm);
      setSearchTerm(props.route.params.searchTerm);
    }
  }, [props.route]);

  const onCallBack = term => {
    fetch(term);
    setSearchTerm(term);
  };

  const onSuggestionClick = index => {
    console.log(index);

    props.navigation.push('SearchResults', {
      searchTerm: feed[index],
      onCallBack: onCallBack,
    });
  };
  const onRefresh = () => {
    setRefresh(true);
  };
  const onTextChange = text => {
    fetch(text);
    setSearchTerm(text);
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const onSubmitEditing = val => {
    props.navigation.push('SearchResults', {
      searchTerm: val['nativeEvent']['text'],
      onCallBack: onCallBack,
    });
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
        icon={'arrow-left'}
        onIconPress={onBackPress}
        style={[
          styles.searchBarStyle,
          {
            backgroundColor: theme.dark
              ? theme.colors.inputBackground
              : theme.colors.background,
          },
        ]}
        inputStyle={styles.searchBarInputStyle}
        returnKeyType={'search'}
        onSubmitEditing={onSubmitEditing}
        value={searchTerm}
        autoFocus={true}
      />
      <RecyclerList
        data={feed != null && feed.length > 0 ? feed : ['']}
        onSuggestionClick={onSuggestionClick}
        dataType={DATA_TYPE.SEARCH_SUGGESTIONS}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        theme={theme}
      />
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
  searchBarStyle: {height: 55},
  searchBarInputStyle: {fontSize: 15, fontFamily: 'Nunito-Regular'},
});

export default SearchSuggestions;
