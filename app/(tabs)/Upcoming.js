import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Linking, StyleSheet, Image, ScrollView } from 'react-native';

const Upcoming = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const getSearchResults = async () => {
    const apiKey = 'AIzaSyCZPtNrwxU5plviOh-E-o6ajpCCV3EO-gg'; // Use the provided API key
    const cx = 'b42de8df5ac8c4901'; // Use the provided Custom Search Engine ID
    const query = `news ${searchQuery}`; // news prefix
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items.slice(0, 10)); // Taking only the top 10 results
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Enter artist name"
      />
      <Button title="Search" onPress={getSearchResults} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.pagemap?.cse_thumbnail?.length > 0 && (
              <Image
                style={styles.thumbnail}
                source={{ uri: item.pagemap.cse_thumbnail[0].src }}
              />
            )}
            <Text style={styles.title} onPress={() => Linking.openURL(item.link)}>
              {item.title}
            </Text>
            <Text style={styles.snippet}>{item.snippet}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f5f5f5', // Light grey background for the entire view
  },
  searchInput: {
    height: 40,
    borderColor: '#dddddd', // Light border color for the input field
    borderWidth: 1,
    borderRadius: 5, // Rounded corners for the input field
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff', // White background for the input field
  },
  card: {
    backgroundColor: '#ffffff', // White background for the card
    borderRadius: 8, // Rounded corners for the card
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000', // Shadow for the card
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: '100%', // Full width of the card
    height: 200, // Fixed height for the thumbnail
    borderRadius: 8, // Rounded corners for the thumbnail
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  snippet: {
    fontSize: 14,
  },
});

export default Upcoming;
