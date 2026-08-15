import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MapPin,
  Calendar,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { Language, MandiItem } from '../types';
import { apiService } from '../services/api';
import { translations } from '../i18n/translations';

interface MandiPricesProps {
  language: Language;
  onShowToast: (msg: string) => void;
}

export const MandiPrices: React.FC<MandiPricesProps> = ({ language, onShowToast }) => {
  const [items, setItems] = useState<MandiItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>('');

  const t = translations[language].mandi;

  const fetchMandiData = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getMandiPrices(search, selectedState, selectedCategory);
      setItems(data.items || []);
      setLastUpdated(data.lastUpdated || 'Today');
      setIsLiveApi(data.isLiveApi);
      setNotice(data.dataSourceNotice || '');
    } catch (err: any) {
      onShowToast('Could not load Mandi prices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMandiData();
  }, [selectedState, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMandiData();
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    if (change < 0) return <ArrowDownRight className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
    return <Minus className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <section
      id="mandi"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Daily APMC Market Price Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="sm:col-span-5 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="mandi-search-input"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* State Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="all">{t.stateFilter}: All States</option>
                <option value="Maharashtra">Maharashtra (महाराष्ट्र)</option>
                <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
                <option value="Gujarat">Gujarat (गुजरात)</option>
                <option value="Punjab">Punjab (पंजाब)</option>
                <option value="Rajasthan">Rajasthan (राजस्थान)</option>
                <option value="Karnataka">Karnataka (कर्नाटक)</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="all">{t.categoryFilter}: All Categories</option>
                <option value="Oilseeds">Oilseeds (गळीत धान्य - Soybean, Groundnut)</option>
                <option value="Fibres">Fibres (कापूस / Cotton)</option>
                <option value="Cereals">Cereals (गहू, भात, मका / Wheat, Rice)</option>
                <option value="Pulses">Pulses (तूर, हरभरा, मूग / Pulses)</option>
                <option value="Vegetables">Vegetables (कांदा, टोमॅटो / Onion, Tomato)</option>
                <option value="Commercial">Commercial (ऊस, हळद / Sugarcane, Turmeric)</option>
              </select>
            </div>

            {/* Refresh Button */}
            <div className="sm:col-span-1 text-right">
              <button
                id="refresh-mandi-btn"
                onClick={fetchMandiData}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                title="Refresh Rates"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Status & Last Updated Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                Data Status:{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {isLiveApi ? 'Live Agmarknet / APMC' : 'Verified APMC Benchmark Daily Feed'}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last Reported: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Mandi Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Top Row: Commodity & Category */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900">
                    {item.category}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    {item.commodity}
                  </h4>
                </div>

                {/* Price Change Tag */}
                <div
                  className={`flex items-center gap-0.5 text-xs font-extrabold px-2 py-1 rounded-lg ${
                    item.priceChange > 0
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : item.priceChange < 0
                      ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {getTrendIcon(item.priceChange)}
                  <span>
                    {item.priceChange > 0 ? `+₹${item.priceChange}` : item.priceChange < 0 ? `-₹${Math.abs(item.priceChange)}` : 'Stable'}
                  </span>
                </div>
              </div>

              {/* Mandi Location */}
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item.mandi} APMC
                </span>
                <span>({item.state})</span>
              </div>

              {/* Modal (Benchmark) Price Hero */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 mb-3 border border-slate-200/80 dark:border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-semibold">{t.modalPrice}</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  ₹{item.modalPrice.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-slate-500">/ {item.unit}</span>
                </div>
              </div>

              {/* Min & Max Price Range */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 text-center">
                  <div className="text-[10px] text-slate-400 font-semibold">{t.minPrice}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    ₹{item.minPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 text-center">
                  <div className="text-[10px] text-slate-400 font-semibold">{t.maxPrice}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    ₹{item.maxPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !isLoading && (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No mandi commodities match your search filter. Try selecting "All States".
            </p>
          </div>
        )}

        {/* Data Source Footnote */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Market Price Accuracy Note:</strong> {notice || 'Daily APMC mandi prices are aggregated from major agricultural wholesale market yards. Prices vary with moisture percentage, foreign matter, and crop variety grading.'}
          </p>
        </div>
      </div>
    </section>
  );
};
