import { memo } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const AddTaskScreenComponent = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Add Task</Text>
    <Text style={styles.body}>Capture the next action you want to remember.</Text>
  </SafeAreaView>
);

export const AddTaskScreen = memo(AddTaskScreenComponent);

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
