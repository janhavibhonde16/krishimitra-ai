import React, { useState } from 'react';
import {
  CloudSun,
  Search,
  MapPin,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  Compass,
  AlertCircle,
  Sparkles,
  Bot,
  RefreshCw,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Language, WeatherData } from '../types';
import { apiService } from '../services/api';
import { translations } from '../i18n/translations';

interface WeatherDashboardProps {
  language: Language;
  weatherData: WeatherData | null;
  onWeatherChange: (data: WeatherData) => void;
  onShowToast: (msg: string) => void;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  language,
  weatherData,
  onWeatherChange,
  onShowToast,
}) => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Cotton & Soybean');
  const [isFetching, setIsFetching] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);

  const t = translations[language].weather;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const city = searchCity.trim() || 'Pune, Maharashtra';
    setIsFetching(true);
    try {
      const data = await apiService.getWeather(city);
      onWeatherChange(data);
      setAiAdvice(null);
      onShowToast(`Loaded weather for ${data.city}`);
    } catch (err: any) {
      onShowToast(err.message || 'Failed to load weather data');
    } finally {
      setIsFetching(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      onShowToast('Geolocation is not supported by your browser.');
      return;
    }

    setIsFetching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await apiService.getWeather('Current Farm Location', latitude, longitude);
          onWeatherChange(data);
          setAiAdvice(null);
          onShowToast(`Located farm coordinates (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
        } catch (err: any) {
          onShowToast('Could not fetch weather for current location.');
        } finally {
          setIsFetching(false);
        }
      },
      (error) => {
        setIsFetching(false);
        onShowToast('Location permission denied. Please search district manually.');
      },
      { timeout: 10000 }
    );
  };

  const handleGenerateAiAdvice = async () => {
    if (!weatherData) return;
    setIsGeneratingAdvice(true);
    try {
      const advice = await apiService.getWeatherAdvice(weatherData, selectedCrop, language);
      setAiAdvice(advice);
    } catch (err) {
      onShowToast('Failed to generate AI advice');
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  const popularDistricts = [
    'Pune',
    'Nagpur',
    'Nashik',
    'Chhatrapati Sambhajinagar',
    'Latur',
    'Indore',
    'Ludhiana',
    'Jaipur',
    'Coimbatore',
  ];

  return (
    <section
      id="weather"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-bold mb-3 border border-sky-300/40">
            <CloudSun className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Hyperlocal Agro-Meteorological Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Location Search Bar & Quick District Pills */}
        <div className="max-w-3xl mx-auto mb-8 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="weather-search-input"
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isFetching}
              className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {isFetching ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{t.searchBtn}</span>
            </button>

            <button
              type="button"
              id="gps-location-btn"
              onClick={handleCurrentLocation}
              disabled={isFetching}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer shrink-0"
              title={t.useLocation}
            >
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </button>
          </form>

          {/* Quick Districts Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Popular:</span>
            {popularDistricts.map((district) => (
              <button
                key={district}
                id={`district-chip-${district}`}
                onClick={async () => {
                  setSearchCity(district);
                  setIsFetching(true);
                  try {
                    const data = await apiService.getWeather(`${district}, India`);
                    onWeatherChange(data);
                    setAiAdvice(null);
                  } finally {
                    setIsFetching(false);
                  }
                }}
                className="text-xs bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shrink-0 transition-colors"
              >
                {district}
              </button>
            ))}
          </div>
        </div>

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Main Current Weather Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white rounded-3xl p-7 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-sky-100 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{weatherData.city}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black mt-1">
                    {weatherData.temperature}°C
                  </div>
                </div>

                <div className="text-right">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
                    <Sun className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold text-sky-100 mt-1">
                    {weatherData.condition}
                  </div>
                </div>
              </div>

              {/* 4 Essential Agronomy Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20">
                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Droplets className="w-4 h-4 mx-auto text-sky-200 mb-1" />
                  <div className="text-xs text-sky-100">{t.humidity}</div>
                  <div className="text-sm font-extrabold">{weatherData.humidity}%</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Wind className="w-4 h-4 mx-auto text-sky-200 mb-1" />
                  <div className="text-xs text-sky-100">{t.windSpeed}</div>
                  <div className="text-sm font-extrabold">{weatherData.windSpeed} km/h</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <CloudRain className="w-4 h-4 mx-auto text-sky-200 mb-1" />
                  <div className="text-xs text-sky-100">{t.rainChance}</div>
                  <div className="text-sm font-extrabold">{weatherData.rainProbability}%</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-3 text-center">
                  <Sun className="w-4 h-4 mx-auto text-amber-200 mb-1" />
                  <div className="text-xs text-sky-100">{t.uvIndex}</div>
                  <div className="text-sm font-extrabold">{weatherData.uvIndex} (Mod)</div>
                </div>
              </div>

              {/* AI Weather-Agro Advisory */}
              <div className="mt-6 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-200 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.advisoryTitle}</span>
                </div>
                <p className="text-xs text-sky-50 leading-relaxed font-medium">
                  {weatherData.farmingAdvisory}
                </p>
              </div>
            </div>

            {/* Right: 7-Day Forecast & Gemini Advisory Tool */}
            <div className="lg:col-span-7 space-y-6">
              {/* 7-Day Forecast Horizontal Scroller */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>{t.forecastTitle}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">7-Day Agro Outlook</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {weatherData.forecast.map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl text-center border transition-all ${
                        idx === 0
                          ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {day.day}
                      </div>
                      <div className="my-2">
                        {day.rainProbability > 40 ? (
                          <CloudRain className="w-6 h-6 text-sky-500 mx-auto" />
                        ) : (
                          <Sun className="w-6 h-6 text-amber-500 mx-auto" />
                        )}
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {day.tempMax}°
                      </div>
                      <div className="text-[10px] text-slate-400">{day.tempMin}°</div>
                      <div className="text-[10px] font-bold text-sky-600 dark:text-sky-400 mt-1">
                        {day.rainProbability}% 🌧
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemini Crop-Specific Weather AI Advisor Card */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 rounded-3xl p-6 border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Generate AI Weather Spray & Irrigation Plan
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Combines live humidity, rain forecast & your crop type
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      placeholder="Enter Crop (e.g. Cotton, Onion, Wheat)"
                      className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                    <button
                      id="generate-weather-advice-btn"
                      onClick={handleGenerateAiAdvice}
                      disabled={isGeneratingAdvice}
                      className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingAdvice ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>Get Plan</span>
                    </button>
                  </div>
                </div>

                {aiAdvice && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Custom Farm Advisory for {selectedCrop}:</span>
                    </div>
                    <p className="whitespace-pre-line">{aiAdvice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
