import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const client_id = '047f8ea696a0445abf64e1738a07ac71'; //change this to test on your own spotify dev account
const client_secret = 'd02b717f549c4ed29744df3059b7a342'; //change this to test on your own spotify dev account
global.Buffer = require('buffer').Buffer;

//getAccessToken(): retrieves an access token for requests from the Spotify API using necessary authentication data.
async function getAccessToken() {
    const authUrl = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(client_id + ':' + client_secret).toString('base64');
    const bodyData = 'grant_type=client_credentials';

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData
        });
        const data = await response.json();
        return data.access_token;
    } catch(error) {
        console.error('Error getting access token:', error.message);
        return null;
    }
}

async function getTopSongsOfTheWeek(accessToken) {
    const topSongsUrl = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=50'; //top 50
    try {
        const response = await fetch(topSongsUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data.items.map(item => ({
            name: item.track.name,
            artists: item.track.artists,
            album: item.track.album,
            spotifyId: item.track.id
        }));
    } catch(error) {
        console.error('Error getting top songs of the week:', error);
        return [];
    }
}

const SongGridItem = ({ song }) => {
  const handlePress = () => {
    const spotifyUrl = `https://open.spotify.com/track/${song.spotifyId}`;
    Linking.openURL(spotifyUrl);
  };

  return (
    <TouchableOpacity style={styles.gridItem} onPress={handlePress}>
      <Image source={{uri: song.album.images[0].url}} style={styles.albumImage}/>
      <View style={styles.nameContainer}>
        <Text style={styles.songName}>{song.name}</Text>
        <Text style={styles.artistName}>{song.artists.map(artist => artist.name).join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Music = () => {
  const [topSongsOfTheWeek, setTopSongsOfTheWeek] = useState([]);

  useEffect(() => {
      async function fetchData() {
          const accessToken = await getAccessToken();
          const topSongsData = await getTopSongsOfTheWeek(accessToken);
          setTopSongsOfTheWeek(topSongsData);
      }
      fetchData();
  }, []);

  const moreSongs = topSongsOfTheWeek.slice(3);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Top Songs of the Week</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.subtitle}>Top 3 Songs:</Text>
          <View style={styles.top3Container}>
            {topSongsOfTheWeek.slice(0, 3).map((song, index) => (
              <SongGridItem key={index} song={song}/>
            ))}
          </View>
        </View>
        <View style={styles.separator}/>
        <View style={styles.sectionContainer}>
          <Text style={styles.subtitle}>More Songs:</Text>
          <FlatList
            data={moreSongs}
            renderItem={({item}) => <SongGridItem song={item}/>}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={styles.flatlistContainer}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  separator: {
    height: 10,
  },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  flatlistContainer: {
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImage: {
    width: '100%',
    aspectRatio: 1,
    height: '85%',
    resizeMode: 'cover',
  },
  nameContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  songName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
});

export default Music;
