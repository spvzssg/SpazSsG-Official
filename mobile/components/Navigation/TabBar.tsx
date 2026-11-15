/**
 * Tab Navigation Component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  const getTabIcon = (routeName: string) => {
    const icons: Record<string, string> = {
      home: '🏠',
      music: '🎵',
      social: '📱',
      live: '🔴',
      'everything-spaz': '🎬',
      'dreamers-club': '👥',
    };
    return icons[routeName] || '•';
  };

  const getTabLabel = (routeName: string) => {
    const labels: Record<string, string> = {
      home: 'Home',
      music: 'Music',
      social: 'Social',
      live: 'LIVE',
      'everything-spaz': 'Spaz',
      'dreamers-club': 'Club',
    };
    return labels[routeName] || routeName;
  };

  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      backgroundColor: tokens.colors.surface,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
      paddingBottom: insets.bottom,
      height: 56 + insets.bottom,
    } as ViewStyle,
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: tokens.spacing[2],
    } as ViewStyle,
    icon: {
      fontSize: 24,
      marginBottom: tokens.spacing[1],
    } as TextStyle,
    label: {
      fontSize: tokens.typography.sizes.xxs,
      fontWeight: tokens.typography.weights.medium as TextStyle['fontWeight'],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            preventDefault: false,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            style={[
              styles.tab,
              {
                borderTopWidth: 2,
                borderTopColor: isFocused ? tokens.colors.primary : 'transparent',
              },
            ]}
            onPress={onPress}
          >
            <Text style={styles.icon}>{getTabIcon(route.name)}</Text>
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? tokens.colors.primary : tokens.colors.textSecondary,
                },
              ]}
            >
              {getTabLabel(route.name)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
