import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Slider,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import { Song } from '../types';

interface MusicPlayerProps {
  song: Song | null;
  isVisible: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const { width, height } = Dimensions.get('window');

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isVisible,
  onClose,
  onNext,
  onPrevious,
}) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isLiked, setIsLiked] = useState(false);

  const isPlaying = playbackState === State.Playing;

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible || !song) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="keyboard-arrow-down" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Playing from</Text>
          <Text style={styles.headerSubtitle}>Trending Now</Text>
        </View>
        <TouchableOpacity>
          <Icon name="more-horiz" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <View style={styles.albumContainer}>
        <Image source={{ uri: song.image }} style={styles.albumArt} />
      </View>

      {/* Song Info */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.name}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {song.artist}
        </Text>
        
        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Icon name="visibility" size={16} color="#9CA3AF" />
            <Text style={styles.statText}>{song.views}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="favorite" size={16} color="#9CA3AF" />
            <Text style={styles.statText}>{song.likes}</Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={progress.duration}
          value={progress.position}
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
          minimumTrackTintColor="#7C3AED"
          maximumTrackTintColor="#374151"
          thumbStyle={styles.progressThumb}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Icon name="shuffle" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onPrevious}>
          <Icon name="skip-previous" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={36}
            color="#fff"
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onNext}>
          <Icon name="skip-next" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Icon name="repeat" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.likeButton, isLiked && styles.likeButtonActive]}
          onPress={() => setIsLiked(!isLiked)}
        >
          <Icon
            name="favorite"
            size={18}
            color={isLiked ? '#fff' : '#9CA3AF'}
          />
          <Text style={[styles.likeText, isLiked && styles.likeTextActive]}>
            {isLiked ? 'Liked' : 'Like'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.volumeContainer}>
          <Icon name="volume-up" size={20} color="#9CA3AF" />
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={0.75}
            minimumTrackTintColor="#7C3AED"
            maximumTrackTintColor="#374151"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111827',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  albumContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumArt: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 16,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  songArtist: {
    fontSize: 18,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressContainer: {
    marginBottom: 30,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'monospace',
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  progressThumb: {
    backgroundColor: '#7C3AED',
    width: 16,
    height: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  likeButtonActive: {
    backgroundColor: '#EF4444',
  },
  likeText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  likeTextActive: {
    color: '#fff',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: 120,
    marginLeft: 24,
    gap: 12,
  },
  volumeSlider: {
    flex: 1,
    height: 40,
  },
});

export default MusicPlayer;