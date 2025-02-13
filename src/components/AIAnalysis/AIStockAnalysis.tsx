import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, ActivityIndicator, Divider } from 'react-native-paper';
import { spacing, typography } from '../../styles/theme';
import { generateStockAnalysis } from '../../services/geminiService';

interface StockAnalysis {
  overview: {
    summary: string;
    recommendation: string;
    riskLevel: string;
  };
  technicalAnalysis: {
    trend: string;
    keyLevels: {
      support: string[];
      resistance: string[];
    };
    indicators: {
      name: string;
      value: string;
      signal: string;
    }[];
  };
  fundamentalAnalysis: {
    metrics: {
      pe: string;
      pbv: string;
      roe: string;
      debtToEquity: string;
    };
    strengths: string[];
    weaknesses: string[];
  };
  newsAndEvents: {
    recentNews: {
      date: string;
      headline: string;
      impact: string;
    }[];
    upcomingEvents: {
      date: string;
      event: string;
      significance: string;
    }[];
  };
}

export const AIStockAnalysis = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [showInput, setShowInput] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!stockSymbol) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await generateStockAnalysis(stockSymbol);
      if (!result || !result.overview) {
        throw new Error('Invalid analysis data received');
      }
      setAnalysis(result);
      setShowInput(false);
    } catch (error) {
      console.error('Error analyzing stock:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze stock. Please try again.');
      setShowInput(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setStockSymbol('');
    setShowInput(true);
    setError(null);
  };

  if (isAnalyzing) {
    return (
      <Card style={styles.inputCard}>
        <Card.Content>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#58CC02" />
            <Text style={styles.loadingText}>Analyzing {stockSymbol}...</Text>
            <Text style={styles.loadingSubText}>This may take a few moments</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={styles.inputCard}>
        <Card.Content>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={resetAnalysis} style={[styles.button, styles.retryButton]}>
            Try Again
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (showInput) {
    return (
      <Card style={styles.inputCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Which stock would you like to analyze?
          </Text>
          <TextInput
            mode="outlined"
            label="Enter stock symbol (e.g., RELIANCE, TCS)"
            value={stockSymbol}
            onChangeText={setStockSymbol}
            style={styles.input}
            autoCapitalize="characters"
          />
          <Button
            mode="contained"
            onPress={handleAnalysis}
            style={styles.button}
            disabled={!stockSymbol || isAnalyzing}
          >
            Analyze Stock
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card style={styles.inputCard}>
        <Card.Content>
          <Text style={styles.errorText}>No analysis data available. Please try again.</Text>
          <Button mode="contained" onPress={resetAnalysis} style={styles.button}>
            Try Again
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.stockSymbol}>
          {stockSymbol}
        </Text>
        <Button mode="text" onPress={resetAnalysis}>
          Analyze Another Stock
        </Button>
      </View>

      {/* Overview Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Overview
          </Text>
          <Text style={styles.text}>{analysis.overview.summary}</Text>
          <View style={styles.recommendationContainer}>
            <Text style={styles.label}>Recommendation:</Text>
            <Text style={styles.recommendation}>{analysis.overview.recommendation}</Text>
          </View>
          <Text style={styles.riskLevel}>Risk Level: {analysis.overview.riskLevel}</Text>
        </Card.Content>
      </Card>

      {/* Technical Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Technical Analysis
          </Text>
          <Text style={styles.trendText}>{analysis.technicalAnalysis.trend}</Text>
          
          <Text style={styles.subTitle}>Key Levels</Text>
          <View style={styles.levelsContainer}>
            <View style={styles.levelColumn}>
              <Text style={styles.levelTitle}>Support</Text>
              {analysis.technicalAnalysis.keyLevels.support.map((level, index) => (
                <Text key={index} style={styles.levelText}>{level}</Text>
              ))}
            </View>
            <View style={styles.levelColumn}>
              <Text style={styles.levelTitle}>Resistance</Text>
              {analysis.technicalAnalysis.keyLevels.resistance.map((level, index) => (
                <Text key={index} style={styles.levelText}>{level}</Text>
              ))}
            </View>
          </View>

          <Text style={styles.subTitle}>Technical Indicators</Text>
          {analysis.technicalAnalysis.indicators.map((indicator, index) => (
            <View key={index} style={styles.indicatorRow}>
              <Text style={styles.indicatorName}>{indicator.name}</Text>
              <Text style={styles.indicatorValue}>{indicator.value}</Text>
              <Text style={[
                styles.indicatorSignal,
                { color: indicator.signal === 'Buy' ? '#16a34a' : 
                         indicator.signal === 'Sell' ? '#dc2626' : '#777777' }
              ]}>
                {indicator.signal}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Fundamental Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Fundamental Analysis
          </Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>P/E Ratio</Text>
              <Text style={styles.metricValue}>{analysis.fundamentalAnalysis.metrics.pe}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>P/BV Ratio</Text>
              <Text style={styles.metricValue}>{analysis.fundamentalAnalysis.metrics.pbv}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>ROE</Text>
              <Text style={styles.metricValue}>{analysis.fundamentalAnalysis.metrics.roe}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Debt/Equity</Text>
              <Text style={styles.metricValue}>{analysis.fundamentalAnalysis.metrics.debtToEquity}</Text>
            </View>
          </View>

          <View style={styles.strengthsWeaknesses}>
            <View style={styles.swColumn}>
              <Text style={styles.swTitle}>Strengths</Text>
              {analysis.fundamentalAnalysis.strengths.map((strength, index) => (
                <Text key={index} style={styles.swItem}>• {strength}</Text>
              ))}
            </View>
            <View style={styles.swColumn}>
              <Text style={styles.swTitle}>Weaknesses</Text>
              {analysis.fundamentalAnalysis.weaknesses.map((weakness, index) => (
                <Text key={index} style={styles.swItem}>• {weakness}</Text>
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* News and Events */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            News & Events
          </Text>
          
          <Text style={styles.subTitle}>Recent News</Text>
          {analysis.newsAndEvents.recentNews.map((news, index) => (
            <View key={index} style={styles.newsItem}>
              <Text style={styles.newsDate}>{news.date}</Text>
              <Text style={styles.newsHeadline}>{news.headline}</Text>
              <Text style={styles.newsImpact}>Impact: {news.impact}</Text>
              {index < analysis.newsAndEvents.recentNews.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}

          <Text style={[styles.subTitle, styles.upcomingEventsTitle]}>Upcoming Events</Text>
          {analysis.newsAndEvents.upcomingEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventName}>{event.event}</Text>
              <Text style={styles.eventSignificance}>Significance: {event.significance}</Text>
              {index < analysis.newsAndEvents.upcomingEvents.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCard: {
    margin: spacing.lg,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    elevation: 2,
  },
  title: {
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: '#58CC02',
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    color: '#777777',
    marginTop: spacing.md,
  },
  loadingSubText: {
    color: '#777777',
    marginTop: spacing.sm,
    fontSize: typography.fontSizes.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  stockSymbol: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  card: {
    margin: spacing.lg,
    marginTop: 0,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  text: {
    color: '#1A1A1A',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  recommendationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    color: '#777777',
    marginRight: spacing.sm,
  },
  recommendation: {
    color: '#16a34a',
    fontWeight: '600',
  },
  riskLevel: {
    color: '#777777',
  },
  trendText: {
    color: '#1A1A1A',
    marginBottom: spacing.md,
  },
  subTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontSize: typography.fontSizes.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  levelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  levelTitle: {
    color: '#777777',
    marginBottom: spacing.sm,
  },
  levelText: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  indicatorName: {
    flex: 2,
    color: '#1A1A1A',
  },
  indicatorValue: {
    flex: 1,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  indicatorSignal: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  metricItem: {
    width: '50%',
    padding: spacing.sm,
  },
  metricLabel: {
    color: '#777777',
    marginBottom: spacing.xs,
  },
  metricValue: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  strengthsWeaknesses: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  swColumn: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  swTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  swItem: {
    color: '#1A1A1A',
    marginBottom: spacing.xs,
  },
  newsItem: {
    marginBottom: spacing.md,
  },
  newsDate: {
    color: '#777777',
    fontSize: typography.fontSizes.sm,
  },
  newsHeadline: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginVertical: spacing.xs,
  },
  newsImpact: {
    color: '#777777',
  },
  upcomingEventsTitle: {
    marginTop: spacing.lg,
  },
  eventItem: {
    marginBottom: spacing.md,
  },
  eventDate: {
    color: '#777777',
    fontSize: typography.fontSizes.sm,
  },
  eventName: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginVertical: spacing.xs,
  },
  eventSignificance: {
    color: '#777777',
  },
  divider: {
    marginVertical: spacing.md,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    marginTop: spacing.md,
  },
}); 