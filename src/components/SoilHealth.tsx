import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  Droplets,
  MapPin,
  FileSpreadsheet,
} from 'lucide-react';
import { Language, SoilInfo } from '../types';
import { soilHealthData } from '../data/soilData';
import { translations } from '../i18n/translations';

interface SoilHealthProps {
  language: Language;
}

export const SoilHealth: React.FC<SoilHealthProps> = ({ language }) => {
  const [selectedSoil, setSelectedSoil] = useState<SoilInfo>(soilHealthData[0]);

  const t = translations[language].soil;

  const getNutrientBadge = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Low':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <section
      id="soil"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Soil Science & Nutrient Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Soil Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {soilHealthData.map((soil) => (
            <button
              key={soil.id}
              onClick={() => setSelectedSoil(soil)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedSoil.id === soil.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-emerald-50'
              }`}
            >
              <div className="text-xs font-black truncate">
                {language === 'mr' ? soil.marathiName : language === 'hi' ? soil.hindiName : soil.name}
              </div>
              <div
                className={`text-[10px] mt-1 font-medium truncate ${
                  selectedSoil.id === soil.id ? 'text-white/80' : 'text-slate-500'
                }`}
              >
                pH: {soil.typicalPh}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Soil Profile Display */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Major Indian Soil Classification
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {language === 'mr'
                  ? selectedSoil.marathiName
                  : language === 'hi'
                  ? selectedSoil.hindiName
                  : selectedSoil.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Typical pH Range:
              </span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                {selectedSoil.typicalPh}
              </span>
            </div>
          </div>

          {/* Regional Presence */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Prominent In:</span>
            </span>
            {selectedSoil.regions.map((reg, idx) => (
              <span
                key={idx}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-medium"
              >
                {reg}
              </span>
            ))}
          </div>

          {/* 4-Parameter Nutrient Benchmark Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="text-slate-400 font-semibold mb-1">Available Nitrogen (N)</div>
              <span
                className={`inline-block px-3 py-0.5 rounded-full font-bold ${getNutrientBadge(
                  selectedSoil.nutrientProfile.nitrogen
                )}`}
              >
                {selectedSoil.nutrientProfile.nitrogen}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="text-slate-400 font-semibold mb-1">Phosphorus (P)</div>
              <span
                className={`inline-block px-3 py-0.5 rounded-full font-bold ${getNutrientBadge(
                  selectedSoil.nutrientProfile.phosphorus
                )}`}
              >
                {selectedSoil.nutrientProfile.phosphorus}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="text-slate-400 font-semibold mb-1">Potash (K)</div>
              <span
                className={`inline-block px-3 py-0.5 rounded-full font-bold ${getNutrientBadge(
                  selectedSoil.nutrientProfile.potassium
                )}`}
              >
                {selectedSoil.nutrientProfile.potassium}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="text-slate-400 font-semibold mb-1">Organic Carbon (OC)</div>
              <span
                className={`inline-block px-3 py-0.5 rounded-full font-bold ${getNutrientBadge(
                  selectedSoil.nutrientProfile.organicCarbon
                )}`}
              >
                {selectedSoil.nutrientProfile.organicCarbon}
              </span>
            </div>
          </div>

          {/* Key Physical & Chemical Properties */}
          <div>
            <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider mb-2.5">
              Characteristics & Soil Behavior:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {selectedSoil.characteristics.map((char, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable Crops Badges */}
          <div>
            <h4 className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider mb-2.5">
              Highly Suitable Commercial & Food Crops:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedSoil.suitableCrops.map((crop, i) => (
                <span
                  key={i}
                  className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Soil Management & Reclamation Guidance */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
            <h4 className="text-xs font-extrabold uppercase text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Recommended Soil Correction & Management Tips:</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {selectedSoil.managementTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
