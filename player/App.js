// import React from 'react';
// import { View, StatusBar, StyleSheet } from 'react-native';
// // import Player from './screen/play';
// import Players from "./screen/play";
// import Playing from "./screen/play";

// const App = () => {
//   return (
//     <View style={style.container}>
//       <StatusBar barStyle="light-content" />
//       {/* <Player /> */}
//       <Playing />
//       {/* <Players /> */}
//     </View>
//   );
// };

// export default App;

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
import React, { useRef, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
// import Video from 'react-native-video';
import AlbumArt from './src/components/AlbumArt';
import Control from './src/components/Control';
import SongDetails from './src/components/SongDetails';
import  {TRACKS}  from './data';

export default function App() {
  const [pause, setPause] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const currentTrack = TRACKS[selectedTrack];

  function onPlay() {
    setPause(false);
  }
  function onPause() {
    setPause(true);
  }
  function onNext() {
    if (selectedTrack == TRACKS.length - 1) {
      setSelectedTrack(0);
    } else {
      setSelectedTrack(selectedTrack + 1);
    }
  }

  function onBack() {
    if (selectedTrack == 0) {
      setSelectedTrack(TRACKS.length - 1);
    } else {
      setSelectedTrack(selectedTrack - 1);
    }
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <AlbumArt url={currentTrack.artwork} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <SongDetails
            artistName={currentTrack.artist}
            songName={currentTrack.title}
          />
          <Control {...{ pause, onPause, onPlay, onNext, onBack }} />
        </View>

        {/* <Video
          source={{ uri: currentTrack.audioUrl }}
          paused={pause}
          audioOnly
          poster={currentTrack.albumArtUrl}
        /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111436',
    flex: 1,
  },
});
