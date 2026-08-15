import React, { useState, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Printer,
  Save,
  CheckCircle2,
  AlertCircle,
  Percent,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FarmExpenseCalculatorProps {
  language: Language;
  onShowToast: (msg: string) => void;
}

export const FarmExpenseCalculator: React.FC<FarmExpenseCalculatorProps> = ({
  language,
  onShowToast,
}) => {
  const [acres, setAcres] = useState<number>(3);
  const [landPrep, setLandPrep] = useState<number>(4500);
  const [seeds, setSeeds] = useState<number>(5400);
  const [fertilizers, setFertilizers] = useState<number>(12000);
  const [pesticides, setPesticides] = useState<number>(8500);
  const [irrigation, setIrrigation] = useState<number>(3500);
  const [labor, setLabor] = useState<number>(14000);
  const [transport, setTransport] = useState<number>(3000);
  const [misc, setMisc] = useState<number>(2000);

  // Revenue inputs
  const [expectedYieldQtl, setExpectedYieldQtl] = useState<number>(36); // e.g. 12 qtl/acre for 3 acres
  const [pricePerQtl, setPricePerQtl] = useState<number>(4900);

  const t = translations[language].calculator;

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('krishi_calculator_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.acres) setAcres(parsed.acres);
        if (parsed.landPrep) setLandPrep(parsed.landPrep);
        if (parsed.seeds) setSeeds(parsed.seeds);
        if (parsed.fertilizers) setFertilizers(parsed.fertilizers);
        if (parsed.pesticides) setPesticides(parsed.pesticides);
        if (parsed.irrigation) setIrrigation(parsed.irrigation);
        if (parsed.labor) setLabor(parsed.labor);
        if (parsed.transport) setTransport(parsed.transport);
        if (parsed.misc) setMisc(parsed.misc);
        if (parsed.expectedYieldQtl) setExpectedYieldQtl(parsed.expectedYieldQtl);
        if (parsed.pricePerQtl) setPricePerQtl(parsed.pricePerQtl);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Financial calculations
  const totalCost =
    (landPrep || 0) +
    (seeds || 0) +
    (fertilizers || 0) +
    (pesticides || 0) +
    (irrigation || 0) +
    (labor || 0) +
    (transport || 0) +
    (misc || 0);

  const grossRevenue = (expectedYieldQtl || 0) * (pricePerQtl || 0);
  const netProfit = grossRevenue - totalCost;
  const costPerAcre = acres > 0 ? totalCost / acres : totalCost;
  const profitPerAcre = acres > 0 ? netProfit / acres : netProfit;
  const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : '0';

  const handleSave = () => {
    try {
      const state = {
        acres,
        landPrep,
        seeds,
        fertilizers,
        pesticides,
        irrigation,
        labor,
        transport,
        misc,
        expectedYieldQtl,
        pricePerQtl,
      };
      localStorage.setItem('krishi_calculator_state', JSON.stringify(state));
      onShowToast('Farm expense calculation saved to your device.');
    } catch (e) {
      onShowToast('Failed to save to local storage.');
    }
  };

  const handleReset = () => {
    setAcres(3);
    setLandPrep(4500);
    setSeeds(5400);
    setFertilizers(12000);
    setPesticides(8500);
    setIrrigation(3500);
    setLabor(14000);
    setTransport(3000);
    setMisc(2000);
    setExpectedYieldQtl(36);
    setPricePerQtl(4900);
    localStorage.removeItem('krishi_calculator_state');
    onShowToast('Reset to default benchmark values.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="calculator"
      className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Farm Financial & Cultivation Budgeting</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Cultivation Expenses Breakdown (खर्चाचा तपशील)
              </h3>
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Total Farm Area:
                </label>
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={acres}
                  onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                  className="w-20 px-2 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-center"
                />
                <span className="text-xs font-bold text-slate-500">Acres</span>
              </div>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Land Preparation & Plowing (मशागत):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={landPrep}
                    onChange={(e) => setLandPrep(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Seeds & Seed Treatment (बियाणे):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={seeds}
                    onChange={(e) => setSeeds(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Fertilizers & Organic Manure (खते):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={fertilizers}
                    onChange={(e) => setFertilizers(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Pesticides & Sprays (कीटकनाशके):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={pesticides}
                    onChange={(e) => setPesticides(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Irrigation & Electricity/Diesel (सिंचन):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={irrigation}
                    onChange={(e) => setIrrigation(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Labor, Weeding & Harvesting (मजुरी):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={labor}
                    onChange={(e) => setLabor(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Transport & Mandi Market Fee (वाहतूक):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={transport}
                    onChange={(e) => setTransport(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Miscellaneous Expenses (इतर खर्च):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={misc}
                    onChange={(e) => setMisc(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Expected Revenue Projection Inputs */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                2. Market Output & Selling Price Projection (उत्पन्नाचा अंदाज)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Expected Total Harvest (एकूण उत्पादन Quintals):
                  </label>
                  <input
                    type="number"
                    value={expectedYieldQtl}
                    onChange={(e) => setExpectedYieldQtl(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Expected Selling Rate (अपेक्षित दर ₹/Quintal):
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={pricePerQtl}
                      onChange={(e) => setPricePerQtl(parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Calculation</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Statement</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right: Real-time Profit & Cost Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Live Farm Financial Balance Sheet
              </span>
              <h3 className="text-2xl font-black mt-1">
                {netProfit >= 0 ? 'Estimated Net Profit' : 'Estimated Net Loss'}
              </h3>
              <div
                className={`text-3xl sm:text-4xl font-black mt-2 ${
                  netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                For {acres} Acres of Cultivation (₹{Math.round(profitPerAcre).toLocaleString('en-IN')} / Acre)
              </p>
            </div>

            {/* Financial Metrics Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-white/10 rounded-2xl p-3.5">
                <div className="text-slate-400 font-semibold">{t.totalCost}</div>
                <div className="text-base font-black text-rose-300 mt-0.5">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ₹{Math.round(costPerAcre).toLocaleString('en-IN')} / Acre
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3.5">
                <div className="text-slate-400 font-semibold">{t.expectedRevenue}</div>
                <div className="text-base font-black text-emerald-300 mt-0.5">
                  ₹{grossRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {expectedYieldQtl} Qtl @ ₹{pricePerQtl}/Qtl
                </div>
              </div>
            </div>

            {/* ROI Metric Badge */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Return on Investment (ROI)</div>
                  <div className="text-[11px] text-emerald-300">Profit margin on total capital deployed</div>
                </div>
              </div>
              <div className="text-xl font-black text-emerald-400">{roi}%</div>
            </div>

            {/* Practical Advice Note */}
            <div className="text-[11px] text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Tip: Reducing chemical pesticide sprays through IPM and utilizing drip fertigation can cut per-acre input costs by up to 22%, directly boosting net profit.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
