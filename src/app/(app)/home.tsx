import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useStore } from '../../context/useStore';
import { spacing, typography } from '../../styles/theme';
import { fetchMarketData } from '../../services/marketDataService';
import { WebContainer } from '../../components/WebContainer';

interface MarketData {
  symbol: string;
  lastPrice: number;
  change: number;
  percentChange: number;
}

export default function HomeScreen() {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [marketData, setMarketData] = useState<{ nifty: MarketData; sensex: MarketData } | null>(null);

  const fetchData = async () => {
    try {
      const marketDataResponse = await fetchMarketData();
      setMarketData(marketDataResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMarketCard = (data: MarketData) => (
    <View style={styles.marketCard}>
      <Text style={styles.marketSymbol}>{data.symbol}</Text>
      <Text style={[styles.marketPrice, { color: '#16a34a' }]}>
        {data.lastPrice.toLocaleString()}
      </Text>
      <Text style={[styles.marketChange, { color: '#16a34a' }]}>
        ▲ {Math.abs(data.change).toFixed(2)} ({Math.abs(data.percentChange).toFixed(2)}%)
      </Text>
    </View>
  );

  return (
    <WebContainer>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome, {user?.email?.split('@')[0]}! 👋
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Here's your daily trading insights
          </Text>
        </View>

        <View style={styles.marketCardsContainer}>
          {renderMarketCard(marketData?.nifty || { symbol: 'NIFTY 50', lastPrice: 0, change: 0, percentChange: 0 })}
          {renderMarketCard(marketData?.sensex || { symbol: 'SENSEX', lastPrice: 0, change: 0, percentChange: 0 })}
        </View>

        <View style={styles.quickActions}>
          <Card style={[styles.actionCard, { marginRight: spacing.md }]}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.actionTitle}>
                Log Trade
              </Text>
              <Text variant="bodyMedium" style={styles.actionDescription}>
                Record your latest trade details
              </Text>
              <Button mode="contained" style={styles.actionButton}>
                Add Trade
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.actionCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.actionTitle}>
                Analysis
              </Text>
              <Text variant="bodyMedium" style={styles.actionDescription}>
                View your trading patterns
              </Text>
              <Button mode="contained" style={styles.actionButton}>
                View Stats
              </Button>
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
  },
  title: {
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: '#777777',
  },
  marketCardsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  marketCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  marketSymbol: {
    fontWeight: '700',
    color: '#1A1A1A',
    fontSize: typography.fontSizes.md,
    marginBottom: spacing.xs,
  },
  marketPrice: {
    fontWeight: '700',
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  marketChange: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  },
  quickActions: {
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
  },
  actionTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  actionDescription: {
    color: '#777777',
    marginBottom: spacing.md,
  },
  actionButton: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
  },
}); 