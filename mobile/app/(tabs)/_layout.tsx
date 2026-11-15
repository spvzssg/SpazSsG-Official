/**
 * Tabs Layout - Bottom Navigation Setup
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { tokens } from '@/styles/tokens';
import { TabBar } from '@/components/Navigation/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: tokens.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: 'Music',
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'LIVE',
        }}
      />
      <Tabs.Screen
        name="everything-spaz"
        options={{
          title: 'Everything Spaz',
        }}
      />
      <Tabs.Screen
        name="dreamers-club"
        options={{
          title: 'Dreamers Club',
        }}
      />
    </Tabs>
  );
}
