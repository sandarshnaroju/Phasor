import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {Appearance} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import ContextProvider from './src/context/Context';
import {getIsNight} from './src/database/Database';
import BottomTabs from './src/navigation/BottomTabs';
import SearchResults from './src/screens/SearchResults';
import SearchSuggestions from './src/screens/SearchSuggestions';
//import Home from './src/screens/Home';
import VideoPlayer from './src/screens/VideoPlayer';
enableScreens();

const Stack = createNativeStackNavigator();
const App = () => {
  const isDarkModeRef = useRef(
    Appearance.getColorScheme() == 'dark' ? true : false,
  );

  const [isDarkMode, setIsDarkMode] = useState(isDarkModeRef.current);
  const listener = () => {
    const theme = Appearance.getColorScheme();
    isDarkModeRef.current = theme == 'dark' ? true : false;

    setIsDarkMode(isDarkModeRef.current);
  };

  React.useEffect(() => {
    const themeListener = Appearance.addChangeListener(listener);
    getIsNight()
      .then(val => {
        if (val == '1') {
          isDarkModeRef.current = true;

          setIsDarkMode(isDarkModeRef.current);
        } else {
          isDarkModeRef.current = false;

          setIsDarkMode(isDarkModeRef.current);
        }
      })
      .catch(e => {
        isDarkModeRef.current = false;

        setIsDarkMode(isDarkModeRef.current);
      });
    return () => {
      themeListener.remove();
    };
  }, []);

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
  const getTheme = isDarkMode => {
    return isDarkMode ? MyDarkTheme : MyLightTheme;
  };

  return (
    <ContextProvider>
      <PaperProvider theme={getTheme(isDarkMode)}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabs">
            <Stack.Screen
              name="BottomTabs"
              options={{headerShown: false}}
              component={BottomTabs}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="VideoPlayer"
              component={VideoPlayer}
            />

            <Stack.Screen
              name="SearchSuggestions"
              options={{headerShown: false}}
              component={SearchSuggestions}
            />
            <Stack.Screen
              name="SearchResults"
              options={{headerShown: false}}
              component={SearchResults}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ContextProvider>
  );
};

export default App;
