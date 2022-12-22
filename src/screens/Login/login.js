import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Auth} from 'aws-amplify';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (password <= 1) {
      return;
    } else if (userName <= 1) {
      return;
    } else {
      try {
        const user = await Auth.signIn(userName, password);
        navigation.navigate('HomeBottomTabNav');
      } catch (error) {
        console.log('error signing in', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'Username'}
          onChangeText={input => setUserName(input)}
        />
      </View>
      <View style={styles.textBox}>
        <TextInput
          placeholder={'Password'}
          onChangeText={input => setPassword(input)}
        />
      </View>

      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
});

export default LoginScreen;
