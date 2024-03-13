import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const client_id = '047f8ea696a0445abf64e1738a07ac71';
const client_secret = 'd02b717f549c4ed29744df3059b7a342';
global.Buffer = require('buffer').Buffer;

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

async function searchTracks(accessToken, query) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
    try {
        const response = await fetch(searchUrl, {
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log('Search API response:', data);
        return data.tracks.items;
    } catch(error) {
        console.error('Error searching tracks:', error);
        return [];
    }
}

//
const SpotifyRanking = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const handleSearch = async () => {
        try {
            const accessToken = await getAccessToken();
            const results = await searchTracks(accessToken, searchQuery);
            setSearchResults(results);
        } catch(error) {
            console.error('Error searching tracks:', error);
        }
    };

    const handleTrackSelection = (track) => {
        if(selectedTracks.length < 5) {
            if(!selectedTracks.includes(track)) {
                setSelectedTracks([...selectedTracks, track]);
            } else {
                Alert.alert('You already selected this song.');
            }
        } else {
            Alert.alert('You can only select up to 5 tracks.');
        }
    };

    return (
        //Top album names and covers
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#24292f',
                marginBottom: -40,
            }}>
            <Text style={{color: '#cf5906', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginLeft: 10,}}>Search Spotify Tracks:</Text>
            <TextInput
                style={{height: 40, backgroundColor: '#50575c', borderColor: 'gray', borderRadius: 5, borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, marginLeft: 10,}}
                placeholderTextColor={'rgba(128,130,132,255)'}
                borderColor={'rgba(128,130,132,255)'}
                placeholder="Enter track name"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TouchableOpacity
                onPress={handleSearch}
                style = {{
                backgroundColor: '#cf5906',
                padding:13,
                borderRadius:5,
                }}>
                <Text
                    style={{
                        textAlign:'center',
                        color:'#FFFF'
                    }}
                >
                    Search
                </Text>
            </TouchableOpacity>

            <Text style={{color: '#cf5906', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginRight: 10, marginLeft: 10,}}>Selected Tracks:</Text>
            <FlatList
                data={selectedTracks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{borderRadius: 5, backgroundColor: '#cf5906', flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginRight: 20, marginLeft: 10,}}>
                        <Image
                            source={{uri: item.album.images[0].url}}
                            style={{width: 50, height: 50, marginRight: 10}}
                        />
                        <Text>{item.name} - {item.artists.map(artist => artist.name).join(', ')}</Text>
                    </View>
                )}
            />

            <Text style={{color: '#cf5906', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, marginRight: 10, marginLeft: 10,}}>Search Results:</Text>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleTrackSelection(item)}>
                        <View style={{borderRadius: 5, backgroundColor: '#cf5906', flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginRight: 20, marginLeft: 10,}}>
                            <Image
                                source={{uri: item.album.images[0].url}}
                                style={{width: 50, height: 50, marginRight: 10}}
                            />
                            <Text>{item.name} - {item.artists.map(artist => artist.name).join(', ')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};
export default SpotifyRanking;