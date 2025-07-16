import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../ThemeContext';
import { useVerseSettings } from '../../VerseSettingsContext';

const translationNames = {
  'de4e12af7f28f599-02': 'English Standard Version (ESV)',
  '06125adad2d5898a-01': 'King James Version (KJV)',
  'bba9f40183526463-01': 'New International Version (NIV)',
  '46eecb412d56dfb7-02': 'Christian Standard Bible (CSB)',
  'fa0eeb8af176a5c0-01': 'New Living Translation (NLT)',
};

const letterModes = ['one', 'two', 'three'];
const letterModeLabels = {
  one: '1-Letter',
  two: '2-Letter',
  three: '3-Letter',
};

const translationOptions = Object.entries(translationNames)
  .map(([value, label]) => ({ label, value }))
  .sort((a, b) => a.label.localeCompare(b.label));

const SettingsScreen = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const {
    chunkSize,
    setChunkSize,
    translation,
    setTranslation,
    letterMode,
    setLetterMode,
  } = useVerseSettings();

  const styles = getStyles(theme, mode);

  const [letterModalVisible, setLetterModalVisible] = useState(false);
  const [translationModalVisible, setTranslationModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionHeader}>PREFERENCES</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#d3d3d3', true: '#ffffff' }}
          thumbColor={mode === 'dark' ? '#000000' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={mode === 'dark'}
        />
      </View>

      <TouchableOpacity
        onPress={() => setLetterModalVisible(true)}
        style={styles.settingRow}
      >
        <Text style={styles.label}>First Letter Style</Text>
        <Text style={styles.value}>{letterModeLabels[letterMode]}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>VERSE SETTINGS</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Letters per Line: {chunkSize}</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={4}
          maximumValue={20}
          step={1}
          value={chunkSize}
          onValueChange={setChunkSize}
          minimumTrackTintColor={theme.textColor}
          maximumTrackTintColor={theme.textColor}
          thumbTintColor={theme.textColor}
        />
      </View>

      <TouchableOpacity
        onPress={() => setTranslationModalVisible(true)}
        style={styles.settingRow}
      >
        <Text style={styles.label}>Translation</Text>
        <Text style={styles.value}>
          {translationNames[translation] || 'Unknown'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>

      {/* Letter Mode Modal */}
      <Modal
        visible={letterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLetterModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLetterModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {letterModes.map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => {
                  setLetterMode(mode);
                  setLetterModalVisible(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalText}>
                  {letterModeLabels[mode]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Translation Modal */}
      <Modal
        visible={translationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTranslationModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTranslationModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={translationOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setTranslation(item.value);
                    setTranslationModalVisible(false);
                  }}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const getStyles = (theme, mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: 20,
    },
    sectionHeader: {
      fontSize: 13,
      color: theme.textColor,
      opacity: 0.6,
      marginTop: 20,
      marginBottom: 8,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    label: {
      fontSize: 16,
      color: theme.textColor,
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    sliderContainer: {
      marginTop: 10,
      marginBottom: 20,
    },
    versionText: {
      marginTop: 40,
      textAlign: 'center',
      fontSize: 12,
      color: theme.textColor,
      opacity: 0.5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      maxHeight: '60%',
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      paddingVertical: 10,
    },
    modalOption: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    modalText: {
      fontSize: 16,
      color: theme.textColor,
    },
  });

export default SettingsScreen;
