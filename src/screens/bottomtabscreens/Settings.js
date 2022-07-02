import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  // RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {DataContextProvider} from '../../context/Context';
import {getVidSource} from '../../database/Database';
import {getGlobalUrl} from '../../network/global';
import RecyclerList from '../../recyclerview/RecyclerView';
import Header from '../../ui/components/Header';
import {
  DATA_TYPE,
  getPercentageHeight,
  getPercentageWidth,
} from '../../utils/Constants';
const MAIN_URL = 'https://vid.puffyan.us';
const SavedVideos = props => {
  const context = DataContextProvider();
  const theme = context.getTheme();
  const [source, setSource] = useState(getGlobalUrl());
  //const [resolution, setResolution] = useState('');
  const onSearchPress = () => {
    props.navigation.navigate('SearchSuggestions');
  };
  //  context.nightModePress();
  const updateInstance = () => {
    getVidSource()
      .then(val => {
        if (val != null && typeof val == 'string') {
          setSource(val);
        } else {
          setSource(MAIN_URL);
        }
      })
      .catch(() => {
        setSource(MAIN_URL);
      });
  };
  useEffect(() => {
    const instanceListener = EventRegister.addEventListener(
      'settings-load',
      () => {
        updateInstance();
      },
    );
    return () => {
      EventRegister.removeEventListener(instanceListener);
    };
  }, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     updateInstance();

  //     return () => {};
  //   }, []),
  // );

  const SETTINGS_OPTIONS = [
    {
      title: 'Theme',
      subTitle: theme.dark ? 'Day mode' : 'Night mode',
      icon: theme.dark ? 'white-balance-sunny' : 'weather-night',
    },

    {
      title: 'Invidious Instance',
      subTitle: source,
      icon: 'server',
    },
    // {
    //   title: 'Video resolution',
    //   subTitle: resolution,
    //   icon: 'tune',
    // },
  ];
  const onSettingClick = index => {
    switch (index) {
      case 0:
        context.nightModePress();
        break;
      case 1:
        EventRegister.emit('invidious-instances-panel', {
          showPanel: true,
          currentInstanceUrl: source,
        });
        break;
      default:
        break;
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

      {/* <Paragraph
        text={'Work in progress'}
        theme={theme}
        style={{marginHorizontal: 30}}
      /> */}

      <RecyclerList
        data={SETTINGS_OPTIONS}
        onFeedClick={onSettingClick}
        theme={theme}
        dataType={DATA_TYPE.SETTINGS}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedVideos;
