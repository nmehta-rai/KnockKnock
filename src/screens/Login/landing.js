import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import LoginLogo from '../../assets/images/loginLogo.png';
import theme from '../../style/theme';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LoginLogo} style={styles.loginLogo} />
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.btnText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 0.85,
  },
  loginLogo: {
    height: Dimensions.get('window').height - 230,
    resizeMode: 'contain',
    position: 'absolute',
    left: -102,
    top: -10,
  },
  btnContainer: {
    borderColor: 'white',
    borderWidth: 5,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    borderRadius: 6,
    flex: 0.8,
  },
  btnText: {
    color: 'white',
    fontFamily: theme.FONT_FAMILY_REGULAR,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LandingScreen;
