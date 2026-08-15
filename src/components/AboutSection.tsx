import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Cpu,
  Heart,
  Globe2,
  Users2,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = translations[language].about;

  return (
    <section
      id="about"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: About Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/40">
              <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Building for India's 140+ Million Farmers</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.mission}
            </p>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  State-of-the-Art AI
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Gemini-powered vision and natural language models calibrated on Indian agro-climatic datasets.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2.5">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Hyperlocal Grounding
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Tailored to Indian states, rainfall patterns, APMC mandis, and local soil types.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Farmer-First Design
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  100% free, voice-enabled, low-bandwidth optimized with regional language voice synthesis.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Thriving Field Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&w=800&q=80"
                alt="Farmer in organic crop farm"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    Sustainable AgriTech
                  </div>
                  <h4 className="text-base font-bold mt-0.5">
                    Empowering Every Kisan with Smart Intelligence
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
