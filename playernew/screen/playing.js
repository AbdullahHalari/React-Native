import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const tracks = [
    {
        id: '1',
        track:1,
        url: require('../assets/audio/3.mp3'),
        title: 'Song 1',
        artist: 'Artist 1',
        // artwork: 'https://example.com/song1.png'
    },
    {
        id: '2',
        track:2,
        url: require('../assets/audio/4.mp3'),
        title: 'Song 2',
        artist: 'Artist 2',
        // artwork: 'https://example.com/song2.png'
    },
    // add more tracks as needed
];

const Playing = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);

    useEffect(() => {
        async function setupPlayer() {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(tracks);
            await TrackPlayer.play();
            setIsPlaying(true);
        }
        setupPlayer();
    }, []);

    const togglePlayback = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            await TrackPlayer.play();
            setIsPlaying(true);
        }
    };

    const nextTrack = async () => {
        const newIndex = trackIndex + 1 >= tracks.length ? 0 : trackIndex + 1;
        await TrackPlayer.skip(tracks[newIndex].track);
        setTrackIndex(newIndex);
        setIsPlaying(true);
    };

    const prevTrack = async () => {
        const newIndex = trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1;
        await TrackPlayer.skip(tracks[newIndex].id);
        setTrackIndex(newIndex);
        setIsPlaying(true);
    };

    return (
        <View>
            <Text>{tracks[trackIndex].title} - {tracks[trackIndex].artist}</Text>
            <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback} />
            <Button title="Previous" onPress={TrackPlayer.skipToPrevious} />
            <Button title="Next" onPress={TrackPlayer.skipToNext} />
        </View>
    );
};

export default Playing;
