import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface LogoProps {
  size?: number;
  color?: string;
}

export const Logo = ({ size = 120, color = '#58CC02' }: LogoProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text style={[styles.symbol, { color, fontSize: size * 0.5 }]}>₮</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5FAD7',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontWeight: '700',
  },
}); 