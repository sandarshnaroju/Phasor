import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataContextProvider} from '../context/Context';
import Home from '../screens/bottomtabscreens/Home';
import Settings from '../screens/bottomtabscreens/Settings';
import Subscriptions from '../screens/bottomtabscreens/Subscriptions';
import Trending from '../screens/bottomtabscreens/Trending';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const context = DataContextProvider();

  const theme = context.getTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarActiveTintColor: theme.colors.semiPrimary,
      }}
      activeColor={theme.colors.primary}
      initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Trending"
        component={Trending}
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="fire" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="youtube-subscription"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
