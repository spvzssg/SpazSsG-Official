/**
 * Input Component (Structure/Type Definition)
 * Complete implementation ready for use
 */

import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { InputProps } from '@/types';

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  editable = true,
  error,
  helper,
  icon,
  testID,
}: InputProps) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: tokens.spacing[4],
    } as ViewStyle,
    label: {
      fontSize: tokens.typography.sizes.sm,
      fontWeight: tokens.typography.weights.medium as TextStyle['fontWeight'],
      color: tokens.colors.text,
      marginBottom: tokens.spacing[1],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: tokens.colors.surface,
      borderWidth: 1,
      borderColor: error ? tokens.colors.error : tokens.colors.border,
      borderRadius: tokens.border.radius.md,
      paddingHorizontal: tokens.spacing[3],
      minHeight: 44,
    } as ViewStyle,
    input: {
      flex: 1,
      paddingVertical: tokens.spacing[2],
      fontSize: tokens.typography.sizes.base,
      color: tokens.colors.text,
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
    icon: {
      marginRight: tokens.spacing[2],
    } as ViewStyle,
    helperText: {
      fontSize: tokens.typography.sizes.xs,
      color: error ? tokens.colors.error : tokens.colors.textTertiary,
      marginTop: tokens.spacing[1],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textTertiary}
          secureTextEntry={secureTextEntry}
          editable={editable}
          testID={testID}
        />
      </View>
      {(error || helper) && (
        <Text style={styles.helperText}>{error || helper}</Text>
      )}
    </View>
  );
}
