import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AniListSearch from './AniListSearch';

const App = () => {
  return (
      <NavigationContainer>

    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AniListSearch  />
      </View>
    </SafeAreaView>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default App;
