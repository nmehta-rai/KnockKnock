import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeBottomTabNav from './BottomTabNavigation';
import LoginStackNav from './LoginStackNav';
import CreatePost from '../screens/createPost';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginStackNav"
          component={LoginStackNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeBottomTabNav"
          component={HomeBottomTabNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
