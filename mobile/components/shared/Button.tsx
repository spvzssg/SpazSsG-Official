/**
 * Base Button Component
 */

import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { ButtonProps } from '@/types';

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  testID,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return tokens.colors.disabled;
    switch (variant) {
      case 'primary':
        return tokens.colors.primary;
      case 'secondary':
        return tokens.colors.secondary;
      case 'tertiary':
        return 'transparent';
      default:
        return tokens.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return tokens.colors.textTertiary;
    if (variant === 'tertiary') return tokens.colors.primary;
    return '#FFFFFF';
  };

  const getBorderColor = () => {
    if (variant === 'tertiary') return tokens.colors.primary;
    return 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'md':
        return { paddingVertical: 12, paddingHorizontal: 24 };
      case 'lg':
        return { paddingVertical: 16, paddingHorizontal: 32 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24 };
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: variant === 'tertiary' ? 2 : 0,
      borderRadius: tokens.border.radius.md,
      ...getPadding(),
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.6 : 1,
      flexDirection: 'row',
      gap: 8,
      ...((fullWidth && { alignSelf: 'stretch' }) as ViewStyle),
    },
    text: {
      color: getTextColor(),
      fontSize: tokens.typography.sizes.base,
      fontWeight: tokens.typography.weights.semibold as TextStyle['fontWeight'],
      fontFamily: tokens.typography.fontFamilies.body,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && { opacity: 0.8 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
    >
      {icon && <View>{icon}</View>}
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}
