/**
 * Error State Component
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

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  onDismiss,
}: ErrorStateProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing[6],
      backgroundColor: tokens.colors.background,
    } as ViewStyle,
    icon: {
      fontSize: 64,
      marginBottom: tokens.spacing[4],
    } as TextStyle,
    title: {
      fontSize: tokens.typography.sizes['2xl'],
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: tokens.colors.error,
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
    buttonContainer: {
      flexDirection: 'row',
      gap: tokens.spacing[2],
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        {onRetry && (
          <Button title="Try Again" onPress={onRetry} variant="primary" />
        )}
        {onDismiss && (
          <Button title="Dismiss" onPress={onDismiss} variant="tertiary" />
        )}
      </View>
    </View>
  );
}
