import React, {useContext, useEffect, useRef, useState} from 'react';
import {DefaultTheme} from 'react-native-paper';
import {getIsNight, getVidSource, storeIsNight} from '../database/Database';
import {setGlobalUrl} from '../network/global';
import BottomSwipeableComments from '../ui/atoms/BottomSwipeableComments';
import BottomSwipeableInfo from '../ui/atoms/BottomSwipeableInfo';
import BottomSwipeableInvidiousInstances from '../ui/atoms/BottomSwipeableInvidiousInstances';
import BottomSwipeableVideoResolutions from '../ui/atoms/BottomSwipeableVideoResolutions';
export const KeyEventContext = React.createContext('DEFAULT');
const US_URL = 'https://vid.puffyan.us';

export function DataContextProvider() {
  return useContext(KeyEventContext);
}
const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066a7',
    background: 'white',
    inputBackground: '#e7e7e7',
    text: 'black',
    border: 'silver',
    darkCharcoal: '#333333',

    avatarBackground: 'grey',
    suggestionsText: '#222222',
    secondaryInputBackground: '#f1f3f4',
    secondaryDarkText: '#4f4f4f',
    errorBackGround: '#DC3545',

    greyishwhite: '#f0f0f0',
    semiPrimary: '#FF0000',
  },
};

const MyDarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00bbf9',
    background: '#141b29',
    inputBackground: '#334366',
    text: '#ffffff',
    border: 'silver',
    darkCharcoal: 'grey',

    avatarBackground: 'grey',
    suggestionsText: '#222222',
    secondaryInputBackground: '#f1f3f4',
    secondaryDarkText: 'silver',
    errorBackGround: '#DC3545',

    //////////////////
    timelineTagsBackground: '#334366',
    greyishwhite: '#f0f0f0',
    blackText: 'black',
    semiPrimary: '#FF0000',
  },
};
function DataContext(props) {
  const [isNight, setIsNight] = useState(false);
  const isNightRef = useRef(false);
  const invidiousInstamceRef = useRef('');

  const updateInstance = () => {
    getVidSource()
      .then(val => {
        if (val != null && typeof val == 'string') {
          invidiousInstamceRef.current = val;
          setGlobalUrl(val);
        } else {
          invidiousInstamceRef.current = US_URL;
        }
      })
      .catch(() => {
        invidiousInstamceRef.current = US_URL;
      });
  };
  const onIconPress = () => {
    isNightRef.current = !isNightRef.current;
    setIsNight(prev => !prev);
    if (isNightRef.current) {
      storeIsNight('1');
    } else {
      storeIsNight('0');
    }
  };

  useEffect(() => {
    getIsNight()
      .then(val => {
        if (val == '1') {
          isNightRef.current = true;
          setIsNight(true);
        } else {
          isNightRef.current = false;
          setIsNight(false);
        }
      })
      .catch(e => {
        isNightRef.current = false;
        setIsNight(false);
      });
    updateInstance();
    return () => {};
  }, []);
  const getTheme = () => {
    return isNight ? MyDarkTheme : MyLightTheme;
  };
  const getInstance = () => {
    return invidiousInstamceRef.current;
  };
  const setInstance = ins => {
    invidiousInstamceRef.current = ins;
    URL = ins;
  };
  return (
    <KeyEventContext.Provider
      value={{
        isNight: isNight,
        nightModePress: onIconPress,
        getTheme: getTheme,
        getInstance: getInstance,
        setInstance: setInstance,
      }}>
      {props.children}
      <BottomSwipeableComments theme={getTheme()} />
      <BottomSwipeableInfo theme={getTheme()} />
      <BottomSwipeableVideoResolutions theme={getTheme()} />
      <BottomSwipeableInvidiousInstances
        setInstance={setInstance}
        theme={getTheme()}
      />
    </KeyEventContext.Provider>
  );
}

export default DataContext;
