/**
 * Empty State Component
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
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  message,
  actionText,
  onAction,
}: EmptyStateProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing[6],
      minHeight: 300,
    } as ViewStyle,
    icon: {
      fontSize: 64,
      marginBottom: tokens.spacing[4],
    } as TextStyle,
    title: {
      fontSize: tokens.typography.sizes['2xl'],
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: tokens.colors.text,
      marginBottom: tokens.spacing[2],
      textAlign: 'center',
      fontFamily: tokens.typography.fontFamilies.display,
    } as TextStyle,
    message: {
      fontSize: tokens.typography.sizes.base,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing[6],
      textAlign: 'center',
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionText && onAction && (
        <Button title={actionText} onPress={onAction} variant="primary" />
      )}
    </View>
  );
}
