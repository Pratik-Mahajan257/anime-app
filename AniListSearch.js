import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const AniListSearch = () => {
    const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState([]);

  const searchAnime = async () => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ($search: String) {
              Page {
                media(search: $search, type: ANIME) {
                  id
                  title {
                    romaji
                  }
                  coverImage {
                    medium
                  }
                  description
                  startDate {
                    year
                    month
                    day
                  }
                  # Add any other desired fields here
                }
              }
            }
          `,
          variables: {
            search: searchTerm,
          },
        }),
      });
      
      const { data } = await response.json();
      setAnimeList(data?.Page?.media || []);
    } catch (error) {
      console.error('Error searching anime:', error);
    }
  };

  const renderAnimeItem = ({ item }) => {
    const { id, title, coverImage, description, startDate } = item;


  const handleAnimePress = (item) => {
    if (navigation) {
      navigation.navigate('AnimeDetails', { anime: item });

      const { title, description, startDate } = item;
      Alert.alert(
        title?.romaji || 'Anime Details',
        `Description: ${description || 'N/A'}\n\nStart Date: ${startDate?.year || 'N/A'}`,
      );
    }
  };

    return (
      <TouchableOpacity style={styles.animeItem} onPress={handleAnimePress}>
        <Image source={{ uri: coverImage?.medium }} style={styles.animePoster} />
        <Text style={styles.animeTitle}>{title?.romaji}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search anime"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchAnime}
      />
      <FlatList
        data={animeList}
        renderItem={renderAnimeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    padding: 16,
    marginTop: 15,
    backgroundColor: 'grey',
  },
  searchBar: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
 animeItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  justifyContent: 'center',
  flexWrap: 'wrap',
   
},
animePoster: {
  width: '50%', 
  height: '100%',
  aspectRatio: 0.67,
  marginBottom: 8,
  resizeMode: 'contain',
  borderColor: 'blue',
    borderWidth: 1,
},
animeTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center', 
  width: '100%', 
}

});

export default AniListSearch;
