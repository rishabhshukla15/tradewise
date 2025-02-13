import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { AuthInput } from '../../components/auth/AuthInput';
import { signUpWithEmail } from '../../services/supabaseClient';
import { useStore } from '../../context/useStore';
import { spacing, typography } from '../../styles/theme';
import { WebContainer } from '../../components/WebContainer';
import { Logo } from '../../components/Logo';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setUser = useStore((state) => state.setUser);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const { data, error: authError } = await signUpWithEmail(email, password);
      
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
    <WebContainer maxWidth={400}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            Create Account
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
              placeholder="Email"
            />

            <AuthInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              errorText={error}
              style={styles.input}
              placeholder="Password"
            />

            <AuthInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              errorText={error}
              style={styles.input}
              placeholder="Confirm Password"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              style={styles.signupButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Sign Up
            </Button>

            <View style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Button
                mode="text"
                onPress={() => router.push('/login')}
                labelStyle={styles.loginLabel}
                compact
              >
                Log In
              </Button>
            </View>
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
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  signupButton: {
    backgroundColor: '#58CC02',
    borderRadius: 12,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
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
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#777777',
    fontSize: typography.fontSizes.md,
  },
  loginLabel: {
    color: '#58CC02',
    fontSize: typography.fontSizes.md,
    fontWeight: '700',
    marginLeft: -spacing.xs,
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