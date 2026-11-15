/**
 * Home Screen Components - Featured Release
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { Music } from '@/types';
import { Button } from '@/components/shared/Button';

export interface FeaturedReleaseProps {
  release: Music | null;
  onPress?: () => void;
}

export function FeaturedRelease({ release, onPress }: FeaturedReleaseProps) {
  if (!release) return null;

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing[4],
      marginBottom: tokens.spacing[6],
    } as ViewStyle,
    card: {
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.border.radius.lg,
      overflow: 'hidden',
      ...tokens.shadows.md,
    } as ViewStyle,
    image: {
      width: '100%',
      height: 240,
      resizeMode: 'cover',
    },
    content: {
      padding: tokens.spacing[4],
    } as ViewStyle,
    title: {
      fontSize: tokens.typography.sizes.xl,
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: tokens.colors.text,
      marginBottom: tokens.spacing[1],
      fontFamily: tokens.typography.fontFamilies.display,
    } as TextStyle,
    artist: {
      fontSize: tokens.typography.sizes.sm,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing[3],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
    description: {
      fontSize: tokens.typography.sizes.sm,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing[4],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: release.coverArtUrl }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{release.title}</Text>
          <Text style={styles.artist}>{release.artistName}</Text>
          {release.description && (
            <Text style={styles.description}>{release.description}</Text>
          )}
          <Button
            title="Listen on Spotify"
            onPress={() => {}}
            variant="primary"
            fullWidth
          />
        </View>
      </View>
    </Pressable>
  );
}
