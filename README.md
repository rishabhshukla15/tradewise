# TradeWise 📈

TradeWise is a modern trading companion app designed to help traders track market movements, analyze stocks, and maintain their trading journal. Built with React Native and Expo, it provides a seamless experience across web and mobile platforms.

## Features 🚀

### 1. Market Overview
- Real-time tracking of NIFTY 50 and SENSEX indices
- Price movements with percentage changes
- Clean and intuitive market cards display

### 2. Stock Analysis
- Advanced stock analysis tool in the Search tab
- Technical indicators (RSI, MACD)
- Support and resistance levels
- Fundamental metrics
- News and upcoming events

### 3. News Feed
- Latest market updates
- Personalized news based on your interests
- Important market events and announcements

### 4. Trading Journal
- Log your trades with detailed information
- Track your trading patterns
- Record trade emotions and notes
- View comprehensive trading statistics

### 5. User Profile
- Track your trading streak
- View trade accuracy
- Monitor overall performance
- Manage account settings

## Technology Stack 💻

- **Frontend Framework**: React Native + Expo
- **UI Components**: React Native Paper
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Backend**: Supabase
- **AI Integration**: Google Gemini API
- **Styling**: StyleSheet API

## Getting Started 🏁

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tradewise.git
```

2. Install dependencies:
```bash
cd tradewise
npm install
```

3. Set up environment variables:
Create a `.env` file with the following:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:
```bash
npx expo start
```

## Environment Setup 🛠️

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Supabase account
- Google Cloud account (for Gemini API)

### Development
- Web: Run `npx expo start --web`
- iOS: Run `npx expo start --ios`
- Android: Run `npx expo start --android`

## Project Structure 📁

```
tradewise/
├── src/
│   ├── app/                 # App screens and navigation
│   ├── components/          # Reusable components
│   ├── context/            # Global state management
│   ├── services/           # API and external services
│   ├── styles/             # Theme and styling
│   └── constants/          # App constants
├── assets/                 # Static assets
└── docs/                   # Documentation
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security 🔒

- Authentication handled by Supabase
- Environment variables for sensitive data
- API key protection
- Regular security updates

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Created By 👨‍💻

ShuklaJi - Building tools for better trading

---

For support, email support@tradewise.com or open an issue in the repository.
