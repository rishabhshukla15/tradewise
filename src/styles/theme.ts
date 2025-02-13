import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  brandRegular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  brandMedium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  brandBold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
};

export const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#58CC02',
    secondary: '#58CC02',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#4B4B4B',
    disabled: '#AFAFAF',
    placeholder: '#AFAFAF',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF4B4B',
    error: '#FF4B4B',
    success: '#58CC02',
  },
  roundness: 16,
  fonts: configureFonts({ config: fontConfig }),
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
}; 