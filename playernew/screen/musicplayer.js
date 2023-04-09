import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import tracks from '../data';

const { width, height } = Dimensions.get('window');

const setupPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            // android: {
            //     appKilledPlaybackBehavior:
            //         AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            // },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
        });
        
        await TrackPlayer.add(tracks);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue)
        await TrackPlayer.play();
        
    } catch (error) {
        console.log(error);
    }
};




const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const progress = useProgress();
    //   custom states
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artwork, artist } = track;
            setTrackTitle(title);
            setTrackArtist(artist);
        }
    });
    const skipTo = async trackId => {
        await TrackPlayer.skip(trackId);
    };

    const playPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            await TrackPlayer.play();
            setIsPlaying(true);
        }
    }
    useEffect(() => {
        setupPlayer();
        setIsPlaying(true);

        // return () => {  
        //     TrackPlayer.destroy();
        //      TrackPlayer.reset();
        // };
    }, []);

    const skip = useCallback(
        async to => {
            let currentTrack = await TrackPlayer.getCurrentTrack();
            if (to === 'prev' && currentTrack > 0) {
                await TrackPlayer.skipToPrevious();
                setTrackIndex(trackIndex - 1);
                setIsPlaying(true);
            } else if (to === 'next' && currentTrack < tracks.length - 1) {
                await TrackPlayer.skipToNext();
                setTrackIndex(trackIndex + 1);
                setIsPlaying(true);
            }
            else {
                alert('no more track available')
            }
        },

    );
    useTrackPlayerEvents([Event.RemoteNext], async event => {
        if (event.type === Event.RemoteNext) {
            skip('next');
        }
    });

    // listerner to skip to previous track
    useTrackPlayerEvents([Event.RemotePrevious], async event => {
        if (event.type === Event.RemotePrevious) {
            skip('prev');
        }
    });
    
    return (
        <SafeAreaView style={style.container}>
            {/* music player section */}
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => {
                            
                            skipTo(item.track-1)

                        }
                        }>

                            <View style={{ flexGrow: 1, padding: 20 }}>
                                <Text >{item.title}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text >
                                        {item.artist}
                                    </Text>


                                </View>
                            </View>


                        </Pressable>
                    )
                }} />
            <View style={style.mainContainer}>
                <Text>{trackTitle}</Text>
                <Text>{trackArtist}</Text>
               
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
                                .substring(11, 19)}
                        </Text>
                    </View>
                </View>
                {/* music control */}
                <View style={style.musicControlsContainer}>
                    <TouchableOpacity onPress={() => {
                        
                        skip('prev')

                    }
                    }>
                        
                        <Ionicons name="play-skip-back-outline" size={35} color="red" />
                    </TouchableOpacity>

                   
                    <Pressable onPress={async () => {
                        playPause()
                        
                    }}>
                        <Ionicons
                            name={
                                
                                isPlaying
                                    ? 'pause-outline'
                                    : 'play-outline'
                            }
                            size={35} color="red"
                        />
                    </Pressable>
                    <TouchableOpacity onPress={() => {
                      
                        skip('next')

                    }}>
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

export default MusicPlayer;

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
