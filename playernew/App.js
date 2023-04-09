import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Player from './screen/player';
import  Playing  from "./screen/playing";
import MusicPlayer from "./screen/musicplayer";

const App = () => {
  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      {/* Main file */}
      <MusicPlayer />
      {/* <Player />  */}
      
      
      {/* <Playing /> */}
     
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
