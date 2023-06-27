import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { fetchAnimeData } from './AnilistApi';

export default function AnimeSearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeData, setAnimeData] = useState(null);
  
const handleSearch = async () => {
  try {
    const data = await fetchAnimeData(searchTerm);
    console.log('Received data:', data); // Add this line to check the received data structure
    setAnimeData(data.Page?.media || []); // Use optional chaining to handle undefined or missing fields
  } catch (error) {
    console.error('Error fetching anime data:', error);
    setAnimeData([]);
  }
};



  console.log('Anime data:', animeData); // Check the animeData state in the console

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Search Your Anime
      </Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 10 }}
        placeholder="Enter anime name"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <Button title="Search" onPress={handleSearch} disabled={!searchTerm} />
      {animeData && animeData.length ? (
        animeData.map(anime => (
          <View key={anime.id} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{anime.title.english}</Text>
            <Text>{anime.title.native}</Text>
            <Text>{anime.siteUrl}</Text>
            <Text>{anime.description}</Text>
          </View>
        ))
      ) : (
        <Text>No anime found.</Text>
      )}
    </View>
  );
}
