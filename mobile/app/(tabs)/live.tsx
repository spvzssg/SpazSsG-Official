/**
 * LIVE Screen - Stub/Placeholder
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '@/styles/tokens';
import { SafeArea } from '@/components/shared/SafeArea';
import { Button } from '@/components/shared/Button';

export default function LiveScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing[4],
    } as ViewStyle,
    title: {
      fontSize: tokens.typography.sizes['3xl'],
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: tokens.colors.text,
      marginBottom: tokens.spacing[2],
      fontFamily: tokens.typography.fontFamilies.display,
    } as TextStyle,
    description: {
      fontSize: tokens.typography.sizes.base,
      color: tokens.colors.textSecondary,
      textAlign: 'center',
      marginBottom: tokens.spacing[6],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <SafeArea scrollable={false}>
      <View style={styles.container}>
        <Text style={styles.title}>🔴 LIVE</Text>
        <Text style={styles.description}>
          Real-time livestreaming across Twitch, TikTok, and YouTube
        </Text>
        <Button
          title="Coming Soon"
          onPress={() => {}}
          variant="secondary"
          disabled
        />
      </View>
    </SafeArea>
  );
}
