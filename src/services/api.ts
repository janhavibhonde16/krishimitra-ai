import {
  ChatMessage,
  CropRecommendationInput,
  CropRecommendationItem,
  DiseaseDetectionResult,
  Language,
  MandiItem,
  WeatherData,
} from '../types';

export const apiService = {
  // Send message to Gemini-backed Chatbot
  async sendChatMessage(
    message: string,
    language: Language,
    history: ChatMessage[] = [],
    weatherContext?: { temperature: number; humidity: number; rainProbability: number; city: string }
  ): Promise<{ reply: string; languageDetected?: string }> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, history, weatherContext }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      console.error('Chat API request failed:', err);
      throw new Error(
        language === 'mr'
          ? 'एआय संवाद तात्पुरता अनुपलब्ध आहे. कृपया पुन्हा प्रयत्न करा.'
          : language === 'hi'
          ? 'एआई चैटबॉट सेवा अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।'
          : 'AI Assistant is temporarily unavailable. Please try again.'
      );
    }
  },

  // Disease detection from photo base64
  async detectCropDisease(
    imageBase64: string,
    mimeType = 'image/jpeg',
    cropHint = '',
    language: Language = 'en'
  ): Promise<DiseaseDetectionResult> {
    try {
      const response = await fetch('/api/disease-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType, cropHint, language }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.result) {
        throw new Error('Invalid response structure from disease detection engine.');
      }
      return data.result;
    } catch (err: any) {
      console.error('Disease detection API failed:', err);
      throw new Error(
        language === 'mr'
          ? 'पीक रोग तपासणी अयशस्वी झाली. कृपया स्पष्ट फोटो अपलोड करा.'
          : language === 'hi'
          ? 'फसल रोग जांच विफल रही। कृपया साफ फोटो अपलोड कर पुनः प्रयास करें।'
          : 'Crop disease analysis failed. Please provide a clear photo and try again.'
      );
    }
  },

  // Crop recommendation with live weather integration
  async getCropRecommendation(
    input: CropRecommendationInput,
    language: Language = 'en',
    weatherContext?: Partial<WeatherData> | null
  ): Promise<CropRecommendationItem[]> {
    try {
      const response = await fetch('/api/crop-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...input,
          language,
          weatherContext: weatherContext || input.weatherContext || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate crop plan: ${response.statusText}`);
      }

      const data = await response.json();
      return data.recommendations || [];
    } catch (err: any) {
      console.error('Crop recommendation API failed:', err);
      throw new Error(
        language === 'mr'
          ? 'पीक शिफारस लोड करण्यात त्रुटी झाली. कृपया माहिती तपासून पुन्हा सबमिट करा.'
          : language === 'hi'
          ? 'फसल अनुशंसा लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'Could not load crop recommendations. Please check your farm details and retry.'
      );
    }
  },

  // Weather query
  async getWeather(queryCity = 'Buldhana, Maharashtra', lat?: number, lon?: number): Promise<WeatherData> {
    try {
      let url = `/api/weather?q=${encodeURIComponent(queryCity)}`;
      if (lat !== undefined && lon !== undefined) {
        url = `/api/weather?lat=${lat}&lon=${lon}&q=${encodeURIComponent(queryCity)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather data fetch failed.');
      }

      return await response.json();
    } catch (err: any) {
      console.error('Weather API failed:', err);
      throw new Error('Weather information is temporarily unavailable. Please retry.');
    }
  },

  // Weather + AI Farming Advice
  async getWeatherAdvice(weather: WeatherData, crop = 'General Crops', language: Language = 'en'): Promise<string> {
    try {
      const response = await fetch('/api/weather-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weather, crop, language }),
      });

      if (!response.ok) throw new Error('Failed to generate advice');
      const data = await response.json();
      return data.advice || '';
    } catch (err) {
      console.warn('Weather advice error:', err);
      return '';
    }
  },

  // Mandi prices
  async getMandiPrices(search = '', state = '', category = ''): Promise<{
    items: MandiItem[];
    total: number;
    isLiveApi: boolean;
    dataSourceNotice: string;
    lastUpdated: string;
  }> {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (state && state !== 'all') params.append('state', state);
      if (category && category !== 'all') params.append('category', category);

      const response = await fetch(`/api/mandi-prices?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to load Mandi rates.');
      }

      return await response.json();
    } catch (err: any) {
      console.error('Mandi API error:', err);
      throw new Error('Market price data is temporarily unavailable. Please retry.');
    }
  },
};
