import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { WebContainer } from '../../components/WebContainer';
import { spacing, typography } from '../../styles/theme';

export default function NewsScreen() {
  return (
    <WebContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Market News
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Stay updated with the latest market insights
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Top Stories
          </Text>
          <Card style={styles.newsCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.newsTitle}>
                Market Update: Nifty, Sensex hit new highs
              </Text>
              <Text style={styles.newsTime}>2 hours ago</Text>
              <Text style={styles.newsDescription}>
                Indian markets continue their bullish trend as foreign investors show confidence in the economy.
              </Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Based on Your Interests
          </Text>
          <Card style={styles.newsCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.newsTitle}>
                TCS Announces Strong Q4 Results
              </Text>
              <Text style={styles.newsTime}>5 hours ago</Text>
              <Text style={styles.newsDescription}>
                Tata Consultancy Services reports better-than-expected quarterly profits.
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: '#777777',
  },
  section: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  newsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  newsTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  newsTime: {
    color: '#777777',
    fontSize: typography.fontSizes.sm,
    marginBottom: spacing.sm,
  },
  newsDescription: {
    color: '#1A1A1A',
    lineHeight: 22,
  },
}); 