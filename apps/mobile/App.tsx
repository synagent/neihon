import 'react-native-gesture-handler';

import { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AddTaskScreen } from './src/screens/AddTaskScreen';
import { FocusScreen } from './src/screens/FocusScreen';
import { PlanReviewScreen } from './src/screens/PlanReviewScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TodayScreen } from './src/screens/TodayScreen';

const tabs = {
  today: { label: 'Today', component: TodayScreen },
  add: { label: 'Add Task', component: AddTaskScreen },
  review: { label: 'Plan Review', component: PlanReviewScreen },
  focus: { label: 'Focus', component: FocusScreen },
  settings: { label: 'Settings', component: SettingsScreen },
} as const;

const tabKeys = Object.keys(tabs) as (keyof typeof tabs)[];

type TabKey = keyof typeof tabs;

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const ActiveComponent = useMemo(() => tabs[activeTab].component, [activeTab]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.screenContainer}>
          <ActiveComponent />
        </View>
        <View style={styles.tabBar}>
          {tabKeys.map((key) => (
            <Text
              key={key}
              accessibilityRole="button"
              style={[styles.tabLabel, activeTab === key && styles.tabLabelActive]}
              onPress={() => setActiveTab(key)}
            >
              {tabs[key].label}
            </Text>
          ))}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#101014',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#101014',
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2a2a35',
    backgroundColor: '#181820',
  },
  tabLabel: {
    color: '#7f86a9',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#ffffff',
  },
});
