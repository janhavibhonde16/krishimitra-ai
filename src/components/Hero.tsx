import React from 'react';
import {
  Bot,
  ScanEye,
  Compass,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  Languages,
  ArrowRight,
} from 'lucide-react';
import { Language, WeatherData } from '../types';
import { translations } from '../i18n/translations';

interface HeroProps {
  language: Language;
  weatherData?: WeatherData | null;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, weatherData, onNavigate }) => {
  const t = translations[language].hero;

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-amber-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-400/15 dark:bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-500/10 dark:bg-green-600/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines, CTAs, Badges */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>{t.tagline}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              <span className="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 dark:from-emerald-400 dark:via-green-300 dark:to-emerald-500 bg-clip-text text-transparent">
                {t.heading}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-talk-ai-btn"
                onClick={() => onNavigate('assistant')}
                className="group flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{t.talkToAI}</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-detect-disease-btn"
                onClick={() => onNavigate('disease')}
                className="group flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-600/30 dark:border-emerald-500/40 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <ScanEye className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>{t.detectDisease}</span>
              </button>

              <button
                id="hero-crop-rec-btn"
                onClick={() => onNavigate('recommendation')}
                className="group flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500 text-slate-950 dark:text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                <span>{t.getCropRec}</span>
              </button>
            </div>

            {/* Small Trust Features / Badges below buttons */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.trustBadges.aiPowered}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CloudSun className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{t.trustBadges.liveWeather}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>{t.trustBadges.diseaseDetection}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{t.trustBadges.farmerFriendly}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 col-span-2 sm:col-span-1">
                  <Languages className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{t.trustBadges.multilingual}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card with Indian Farming Imagery & Live Status */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame with Layered Shadows */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-emerald-900 group">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                  alt="Indian farmer inspecting thriving green crop field"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                {/* Gradient Overlays for High-end Feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                          Smart Farm Intelligence
                        </span>
                      </div>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        Precision Advisory Active
                      </h2>
                    </div>

                    {weatherData && (
                      <div className="text-right pl-3 border-l border-slate-200 dark:border-slate-700">
                        <div className="text-lg font-black text-slate-900 dark:text-white leading-none">
                          {weatherData.temperature}°C
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[90px]">
                          {weatherData.city}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                    Real-time crop disease diagnosis, weather-integrated crop recommendations, and tailored sowing calendars.
                  </p>
                </div>
              </div>

              {/* Floating Top-Left Micro Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-emerald-100 dark:border-slate-800 flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">94% Accuracy</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">AI Disease Model</div>
                </div>
              </div>

              {/* Floating Bottom-Right Micro Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-amber-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Multilingual</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">EN, हिंदी & मराठी</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
