import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import CameraScreen from '../screens/cameraScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import plusIcon from '../assets/images/plus-icon.png';

const Tab = createBottomTabNavigator();

const HomeBottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#000'},
        activeTintColor: '#fff',
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Entypo name={'home'} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AntDesign name={'search1'} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Upload'}
        component={CameraScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <Image
              source={plusIcon}
              style={{
                height: 30,
                resizeMode: 'contain',
              }}
            />
          ),
          tabBarLabel: () => {
            null;
          },
        }}
      />
      <Tab.Screen
        name={'Inbox'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name={'message-minus-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name={'person-outline'} size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNav;
