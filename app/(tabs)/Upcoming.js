import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Linking, StyleSheet } from 'react-native';

const Upcoming = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const getSearchResults = async () => {
    const apiKey = 'AIzaSyCZPtNrwxU5plviOh-E-o6ajpCCV3EO-gg'; // Use the API key provided
    const cx = 'b42de8df5ac8c4901'; // Use the Custom Search Engine ID provided
    const query = `news ${searchQuery}`; // news search
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items.slice(0, 5)); // Take only the top 5 results
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
            {item.title}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
});

export default Upcoming;
