// components/DreamList.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function DreamList() {
  type Dream = {
    dreamText: string;
    isLucidDream: boolean;
    day: string;
    time: string;
    duration: string;
    dreamType: string;
    emotionsBefore: string;
    emotionsAfter: string;
    characters: string;
    location: string;
    emotionalIntensity: number;
    clarity: number;
    tags: string[];
    sleepQuality: string;
    personalMeaning: string;
    tone: string;
  };

  const [dreams, setDreams] = useState<Dream[]>([]);

  // Ce useEffect est exécuté à l'instanciation du composant pour charger la liste initiale
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('dreamFormDataArray');
        const dreamFormDataArray = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem('dreamFormDataArray');
          const dreamFormDataArray = data ? JSON.parse(data) : [];
          setDreams(dreamFormDataArray);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };

      fetchData();

      return () => {
        console.log('This route is now unfocused.');
      };
    }, [])
  );

  const deleteDream = async (index: number) => {
    const updatedDreams = [...dreams];
    updatedDreams.splice(index, 1);  // Supprime l'élément à l'index donné
    setDreams(updatedDreams);
    try {
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));  // Sauvegarde la nouvelle liste
    } catch (error) {
      console.error('Erreur lors de la suppression du rêve:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Liste des Rêves :</Text>
      {dreams.map((dream, index) => (
        <View key={index} style={styles.dreamItem}>
          <View style={styles.dreamHeader}>
            <Text style={styles.dreamText}>
              {dream.dreamText}
              {'\n'}{dream.isLucidDream ? 'Lucide' : 'Non Lucide'}
              {'\n'}{dream.day} - {dream.time}
              {'\n'}Durée : {dream.duration} heures
              {'\n'}Type : {dream.dreamType}
              {'\n'}Émotions AVANT : {dream.emotionsBefore}
              {'\n'}Émotions APRÈS : {dream.emotionsAfter}
              {'\n'}Personnages : {dream.characters}
              {'\n'}Lieu : {dream.location}
              {'\n'}Qualité du sommeil : {dream.sleepQuality}
              {'\n'}Signification personnelle : {dream.personalMeaning}
              {'\n'}Tonalité : {dream.tone}
              {'\n'}Intensité émotionnelle : {dream.emotionalIntensity}
              {'\n'}Clarté : {dream.clarity}
            </Text>
            <TouchableOpacity onPress={() => deleteDream(index)} style={styles.deleteButton}>
              <Ionicons name="trash-bin" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Affichage des tags */}
          {dream.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {dream.tags.map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  dreamItem: {
    marginBottom: 16,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dreamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dreamText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff4f58',
    padding: 8,
    borderRadius: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
});
