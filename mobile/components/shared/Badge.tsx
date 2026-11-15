/**
 * Badge Component
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '@/styles/tokens';

export interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  text,
  variant = 'primary',
  size = 'md',
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return tokens.colors.primary;
      case 'secondary':
        return tokens.colors.secondary;
      case 'success':
        return tokens.colors.success;
      case 'error':
        return tokens.colors.error;
      case 'warning':
        return tokens.colors.warning;
      case 'info':
        return tokens.colors.info;
      default:
        return tokens.colors.primary;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 2, paddingHorizontal: 8 };
      case 'md':
        return { paddingVertical: 4, paddingHorizontal: 12 };
      case 'lg':
        return { paddingVertical: 6, paddingHorizontal: 16 };
      default:
        return { paddingVertical: 4, paddingHorizontal: 12 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return tokens.typography.sizes.xxs;
      case 'md':
        return tokens.typography.sizes.xs;
      case 'lg':
        return tokens.typography.sizes.sm;
      default:
        return tokens.typography.sizes.xs;
    }
  };

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: getBackgroundColor(),
      borderRadius: tokens.border.radius.full,
      ...getPadding(),
      alignSelf: 'flex-start',
    } as ViewStyle,
    text: {
      color: '#FFFFFF',
      fontSize: getFontSize(),
      fontWeight: tokens.typography.weights.semibold as TextStyle['fontWeight'],
      fontFamily: tokens.typography.fontFamilies.body,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,
  });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
