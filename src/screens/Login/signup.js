import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Auth} from 'aws-amplify';

const Signup = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const signup = async () => {
    // console.log('U&P: ', userName, password);
    try {
      const {user} = await Auth.signUp({
        username: userName,
        password: password,
        attributes: {
          email: email, // optional
          // phone_number,   // optional - E.164 number convention
          // other custom attributes
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  const handleSubmit = async () => {
    if (password <= 1) {
      return;
    } else if (userName <= 1) {
      return;
    } else if (email <= 1) {
      return;
    } else {
      signup();
    }
  };
  const handleOtp = async () => {
    if (userName <= 1) {
      return;
    } else if (otp <= 4) {
      return;
    } else {
      try {
        await Auth.confirmSignUp(userName, otp);
        navigation.navigate('HomeBottomTabNav');
      } catch (error) {
        console.log('error confirming sign up', error);
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
          placeholder={'Email'}
          onChangeText={input => setEmail(input)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>
      <View style={styles.textBox}>
        <TextInput
          placeholder={'Username'}
          onChangeText={input => setUserName(input)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>
      <View style={styles.textBox}>
        <TextInput
          placeholder={'Password'}
          onChangeText={input => setPassword(input)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{marginBottom: 25}}>
        <Text>SUBMIT</Text>
      </TouchableOpacity>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'OTP'}
          onChangeText={input => setOtp(input)}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity onPress={() => handleOtp()} style={{marginBottom: 25}}>
        <Text>ENTER</Text>
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
    marginVertical: 5,
  },
});

export default Signup;
