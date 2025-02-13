import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../constants/config';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateContent = async (prompt: string) => {
  try {
    // Using gemini-1.5-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in generateContent:', error);
    throw error;
  }
};

export const generateTradeAnalysis = async (prompt: string) => {
  try {
    return await generateContent(prompt);
  } catch (error) {
    console.error('Error generating trade analysis:', error);
    throw error;
  }
};

export const generateMarketInsights = async () => {
  const prompt = `As an AI trading assistant, provide a brief market analysis and key insights for today. Include:
  1. Overall market sentiment
  2. Key market movers
  3. Important events to watch
  4. Trading tips for today
  Keep it concise and actionable.`;

  return generateTradeAnalysis(prompt);
};

export const generateStockAnalysis = async (symbol: string) => {
  console.log('Starting stock analysis for:', symbol);
  
  const prompt = `Analyze ${symbol} stock and provide a detailed analysis. Return ONLY a JSON object with NO additional text, following this EXACT structure:

{
  "overview": {
    "summary": "A concise overview of ${symbol} and its current market position",
    "recommendation": "Buy/Sell/Hold",
    "riskLevel": "Low/Medium/High"
  },
  "technicalAnalysis": {
    "trend": "Describe the current price trend",
    "keyLevels": {
      "support": ["Support price 1", "Support price 2"],
      "resistance": ["Resistance price 1", "Resistance price 2"]
    },
    "indicators": [
      {
        "name": "RSI",
        "value": "Current RSI value",
        "signal": "Buy/Sell/Neutral"
      },
      {
        "name": "MACD",
        "value": "Current MACD value",
        "signal": "Buy/Sell/Neutral"
      }
    ]
  },
  "fundamentalAnalysis": {
    "metrics": {
      "pe": "Current P/E ratio",
      "pbv": "Current P/BV ratio",
      "roe": "Current ROE value",
      "debtToEquity": "Current D/E ratio"
    },
    "strengths": [
      "First key strength",
      "Second key strength"
    ],
    "weaknesses": [
      "First key weakness",
      "Second key weakness"
    ]
  },
  "newsAndEvents": {
    "recentNews": [
      {
        "date": "Recent date",
        "headline": "Recent news headline",
        "impact": "Positive/Negative/Neutral"
      }
    ],
    "upcomingEvents": [
      {
        "date": "Upcoming date",
        "event": "Upcoming event description",
        "significance": "High/Medium/Low"
      }
    ]
  }
}

Important: Ensure the response is ONLY the JSON object with NO additional text or formatting. The response must be valid JSON that can be parsed directly.`;

  try {
    console.log('Initializing Gemini model');
    const response = await generateContent(prompt);
    console.log('Raw response:', response);

    // Clean up the response to ensure it's valid JSON
    const cleanedResponse = response
      .trim()
      // Remove any markdown code block indicators
      .replace(/```json/g, '')
      .replace(/```/g, '')
      // Remove any leading/trailing whitespace
      .trim();

    try {
      const parsedData = JSON.parse(cleanedResponse);
      console.log('Successfully parsed JSON response');
      
      // Validate the structure
      if (!parsedData.overview || !parsedData.technicalAnalysis || 
          !parsedData.fundamentalAnalysis || !parsedData.newsAndEvents) {
        throw new Error('Invalid response structure');
      }

      return parsedData;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('Cleaned response:', cleanedResponse);
      throw new Error('Failed to parse analysis data. Please try again.');
    }
  } catch (error) {
    console.error('Error in generateStockAnalysis:', error);
    throw error;
  }
};

export const analyzeTradingStyle = async (trades: string) => {
  const prompt = `As an AI trading assistant, analyze the following trading history and provide insights:
  ${trades}
  
  Please provide:
  1. Pattern analysis
  2. Risk management assessment
  3. Areas for improvement
  4. Specific recommendations
  
  Keep it constructive and actionable.`;

  return generateTradeAnalysis(prompt);
}; 