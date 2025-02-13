import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '../../styles/theme';

type AuthInputProps = React.ComponentProps<typeof TextInput> & {
  errorText?: string;
};

export const AuthInput = ({ errorText, style, ...props }: AuthInputProps) => {
  return (
    <TextInput
      mode="outlined"
      style={[styles.input, style]}
      error={!!errorText}
      outlineStyle={styles.outline}
      contentStyle={styles.content}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F7F7F7',
    height: 50,
  },
  outline: {
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
}); 