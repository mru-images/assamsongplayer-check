# React Native Conversion Guide

## 1. Replace Next.js specific imports and components

### Before (Next.js):
```typescript
import { useRouter } from 'next/navigation'
import Image from 'next/image'
```

### After (React Native):
```typescript
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
```

## 2. Replace HTML elements with React Native components

### Before:
```typescript
<div className="flex items-center">
  <img src={imageUrl} alt="Song" />
  <button onClick={handleClick}>Play</button>
</div>
```

### After:
```typescript
import { View, Image, TouchableOpacity, Text } from 'react-native'

<View style={styles.container}>
  <Image source={{ uri: imageUrl }} style={styles.image} />
  <TouchableOpacity onPress={handleClick} style={styles.button}>
    <Text>Play</Text>
  </TouchableOpacity>
</View>
```

## 3. Replace Tailwind CSS with StyleSheet

### Before:
```typescript
<div className="bg-gray-900 p-4 rounded-lg">
```

### After:
```typescript
import { StyleSheet } from 'react-native'

<View style={styles.container}>

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 8,
  }
})
```

## 4. Audio Player Implementation

Replace the HTML audio element with react-native-track-player:

```typescript
import TrackPlayer, { 
  Capability, 
  State, 
  usePlaybackState,
  useProgress 
} from 'react-native-track-player';

// Setup track player
const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
  });
};

// Play a song
const playSong = async (song: Song) => {
  await TrackPlayer.add({
    id: song.id,
    url: song.audioUrl,
    title: song.name,
    artist: song.artist,
    artwork: song.image,
  });
  await TrackPlayer.play();
};
```

## 5. Navigation Structure

Replace Next.js routing with React Navigation:

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

## 6. Storage (Replace localStorage)

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('user_data', JSON.stringify(userData));

// Retrieve data
const userData = await AsyncStorage.getItem('user_data');
```

## 7. Icons

Replace Lucide React with React Native Vector Icons:

```typescript
import Icon from 'react-native-vector-icons/MaterialIcons';

<Icon name="play-arrow" size={24} color="#fff" />
```

## 8. Toast Messages

Replace react-hot-toast:

```typescript
import Toast from 'react-native-toast-message';

Toast.show({
  type: 'success',
  text1: 'Song added to queue',
});
```

## 9. Permissions (Android)

Add to android/app/src/main/AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## 10. Build and Run

```bash
# For Android
npx react-native run-android

# For release build
cd android
./gradlew assembleRelease
```