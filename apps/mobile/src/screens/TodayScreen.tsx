import { memo, useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import type { TimelineItem } from '../types';

const mockTimeline: TimelineItem[] = [
  {
    id: '1',
    time: '07:00',
    title: 'Wake Up & Stretch',
    context: 'wellness',
  },
  {
    id: '2',
    time: '07:30',
    title: 'Morning Run',
    context: 'wellness',
  },
  {
    id: '3',
    time: '09:00',
    title: 'Team Standup',
    context: 'work',
  },
];

const TodayScreenComponent = () => {
  const timeline = useMemo(() => mockTimeline, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Today</Text>
      <FlatList
        data={timeline}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.contextLabel}>{item.context.toUpperCase()}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
      <Pressable accessibilityRole="button" style={styles.ctaButton}>
        <Text style={styles.ctaText}>Plan My Day</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export const TodayScreen = memo(TodayScreenComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1f1f29',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: '#9aa0b1',
    fontWeight: '600',
    width: 64,
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#f5f6fa',
    fontSize: 16,
    marginBottom: 4,
  },
  contextLabel: {
    color: '#7f86a9',
    fontSize: 12,
    letterSpacing: 1,
  },
  separator: {
    height: 12,
  },
  ctaButton: {
    marginTop: 16,
    backgroundColor: '#5f5dff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
