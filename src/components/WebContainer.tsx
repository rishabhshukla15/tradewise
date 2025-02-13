import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface WebContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export const WebContainer = ({ children, maxWidth = 800 }: WebContainerProps) => {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { maxWidth }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 'auto',
  },
}); 