import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeStack } from './home-stack';
import * as colors from '../../assets/colors.json';
import { ArchivScreen } from '../archiv';
import { FriendScreen } from '../friends';
import { ProfileScreen } from '../profile';

export type BottomTabsParamList = {
  HomeStack: undefined;
  ArchivScreen: undefined;
  FriendScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          paddingBottom: 0,
          paddingTop: 0,
          marginBottom: 0,
          marginHorizontal: '3%',
          borderTopRightRadius: 10,
          height: '100%',
          width: '100%',
          alignSelf: 'center',
        },
        tabBarIconStyle: {
          paddingBottom: 0,
          marginBottom: 0,
          marginTop: 0,
          width: '100%',
          height: '100%',
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.white2 + 'cc',
          borderRadius: 10,
          margin: '5%',
          marginBottom: '3%',
          paddingBottom: 0,
          paddingHorizontal: '1%',
          borderTopWidth: 0,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={'home'}
              size={32}
              color={focused ? colors.white : colors['blue-dark-sky']}
              style={{ backgroundColor: focused ? colors.blue : colors['blue-sky'], borderRadius: 10, padding: '20%' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'ArchivScreen'}
        component={ArchivScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={'back-in-time'}
              size={32}
              color={focused ? colors.white : colors['blue-dark-sky']}
              style={{ backgroundColor: focused ? colors.blue : colors['blue-sky'], borderRadius: 10, padding: '20%' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'FriendScreen'}
        component={FriendScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={'users'}
              size={32}
              color={focused ? colors.white : colors['blue-dark-sky']}
              style={{ backgroundColor: focused ? colors.blue : colors['blue-sky'], borderRadius: 10, padding: '20%' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={'user-circle-o'}
              size={32}
              color={focused ? colors.white : colors['blue-dark-sky']}
              style={{ backgroundColor: focused ? colors.blue : colors['blue-sky'], borderRadius: 10, padding: '20%' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
