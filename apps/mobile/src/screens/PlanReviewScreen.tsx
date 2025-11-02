import { memo } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const PlanReviewScreenComponent = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Plan Review</Text>
    <Text style={styles.body}>Assess AI suggestions and finalize your schedule.</Text>
  </SafeAreaView>
);

export const PlanReviewScreen = memo(PlanReviewScreenComponent);

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
