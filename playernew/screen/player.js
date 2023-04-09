import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import songs from '../data';

const { width, height } = Dimensions.get('window');

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    await TrackPlayer.add(songs);
    await TrackPlayer.play();
  } catch (error) {
    console.log(error);
  }
};

const togglePlayBack = async playBackState => {
  await TrackPlayer.play();
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }

  }
};

const Player = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });
  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({ value }) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);

      //   console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ item, index }) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View >
          {/* <Image
            //   source={item.artwork}
            source={trackArtwork}
            style={style.musicImage}
          /> */}
          <Text style={[style.songContent, style.songTitle]}>
            {/* {songs[songIndex].title} */ trackTitle}
            {/* <View> */}

              <Text style={[style.songContent, style.songArtist]}>
                {/* {songs[songIndex].artist} */ trackArtist}
              </Text>
            {/* </View> */}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {/* music player section */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable  onPress={() => {
              // navigations.navigate("ViewChapter", { name: item.name_pron_en, class: item.class, verses: item.verses_number, chapter: item })
              // navigations.navigate("Bookmark", { chapter: item }) 
              skipTo(item.track-1)
              // setsongIndex(item.track)
             
            }
            }>
            
              <View style={{ flexGrow: 1, padding: 20 }}>
                <Text >{item.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text >
                    {item.artist}
                  </Text>
                 

                </View>
              </View>
             
             
            </Pressable>
          )
        }} />
      <View style={style.mainContainer}>
        {/* Title & Artist Name */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={songs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true },
          )}
        /> 
        {/* <View> */}
          
          {/* <Text style={[style.songContent, style.songArtist]}> */}
            {/* {songs[songIndex].artist} */
            //  trackArtist
          }
          {/* </Text> */}
        {/* </View> */}
        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="red"
            minimumTrackTintColor="red"
            maximumTrackTintColor="grey"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toISOString() // returns a date object as a string, using the ISO standard
                .substring(11, 19)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substring(11, 19) }
            </Text>
          </View>
        </View>
        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            {/* <Text>play-skip-back-outline</Text> */}
            <Ionicons name="play-skip-back-outline" size={35} color="red" />
          </TouchableOpacity>
        
          {/* <TouchableOpacity  onPress={() => TrackPlayer.pause()}>
            <Ionicons
              name={
               'ios-pause-circle'
                 
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => TrackPlayer.play()}>
            <Ionicons
              name={
                'ios-play-circle'

              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity> */}
          <Pressable onPress={async () =>
            { 
              // await TrackPlayer.play()
             togglePlayBack(playBackState)}}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'pause-outline'
                  : 'play-outline'
              }
              size={35} color="red"
            />
          </Pressable>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Player;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: 'red',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#000',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#000',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
