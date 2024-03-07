import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const artists = [
  { name: 'Travis Scott', image: 'https://i.pinimg.com/564x/dd/98/0f/dd980f04686e408c977e7c9743245aa8.jpg' },
  { name: 'Kanye West', image: 'https://i.pinimg.com/736x/43/5d/e1/435de14fb0d811031eb6af2476eebe45.jpg' },
  { name: 'Drake', image: 'https://i.pinimg.com/736x/4c/74/19/4c741913cd43b2c92939e5637fd5e0cb.jpg' },
  { name: 'Taylor Swift', image: 'https://i.pinimg.com/564x/37/57/37/375737f9a009f5bb3f7c9019473be7f7.jpg' },
  { name: 'Sheck Wes', image: 'https://i.pinimg.com/564x/90/1a/08/901a08779a4fab582394e7324960f6d7.jpg' },
  { name: 'Don Toliver', image: 'https://i.pinimg.com/564x/3b/c0/55/3bc0556f85774e9fcc1809fb3733b520.jpg' },
  { name: 'Metro Boomin', image: 'https://i.pinimg.com/564x/59/44/41/59444186f97d92bc8245dbb61319a99a.jpg' },
  { name: 'Playboi Carti', image: 'https://i.pinimg.com/736x/06/7d/f0/067df069ce4bad5a55e4d93664ccded8.jpg' },
  { name: 'Ken Carson', image: 'https://i.pinimg.com/564x/78/e8/75/78e87504c64b5930043d0e081f212bf0.jpg' },
];

const ArtistGridItem = ({ artist }) => {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.artistName}>{artist.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Artists = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={artists}
          renderItem={({ item }) => <ArtistGridItem artist={item} />}
          keyExtractor={(item) => item.name}
          numColumns={3}
          style={styles.grid}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
    },
    grid: {
      flex: 1,
    },
    gridItem: {
      flex: 1,
      margin: 10,
      aspectRatio: 1, // item is a square
      justifyContent: 'center', // Center the content vertically 
      alignItems: 'center', // Center the content horizontally 
    },
    artistImage: {
      width: '100%', // full width of the grid item
      aspectRatio: 1, // a square
      height: '85%',
      resizeMode: 'cover', // image covers the square without stretching
    },
    nameContainer: {
      backgroundColor: 'white',
      width: '100%',
      padding: 5,
      alignItems: 'center', //  text is centered within the name container
    },
    artistName: {
      textAlign: 'center',
      color: 'black',
      fontSize: 16,
    },
  });  

export default Artists;
