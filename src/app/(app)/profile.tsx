import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { WebContainer } from '../../components/WebContainer';
import { spacing, typography } from '../../styles/theme';
import { useStore } from '../../context/useStore';
import { signOut } from '../../services/supabaseClient';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <WebContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Avatar.Text 
            size={80} 
            label={user?.email?.[0].toUpperCase() || 'U'} 
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.title}>
            {user?.email?.split('@')[0]}
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Joined March 2024
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Trades</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Account Settings
          </Text>
          <Button 
            mode="outlined" 
            onPress={handleSignOut}
            style={styles.signOutButton}
            contentStyle={styles.signOutButtonContent}
          >
            Sign Out
          </Button>
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
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#58CC02',
    marginBottom: spacing.md,
  },
  title: {
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: '#777777',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
  },
  statNumber: {
    color: '#58CC02',
    fontWeight: '700',
    textAlign: 'center',
  },
  statLabel: {
    color: '#777777',
    textAlign: 'center',
    fontSize: typography.fontSizes.sm,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  signOutButton: {
    borderColor: '#dc2626',
    borderRadius: 12,
  },
  signOutButtonContent: {
    height: 48,
  },
}); 