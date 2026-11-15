/**
 * Loader Component
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { tokens } from '@/styles/tokens';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export function Loader({
  size = 'large',
  color = tokens.colors.primary,
  fullScreen = false,
}: LoaderProps) {
  const styles = StyleSheet.create({
    container: {
      ...(fullScreen && {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }),
      ...(fullScreen && {
        backgroundColor: tokens.colors.background,
      }),
    } as ViewStyle,
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
