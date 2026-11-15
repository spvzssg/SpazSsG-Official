/**
 * Home Screen Components - Hero Section
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '@/styles/tokens';

export interface HeroSectionProps {
  logoUrl?: string;
}

export function HeroSection({ logoUrl }: HeroSectionProps) {
  const styles = StyleSheet.create({
    hero: {
      backgroundColor: tokens.colors.primary,
      paddingVertical: tokens.spacing[10],
      paddingHorizontal: tokens.spacing[4],
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    } as ViewStyle,
    logo: {
      width: 200,
      height: 120,
      resizeMode: 'contain',
      marginBottom: tokens.spacing[4],
    },
    subtitle: {
      fontSize: tokens.typography.sizes.lg,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: tokens.typography.fontFamilies.body,
      fontWeight: tokens.typography.weights.medium as TextStyle['fontWeight'],
    } as TextStyle,
  });

  return (
    <View style={styles.hero}>
      {logoUrl && (
        <Image
          source={{ uri: logoUrl }}
          style={styles.logo}
        />
      )}
      <View
        style={{
          width: 200,
          height: 120,
          backgroundColor: tokens.colors.secondary,
          borderRadius: tokens.border.radius.lg,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: tokens.spacing[4],
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700' }}>
          SPAZ SSG
        </Text>
      </View>
      <Text style={styles.subtitle}>
        East Coast Hip-Hop Artist
      </Text>
    </View>
  );
}
