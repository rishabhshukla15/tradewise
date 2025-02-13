import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { WebContainer } from '../../components/WebContainer';
import { AIStockAnalysis } from '../../components/AIAnalysis/AIStockAnalysis';

export default function SearchScreen() {
  return (
    <WebContainer>
      <ScrollView style={styles.container}>
        <AIStockAnalysis />
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 