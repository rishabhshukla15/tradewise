# Project: TradeWise - Trading Journal and AI Insights.

## Tech Stack
- **Frontend:** React Native (TypeScript, Expo, Expo Router)
- **Backend:** Supabase
- **UI Framework:** React Native Paper
- **Styling:** Tailwind CSS
- **AI Processing:** Gemini API

## Features
1. **Trader’s Diary** – Users can log daily trades, track emotions, and review AI-generated insights.
2. **Overtrading Alert** – AI detects emotional trading and warns users.
3. **Market Sentiment & News** – Real-time stock insights based on AI analysis.
4. **Gamification & Challenges** – Badges, leaderboards, and trading challenges.
5. **AI Trade Tips** – AI suggests improvements based on past trades.
6. **Community Forum** – Traders discuss strategies and market trends.
8. **Stock Market Calendar** – Alerts for IPOs, earnings reports, and major events.

## Development Guidelines
- **State Management:** Use React Context API or Zustand.
- **Authentication:** Supabase Auth (email, OAuth, magic link).
- **Database:** Supabase Postgres for storing user data and trades.
- **AI Integration:** Gemini API for trade analysis and insights.
- **Navigation:** Expo Router for deep linking and smooth transitions.
- **Performance Optimization:** Use Suspense and lazy loading where needed.

## Folder Structure
/src /components # Reusable UI components (buttons, cards, etc.) /screens # App screens (Home, Diary, Insights, etc.) /context # Global state and API calls /utils # Helper functions /assets # Images, icons /styles # Tailwind CSS classes


## Notes for Cursor AI
- Suggest optimized queries for Supabase.
- Use best practices for React Native and TypeScript.
- Guide in integrating Gemini API efficiently.
- Ensure Expo Router is properly configured for navigation.

Folder Structure (React Native with Expo & Supabase)

/src
  /components        # Reusable UI components
    /TraderDiary.tsx
    /OvertradingAlert.tsx
    /MarketSentiment.tsx
    /Gamification.tsx
    /AITradeTips.tsx
    /CommunityForum.tsx
  /screens           # Screens for navigation
    /HomeScreen.tsx
    /DiaryScreen.tsx
    /MarketScreen.tsx
    /ChallengesScreen.tsx
    /ForumScreen.tsx
  /context           # Global state management (Zustand/Context API)
    /UserContext.tsx
    /TradeContext.tsx
  /services          # API & Supabase integration
    /supabaseClient.ts
    /geminiAPI.ts
  /utils             # Utility functions
  /assets            # Images, icons, etc.
  /styles            # Tailwind CSS classes
  /navigation        # Expo Router setup
  /constants         # App-wide constants


