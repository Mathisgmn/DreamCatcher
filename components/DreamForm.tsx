import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, HelperText, Divider } from 'react-native-paper';
import { Calendar, DateData } from 'react-native-calendars';
import CrossPlatformSlider from '@/components/CrossPlatformSlider';
import { Picker } from '@react-native-picker/picker';
import CustomPicker from '@/components/CustomPicker';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [dreamType, setDreamType] = useState<string>('');
  const [emotionsBefore, setEmotionsBefore] = useState('');
  const [emotionsAfter, setEmotionsAfter] = useState('');
  const [characters, setCharacters] = useState('');
  const [location, setLocation] = useState('');
  const [emotionalIntensity, setEmotionalIntensity] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [tags, setTags] = useState<string[]>([]);  // tags devient un tableau
  const [newTag, setNewTag] = useState('');  // nouvel état pour le tag en cours
  const [sleepQuality, setSleepQuality] = useState('');
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [tone, setTone] = useState('');

  const handleDreamTypeChange = (itemValue: string) => {
    console.log("handleDreamTypeChange: ", itemValue);
    setDreamType(itemValue);
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleDreamSubmission = async () => {
    const selectedDate = day || new Date().toISOString().split('T')[0];
    const dreamDateTime = `${selectedDate} ${time || '00:00'}`;

    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray.push({
        dreamText,
        isLucidDream,
        day: selectedDate,
        time,
        dreamDateTime,
        duration,
        dreamType,
        emotionsBefore,
        emotionsAfter,
        characters,
        location,
        emotionalIntensity,
        clarity,
        tags,
        sleepQuality,
        personalMeaning,
        tone,
      });

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      console.log('AsyncStorage: ', await AsyncStorage.getItem('dreamFormDataArray'));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Reset
    setDreamText('');
    setIsLucidDream(false);
    setDay('');
    setTime('');
    setDuration('');
    setDreamType('');
    setEmotionsBefore('');
    setEmotionsAfter('');
    setCharacters('');
    setLocation('');
    setEmotionalIntensity(5);
    setClarity(5);
    setTags([]);
    setNewTag('');
    setSleepQuality('');
    setPersonalMeaning('');
    setTone('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={setDreamText}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, styles.card]}
      />

      <TextInput
        label="Heure du rêve (HH:MM)"
        value={time}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^\d]/g, '');
          let formatted = cleaned;
          if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
          }
          if (formatted.length <= 5) {
            setTime(formatted);
          }
        }}
        placeholder="ex: 22:30"
        mode="outlined"
        keyboardType="numeric"
        style={[styles.input, styles.card]}
      />

      <CustomPicker
        label="Type de rêve"
        value={dreamType}
        onValueChange={setDreamType}
        options={['Cauchemar', 'Flashback', 'Rêve agréable', 'Incompréhensible']}
      />

      <TextInput
        label="Émotions AVANT le rêve"
        value={emotionsBefore}
        onChangeText={setEmotionsBefore}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <TextInput
        label="Émotions APRÈS le rêve"
        value={emotionsAfter}
        onChangeText={setEmotionsAfter}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <TextInput
        label="Personnages du rêve"
        value={characters}
        onChangeText={setCharacters}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <TextInput
        label="Lieu du rêve"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <View style={styles.tagSection}>
        <TextInput
          label="Ajouter un tag"
          value={newTag}
          onChangeText={setNewTag}
          mode="outlined"
          style={[styles.input, styles.card]}
          onSubmitEditing={addTag}
          right={<TextInput.Icon icon="plus" onPress={addTag} />}
        />
        <View style={styles.tagList}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Button mode="outlined" compact onPress={() => removeTag(tag)} style={styles.tagButton}>
                {tag} ✕
              </Button>
            </View>
          ))}
        </View>
      </View>

      <CustomPicker
        label="Qualité du sommeil"
        value={sleepQuality}
        options={['Horrible', 'Mauvaise', 'Bonne', 'Excellente']}
        onValueChange={setSleepQuality}
      />

      <TextInput
        label="Signification personnelle"
        value={personalMeaning}
        onChangeText={setPersonalMeaning}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <CustomPicker
        label="Tonalité du rêve"
        value={tone}
        options={['Positive', 'Négative', 'Neutre']}
        onValueChange={setTone}
      />

      <View style={styles.sliderGroup}>
        <HelperText type="info">Intensité émotionnelle : {emotionalIntensity}</HelperText>
        <CrossPlatformSlider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={emotionalIntensity}
          onValueChange={setEmotionalIntensity}
        />
      </View>

      <View style={styles.sliderGroup}>
        <HelperText type="info">Clarté du rêve : {clarity}</HelperText>
        <CrossPlatformSlider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={clarity}
          onValueChange={setClarity}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Rêve Lucide"
          status={isLucidDream ? 'checked' : 'unchecked'}
          onPress={() => setIsLucidDream(!isLucidDream)}
        />
      </View>

      <Calendar
        style={styles.calendar}
        onDayPress={(day: DateData) => setDay(day.dateString)}
        markedDates={{
          [day]: {
            selected: true,
            marked: false,
            selectedColor: '#6200EE', // ou une couleur que tu veux
          },
        }}
      />

      <TextInput
        label="Durée de sommeil (en heures)"
        value={duration}
        keyboardType="number-pad"
        onChangeText={(text) => {
          if (/^\d*\.?\d*$/.test(text)) setDuration(text);
        }}
        mode="outlined"
        style={[styles.input, styles.card]}
      />

      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  input: {
    marginBottom: 12,
    width: '100%',
  },
  card: {
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6200EE',
  },
  calendar: {
    marginVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sliderGroup: {
    marginVertical: 12,
  },
  tagSection: {
    marginBottom: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  tagButton: {
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
});
