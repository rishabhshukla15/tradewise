import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { AuthInput } from '../../components/auth/AuthInput';
import { signInWithEmail } from '../../services/supabaseClient';
import { useStore } from '../../context/useStore';
import { spacing, typography } from '../../styles/theme';
import { Logo } from '../../components/Logo';
import { WebContainer } from '../../components/WebContainer';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error: authError } = await signInWithEmail(email, password);
      
      if (authError) {
        setError(authError.message);
        return;
      }

      if (data?.user) {
        setUser(data.user);
        router.replace('/home');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WebContainer>
      <View style={styles.container}>
        <View style={styles.content}>
          <Logo size={80} />
          <Text variant="headlineMedium" style={styles.title}>
            Welcome back
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Log in to continue your trading journey
          </Text>

          <View style={styles.form}>
            <AuthInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              errorText={error}
              style={styles.input}
            />

            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              errorText={error}
              style={styles.input}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              LOG IN
            </Button>

            <Button
              mode="text"
              onPress={() => router.push('/signup')}
              style={styles.signupButton}
              labelStyle={styles.signupLabel}
            >
              CREATE ACCOUNT
            </Button>
          </View>
        </View>

        <View style={styles.footer}>
          <Logo size={24} />
          <Text style={styles.footerText}>TradeWise</Text>
          <Text style={styles.footerDivider}>•</Text>
          <Text style={styles.footerText}>Created By ShuklaJi</Text>
        </View>
      </View>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: '#58CC02',
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    color: '#777777',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: '#F7F7F7',
  },
  loginButton: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
    marginBottom: spacing.md,
    height: 50,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: typography.fontSizes.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signupButton: {
    borderRadius: 12,
  },
  signupLabel: {
    color: '#58CC02',
    fontSize: typography.fontSizes.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  error: {
    color: '#FF4B4B',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.lg,
  },
  footerText: {
    color: '#777777',
    fontSize: typography.fontSizes.sm,
    marginLeft: spacing.xs,
  },
  footerDivider: {
    color: '#777777',
    marginHorizontal: spacing.xs,
    fontSize: typography.fontSizes.sm,
  },
}); 