/**
 * Home Screen - Main Screen
 */

import React from 'react';
import { View, ScrollView, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '@/styles/tokens';
import { SafeArea } from '@/components/shared/SafeArea';
import { HeroSection } from '@/components/Home/HeroSection';
import { FeaturedRelease } from '@/components/Home/FeaturedRelease';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { useHome } from '@/hooks/useHome';

export default function HomeScreen() {
  const { featured, recent, social, announcements } = useHome();

  const styles = StyleSheet.create({
    section: {
      marginBottom: tokens.spacing[6],
    } as ViewStyle,
    sectionTitle: {
      fontSize: tokens.typography.sizes.xl,
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: tokens.colors.text,
      marginBottom: tokens.spacing[3],
      marginHorizontal: tokens.spacing[4],
      fontFamily: tokens.typography.fontFamilies.display,
    } as TextStyle,
    socialItem: {
      marginHorizontal: tokens.spacing[4],
      marginBottom: tokens.spacing[3],
    } as ViewStyle,
    socialContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing[2],
    } as ViewStyle,
    socialText: {
      fontSize: tokens.typography.sizes.sm,
      color: tokens.colors.textSecondary,
      fontFamily: tokens.typography.fontFamilies.body,
      flex: 1,
    } as TextStyle,
    ctaBanner: {
      backgroundColor: tokens.colors.secondary,
      borderRadius: tokens.border.radius.lg,
      padding: tokens.spacing[6],
      marginHorizontal: tokens.spacing[4],
      marginBottom: tokens.spacing[6],
    } as ViewStyle,
    ctaTitle: {
      fontSize: tokens.typography.sizes['2xl'],
      fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
      color: '#FFFFFF',
      marginBottom: tokens.spacing[2],
      fontFamily: tokens.typography.fontFamilies.display,
    } as TextStyle,
    ctaSubtitle: {
      fontSize: tokens.typography.sizes.base,
      color: '#FFFFFF',
      marginBottom: tokens.spacing[4],
      fontFamily: tokens.typography.fontFamilies.body,
    } as TextStyle,
  });

  return (
    <SafeArea scrollable edges={['top', 'bottom']}>
      {/* Hero Section */}
      <HeroSection />

      {/* Announcements */}
      {announcements.length > 0 && (
        <View style={styles.section}>
          {announcements.map((announcement) => (
            <Card key={announcement.id} variant="elevated">
              <Badge text="Announcement" variant="info" size="sm" />
              <Text
                style={{
                  fontSize: tokens.typography.sizes.lg,
                  fontWeight: tokens.typography.weights.bold as TextStyle['fontWeight'],
                  color: tokens.colors.text,
                  marginTop: tokens.spacing[2],
                  marginBottom: tokens.spacing[1],
                  fontFamily: tokens.typography.fontFamilies.display,
                }}
              >
                {announcement.title}
              </Text>
              <Text
                style={{
                  fontSize: tokens.typography.sizes.sm,
                  color: tokens.colors.textSecondary,
                  fontFamily: tokens.typography.fontFamilies.body,
                }}
              >
                {announcement.content}
              </Text>
            </Card>
          ))}
        </View>
      )}

      {/* Featured Release */}
      {featured && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Release</Text>
          <FeaturedRelease release={featured} />
        </View>
      )}

      {/* Recent Releases */}
      {recent.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Music</Text>
          <View style={{ paddingHorizontal: tokens.spacing[4] }}>
            {recent.map((music) => (
              <Card key={music.id} variant="standard">
                <Text
                  style={{
                    fontSize: tokens.typography.sizes.base,
                    fontWeight: tokens.typography.weights.semibold as TextStyle['fontWeight'],
                    color: tokens.colors.text,
                    marginBottom: tokens.spacing[1],
                    fontFamily: tokens.typography.fontFamilies.body,
                  }}
                >
                  {music.title}
                </Text>
                <Text
                  style={{
                    fontSize: tokens.typography.sizes.sm,
                    color: tokens.colors.textSecondary,
                    fontFamily: tokens.typography.fontFamilies.body,
                  }}
                >
                  {music.artistName}
                </Text>
              </Card>
            ))}
          </View>
        </View>
      )}

      {/* Social Feed Preview */}
      {social.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest from Social</Text>
          {social.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.socialItem}>
              <Card variant="standard">
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: tokens.spacing[2],
                  }}
                >
                  <Badge text={item.platform} variant="primary" size="sm" />
                  <Text
                    style={{
                      fontSize: tokens.typography.sizes.xs,
                      color: tokens.colors.textTertiary,
                      fontFamily: tokens.typography.fontFamilies.body,
                    }}
                  >
                    {new Date(item.postedAt).toLocaleDateString()}
                  </Text>
                </View>
                {item.description && (
                  <Text
                    style={{
                      fontSize: tokens.typography.sizes.sm,
                      color: tokens.colors.text,
                      marginBottom: tokens.spacing[2],
                      fontFamily: tokens.typography.fontFamilies.body,
                    }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                )}
                <Button
                  title={`View on ${item.platform}`}
                  onPress={() => {}}
                  variant="tertiary"
                  size="sm"
                  fullWidth
                />
              </Card>
            </View>
          ))}
        </View>
      )}

      {/* Dreamers Club CTA */}
      <View style={styles.ctaBanner}>
        <Text style={styles.ctaTitle}>Join The Dreamers Club</Text>
        <Text style={styles.ctaSubtitle}>
          Connect with the community and get exclusive content
        </Text>
        <Button
          title="Join Discord"
          onPress={() => {}}
          variant="primary"
          fullWidth
        />
      </View>
    </SafeArea>
  );
}
