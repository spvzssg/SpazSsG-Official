/**
 * Safe Area Wrapper Component
 */

import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import { tokens } from '@/styles/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeAreaProps extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function SafeArea({
  children,
  scrollable = true,
  edges = ['top', 'bottom'],
  style,
  contentContainerStyle,
  ...props
}: SafeAreaProps) {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: Math.max(tokens.spacing[4], insets.left),
      paddingRight: Math.max(tokens.spacing[4], insets.right),
      paddingTop: edges.includes('top') ? Math.max(tokens.spacing[4], insets.top) : 0,
      paddingBottom: edges.includes('bottom') ? Math.max(tokens.spacing[4], insets.bottom) : 0,
      backgroundColor: tokens.colors.background,
    } as ViewStyle,
    contentContainer: {
      flexGrow: 1,
    } as ViewStyle,
  });

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}
