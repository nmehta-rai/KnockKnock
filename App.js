/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {createUser} from './src/graphql/mutations';

const App = () => {
  // const fetchUser = async () => {
  //   const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
  //   console.log('userInfo:', userInfo);
  //   if (!userInfo) {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.appContainer}>
        <RootNavigator />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
