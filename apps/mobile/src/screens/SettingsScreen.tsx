import { memo } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const SettingsScreenComponent = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Settings</Text>
    <Text style={styles.body}>Configure integrations like Google Calendar and OpenAI.</Text>
  </SafeAreaView>
);

export const SettingsScreen = memo(SettingsScreenComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  body: {
    color: '#9aa0b1',
    fontSize: 16,
  },
});
