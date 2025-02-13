// Supabase Configuration
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

// Gemini API Configuration
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY?.trim() || '';

// App Constants
export const APP_NAME = 'TradeWise';
export const APP_VERSION = '1.0.0';

// Feature Flags
export const FEATURES = {
  TRADER_DIARY: true,
  OVERTRADING_ALERT: true,
  MARKET_SENTIMENT: true,
  GAMIFICATION: true,
  AI_TRADE_TIPS: true,
  COMMUNITY_FORUM: true,
  STOCK_CALENDAR: true,
};

// API Endpoints
export const API = {
  MARKET_DATA: '/api/market-data',
  TRADE_LOGS: '/api/trade-logs',
  USER_PROFILE: '/api/user-profile',
  COMMUNITY: '/api/community',
}; 