import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Storage} from 'aws-amplify';

const Post = props => {
  const [post, setPost] = useState(props.post);

  // const [paused, setPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({...post, likes: post.likes + likesToAdd});
    setIsLiked(!isLiked);
  };

  const onPlayPausePress = () => {
    props.togglePause();
  };

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          <Video
            source={{
              uri: videoUri,
            }}
            style={styles.video}
            resizeMode={'cover'}
            onError={e => console.log(e)}
            repeat={true}
            paused={props.paused}
          />

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <Image
                source={{
                  uri: post.user.imageUri,
                }}
                style={styles.profilePic}
              />

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onLikePress}>
                <AntDesign
                  name={'heart'}
                  size={40}
                  color={isLiked ? 'red' : 'white'}
                />
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>
              <View style={styles.iconContainer}>
                <FontAwesome name={'commenting'} size={40} color="white" />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>
                <View style={styles.songRow}>
                  <Entypo name={'beamed-note'} size={24} color="white" />
                  <Text style={styles.songName}>{post.song.name}</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: post.song.imageUri,
                }}
                style={styles.songImage}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
