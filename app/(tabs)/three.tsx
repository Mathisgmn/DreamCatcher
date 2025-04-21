// app/(tabs)/three.tsx

import { StyleSheet, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabThreeScreen() {
  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Succès', 'AsyncStorage vidé avec succès.');
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de vider le stockage.');
      console.error('Erreur lors de la suppression des données :', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button mode="contained" onPress={handleClearStorage}>
        Vider les données
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
