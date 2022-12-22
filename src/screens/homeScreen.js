import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import Post from '../components/Post/post';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getUser, listPosts} from '../graphql/queries';
import {createUser} from '../../src/graphql/mutations';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const randomImages = [
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
  ];

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (!userInfo) {
        return;
      }

      const getUserResp = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );
      if (getUserResp.data.getUser) {
        console.log('User already exists in the DB');
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };
      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));

        setPosts(response.data.listPosts.items.reverse());
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, [isFocused]);

  useEffect(() => {
    const postsCopy = [...posts];
    for (var i in postsCopy) {
      if (currentIndex == i) {
        postsCopy[i].play = true;
      } else {
        postsCopy[i].play = false;
      }
    }
    setPosts(postsCopy);
  }, [currentIndex]);

  const onViewRef = React.useRef(viewableItems => {
    setCurrentIndex(viewableItems.changed[0].index);
  });

  const togglePause = () => {
    const postsCopy = [...posts];
    for (var i in postsCopy) {
      if (currentIndex == i) {
        postsCopy[i].play = !postsCopy[i].play;
      }
    }
    setPosts(postsCopy);
  };

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <Post
            post={item}
            paused={item.play == true ? false : true}
            togglePause={togglePause}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 130}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );
};

export default HomeScreen;
