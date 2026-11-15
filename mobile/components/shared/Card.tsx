/**
 * Base Card Component
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { CardProps } from '@/types';

export function Card({
  children,
  variant = 'standard',
  onPress,
  style,
  testID,
}: CardProps) {
  const getStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: tokens.border.radius.lg,
      padding: tokens.spacing[4],
      marginBottom: tokens.spacing[4],
    };

    switch (variant) {
      case 'standard':
        return {
          ...baseStyle,
          backgroundColor: tokens.colors.surface,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        };
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: tokens.colors.surface,
          ...tokens.shadows.md,
        };
      case 'featured':
        return {
          ...baseStyle,
          backgroundColor: tokens.colors.primary,
          minHeight: 240,
          justifyContent: 'center',
          ...tokens.shadows.lg,
        };
      default:
        return baseStyle;
    }
  };

  const styles = StyleSheet.create({
    card: getStyles(),
    pressable: {
      borderRadius: tokens.border.radius.lg,
    },
  });

  const content = <View style={styles.card}>{children}</View>;

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          pressed && { opacity: 0.9 },
        ]}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
