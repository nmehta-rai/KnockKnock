import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';
import {createPost} from '../graphql/mutations';

const CreatePost = ({navigation}) => {
  const route = useRoute();
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const uploadToStorage = async imagePath => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const fileName = `${uuidv4()}.mp4`;
      const s3Response = await Storage.put(fileName, blob);
      setVideoKey(s3Response.key);
      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    uploadToStorage(route.params.vidoUri);
  }, []);

  const onPublish = async () => {
    if (!videoKey) {
      console.warn('Video is not yet uploaded');
      return;
    }
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        songID: '73acdb76-3520-4b9e-92b5-15b41a180438',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      navigation.navigate('HomeBottomTabNav', {screen: 'Home'});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.txtInputContainer}>
        <TextInput
          value={description}
          onChangeText={value => setDescription(value)}
          style={styles.textInput}
          multiline={true}
          numberOfLines={5}
          maxLength={100}
          placeholder={'Description'}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPublish}>
        <Text style={styles.buttonText}>Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  txtInputContainer: {
    flex: 1,
    margin: 10,
  },
  button: {
    backgroundColor: '#ff4747',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 0.5,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default CreatePost;
