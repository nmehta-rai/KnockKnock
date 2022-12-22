import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CameraScreen = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef();
  const [useFrontCam, setUseFrontCam] = useState(false);
  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      console.log(data);
      navigation.navigate('CreatePost', {vidoUri: data.uri});
    }
  };
  const cameraType = () => {
    if (!useFrontCam) {
      return RNCamera.Constants.Type.back;
    } else return RNCamera.Constants.Type.front;
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
        type={cameraType()}>
        <View style={styles.flipCamContainer}>
          <TouchableOpacity
            style={styles.flipCamBtn}
            onPress={() => setUseFrontCam(!useFrontCam)}>
            <MaterialIcons name={'flip-camera-ios'} size={35} color={'white'} />
          </TouchableOpacity>
        </View>
      </RNCamera>
      <TouchableOpacity
        style={isRecording ? styles.buttonRecord : styles.buttonStop}
        onPress={onRecord}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  buttonRecord: {
    height: 50,
    width: 50,
    backgroundColor: '#ff4343',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 25,
  },
  buttonStop: {
    height: 30,
    width: 30,
    backgroundColor: '#ff4343',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 3,
  },
  flipCamContainer: {
    alignItems: 'flex-end',
    margin: 15,
  },
  flipCamBtn: {
    padding: 2,
  },
});

export default CameraScreen;
