import { memo } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const FocusScreenComponent = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Focus Mode</Text>
    <Text style={styles.body}>Stay in the zone. Timer and calming interface coming soon.</Text>
  </SafeAreaView>
);

export const FocusScreen = memo(FocusScreenComponent);

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
