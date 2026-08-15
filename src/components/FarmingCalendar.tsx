import React, { useState } from 'react';
import {
  Calendar,
  Droplets,
  FlaskConical,
  Bug,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { farmingCalendarsData } from '../data/farmingCalendarData';
import { translations } from '../i18n/translations';

interface FarmingCalendarProps {
  language: Language;
}

export const FarmingCalendar: React.FC<FarmingCalendarProps> = ({ language }) => {
  const [selectedCropKey, setSelectedCropKey] = useState<'soybean' | 'cotton' | 'wheat'>('soybean');
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const t = translations[language].calendar;
  const currentCalendar = farmingCalendarsData[selectedCropKey];

  return (
    <section
      id="calendar"
      className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Crop Growth & Task Scheduler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Crop Selection Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                setSelectedCropKey('soybean');
                setActiveStageIndex(0);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCropKey === 'soybean'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              Soybean (सोयाबीन)
            </button>

            <button
              onClick={() => {
                setSelectedCropKey('cotton');
                setActiveStageIndex(0);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCropKey === 'cotton'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              Cotton (कापूस)
            </button>

            <button
              onClick={() => {
                setSelectedCropKey('wheat');
                setActiveStageIndex(0);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCropKey === 'wheat'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              Wheat (गहू / गेहूं)
            </button>
          </div>
        </div>

        {/* Calendar Timeline & Active Stage Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Stepper Navigation */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Growth Stages ({currentCalendar.season}):
            </div>
            {currentCalendar.stages.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStageIndex(idx)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between group cursor-pointer ${
                  activeStageIndex === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:bg-emerald-50 dark:hover:bg-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        activeStageIndex === idx
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {stage.dayRange}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold mt-1 leading-snug">
                    {stage.stageName}
                  </h4>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    activeStageIndex === idx ? 'translate-x-1' : 'opacity-40 group-hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Card */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {currentCalendar.cropName} • Stage #{activeStageIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {currentCalendar.stages[activeStageIndex].stageName}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-1.5 border border-emerald-300/40">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentCalendar.stages[activeStageIndex].dayRange}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              {currentCalendar.stages[activeStageIndex].description}
            </p>

            {/* 3 Structured Agronomy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Irrigation Schedule */}
              <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60">
                <h5 className="text-xs font-extrabold uppercase text-sky-800 dark:text-sky-300 flex items-center gap-1.5 mb-2">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  <span>{t.irrigation}</span>
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentCalendar.stages[activeStageIndex].irrigationNote}
                </p>
              </div>

              {/* Fertilizer & Foliar Spray */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60">
                <h5 className="text-xs font-extrabold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span>{t.fertilizer}</span>
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentCalendar.stages[activeStageIndex].fertilizerAction}
                </p>
              </div>

              {/* Pest & Disease Alerts */}
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60">
                <h5 className="text-xs font-extrabold uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                  <Bug className="w-4 h-4 text-amber-600" />
                  <span>{t.pestWatch}</span>
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentCalendar.stages[activeStageIndex].pestMonitoring}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
