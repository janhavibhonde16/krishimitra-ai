import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Droplets,
  Calendar,
  DollarSign,
  AlertTriangle,
  Layers,
  MapPin,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { CropRecommendationInput, CropRecommendationItem, Language } from '../types';
import { apiService } from '../services/api';
import { translations } from '../i18n/translations';

interface CropRecommendationProps {
  language: Language;
  onShowToast: (msg: string) => void;
}

export const CropRecommendation: React.FC<CropRecommendationProps> = ({ language, onShowToast }) => {
  const [formInput, setFormInput] = useState<CropRecommendationInput>({
    soilType: 'Black Soil (काळी जमीन)',
    landAreaAcres: 3,
    state: 'Maharashtra',
    district: 'Pune',
    season: 'Kharif (खरीप)',
    waterAvailability: 'Drip Irrigation (ठिबक सिंचन)',
    budgetPerAcre: 'Medium (₹15,000 – ₹30,000/Acre)',
    farmingGoal: 'Maximum Profit (जास्तीत जास्त नफा)',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendationItem[] | null>(null);

  const t = translations[language].recommendation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload: CropRecommendationInput = {
        ...formInput,
        landArea: formInput.landAreaAcres || 3,
        landAreaAcres: formInput.landAreaAcres || 3,
        waterAvailability: formInput.waterAvailability,
        waterSource: formInput.waterAvailability,
        farmingObjective: formInput.farmingGoal,
        farmingGoal: formInput.farmingGoal,
        budget: formInput.budgetPerAcre,
      };
      const data = await apiService.getCropRecommendation(payload, language);
      setRecommendations(data);
      onShowToast('Custom AI Crop Plan calculated successfully!');
    } catch (err: any) {
      onShowToast(err.message || 'Failed to generate crop recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="recommendation"
      className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-300/40">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>AI Multi-Factor Agronomic Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/80 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-lg">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Enter Farm Profile Details</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Soil Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.soilType}
                </label>
                <select
                  value={formInput.soilType}
                  onChange={(e) => setFormInput({ ...formInput, soilType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="Black Soil (काळी जमीन)">Black Soil (काळी कसदार जमीन / Regur)</option>
                  <option value="Red / Yellow Soil (तांबडी जमीन)">Red / Sandy Loam Soil (तांबडी जमीन)</option>
                  <option value="Alluvial Loamy Soil (गाळाची जमीन)">Alluvial Loam (गाळाची जमीन / दोमट)</option>
                  <option value="Laterite Soil (जांभी जमीन)">Laterite Soil (जांभी जमीन - कोकण)</option>
                  <option value="Sandy / Desert Soil (वाळूयुक्त जमीन)">Sandy / Desert Soil (वाळूयुक्त)</option>
                  <option value="Clay / Heavy Soil (चिकणमाती)">Heavy Clay Soil (चिकणमाती)</option>
                </select>
              </div>

              {/* Land Area & Season */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.landArea} (Acres)
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    max={200}
                    value={formInput.landAreaAcres}
                    onChange={(e) =>
                      setFormInput({ ...formInput, landAreaAcres: parseFloat(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.season}
                  </label>
                  <select
                    value={formInput.season}
                    onChange={(e) => setFormInput({ ...formInput, season: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Kharif (June–Oct)">Kharif (खरीप / Monsoon)</option>
                    <option value="Rabi (Oct–March)">Rabi (रब्बी / Winter)</option>
                    <option value="Zaid / Summer (March–June)">Zaid (उन्हाळी / Summer)</option>
                    <option value="Annual / Perennial">Annual / Perennial (वार्षिक)</option>
                  </select>
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.state}
                  </label>
                  <input
                    type="text"
                    value={formInput.state}
                    onChange={(e) => setFormInput({ ...formInput, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.district}
                  </label>
                  <input
                    type="text"
                    value={formInput.district}
                    onChange={(e) => setFormInput({ ...formInput, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Water Availability */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t.waterSource}
                </label>
                <select
                  value={formInput.waterAvailability}
                  onChange={(e) => setFormInput({ ...formInput, waterAvailability: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Drip Irrigation (ठिबक सिंचन)">Drip Irrigation (ठिबक सिंचन - Assured)</option>
                  <option value="Sprinkler Irrigation (तुषार सिंचन)">Sprinkler Irrigation (तुषार सिंचन)</option>
                  <option value="Borewell / Open Well (विहीर / कूपनलिका)">Open Well / Borewell (विहीर / बोरवेल)</option>
                  <option value="Canal / River Lift (कालवा / उपसा)">Canal / River Lift Irrigation</option>
                  <option value="Rainfed Only (केवळ पावसाचे पाणी)">Rainfed / Non-irrigated (केवळ पावसावर)</option>
                </select>
              </div>

              {/* Budget & Goal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.budget}
                  </label>
                  <select
                    value={formInput.budgetPerAcre}
                    onChange={(e) => setFormInput({ ...formInput, budgetPerAcre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Low (Under ₹15,000/Acre)">Low (&lt; ₹15,000/acre)</option>
                    <option value="Medium (₹15,000–₹35,000/Acre)">Medium (₹15k–₹35k/acre)</option>
                    <option value="High (>₹35,000/Acre)">High (&gt; ₹35,000/acre)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t.farmingGoal}
                  </label>
                  <select
                    value={formInput.farmingGoal}
                    onChange={(e) => setFormInput({ ...formInput, farmingGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Maximum Profit (जास्तीत जास्त नफा)">Maximum Profit</option>
                    <option value="Drought-Resistant (कमी पाण्यात येणारे)">Drought-Resistant</option>
                    <option value="Low Investment Risk (कमी खर्च व जोखीम)">Low Capital Risk</option>
                    <option value="Organic Soil Fertility (सेंद्रिय शेती)">Soil Rejuvenation</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="generate-crop-plan-btn"
                disabled={isLoading}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 dark:text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculating Optimal Agro Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.generatePlanBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Recommendations Column */}
          <div className="lg:col-span-7 space-y-6">
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((crop, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-md space-y-5 animate-in fade-in zoom-in-95 duration-200"
                >
                  {/* Crop Header Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-extrabold text-base shadow-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {idx === 0 ? '🏆 Primary Recommendation' : '🌱 High Potential Alternative'}
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">
                          {crop.cropName}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right bg-emerald-100/80 dark:bg-emerald-950/80 px-3.5 py-1.5 rounded-xl border border-emerald-300/60 dark:border-emerald-800">
                      <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                        {t.suitability}
                      </div>
                      <div className="text-base font-black text-emerald-700 dark:text-emerald-400">
                        {crop.suitabilityScore}% Match
                      </div>
                    </div>
                  </div>

                  {/* 4 Core Financial & Agronomic Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 font-semibold mb-0.5">{t.yield}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {crop.expectedYieldRange || crop.expectedYieldPerAcre || '12–15 Q/Acre'}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 font-semibold mb-0.5">{t.profit}</div>
                      <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        {crop.estimatedProfitPerAcre || crop.estimatedNetProfitPerAcre || '₹30,000 – ₹45,000'}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 font-semibold mb-0.5">{t.duration}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {crop.growingPeriodDays || crop.cropDurationDays || '90–120 days'}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 font-semibold mb-0.5">{t.waterNeed}</div>
                      <div className="font-extrabold text-sky-600 dark:text-sky-400 text-sm">
                        {crop.waterRequirement}
                      </div>
                    </div>
                  </div>

                  {/* Agronomic Strategy Details */}
                  <div className="space-y-2 text-xs">
                    {(crop.suitableSowingWindow || crop.sowingWindow) && (
                      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {t.sowingWindow}:
                        </span>{' '}
                        <span className="text-slate-600 dark:text-slate-400">
                          {crop.suitableSowingWindow || crop.sowingWindow}
                        </span>
                      </div>
                    )}

                    {(crop.fertilizerGuidance || crop.fertilizerPlan) && (
                      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {t.fertilizerPlan}:
                        </span>{' '}
                        <div className="text-slate-600 dark:text-slate-400 mt-1">
                          {Array.isArray(crop.fertilizerGuidance) ? (
                            <ul className="list-disc pl-4 space-y-1">
                              {crop.fertilizerGuidance.map((f, fIdx) => (
                                <li key={fIdx}>{f}</li>
                              ))}
                            </ul>
                          ) : (
                            <span>{crop.fertilizerGuidance || crop.fertilizerPlan}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {crop.whyRecommended && (
                      <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          Why Recommended:
                        </span>{' '}
                        <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                          {crop.whyRecommended}
                        </p>
                      </div>
                    )}

                    {crop.intercroppingOption && (
                      <div className="bg-sky-50/60 dark:bg-sky-950/40 p-3.5 rounded-2xl border border-sky-200 dark:border-sky-900/60">
                        <span className="font-bold text-sky-800 dark:text-sky-300">
                          {t.intercropping}:
                        </span>{' '}
                        <span className="text-slate-700 dark:text-slate-300">
                          {crop.intercroppingOption}
                        </span>
                      </div>
                    )}

                    {(crop.riskFactors || crop.riskAndMitigation) && (
                      <div className="bg-amber-50/60 dark:bg-amber-950/40 p-3.5 rounded-2xl border border-amber-200 dark:border-amber-900/60">
                        <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>{t.risks}:</span>
                        </span>
                        <div className="text-slate-700 dark:text-slate-300">
                          {Array.isArray(crop.riskFactors) ? (
                            <ul className="list-disc pl-4 space-y-1">
                              {crop.riskFactors.map((r, rIdx) => (
                                <li key={rIdx}>{r}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{crop.riskFactors || crop.riskAndMitigation}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full min-h-[420px] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-900/30">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                  <Compass className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Ready to Calculate Crop Strategy
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">
                  Fill in your soil type, land size, and irrigation availability on the left, or click below to calculate recommendations immediately.
                </p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Recommended Plan Now</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
