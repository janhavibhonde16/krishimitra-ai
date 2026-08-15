import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  Navigation,
  CheckCircle2,
  Building2,
  Store,
  FlaskConical,
  Activity,
  Award,
} from 'lucide-react';
import { AgriServiceItem, Language } from '../types';
import { nearbyAgriServicesData } from '../data/agriServicesData';
import { translations } from '../i18n/translations';

interface NearbyServicesProps {
  language: Language;
}

export const NearbyServices: React.FC<NearbyServicesProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const t = translations[language].services;

  const categories = [
    'All',
    'Krishi Seva Kendra',
    'Soil Testing Lab',
    'APMC Mandi',
    'Veterinary Clinic',
    'Agriculture Office',
  ];

  const filteredServices = nearbyAgriServicesData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: AgriServiceItem['category']) => {
    switch (category) {
      case 'Krishi Seva Kendra':
        return <Store className="w-4 h-4 text-emerald-600" />;
      case 'Soil Testing Lab':
        return <FlaskConical className="w-4 h-4 text-sky-600" />;
      case 'APMC Mandi':
        return <Building2 className="w-4 h-4 text-amber-600" />;
      case 'Veterinary Clinic':
        return <Activity className="w-4 h-4 text-rose-600" />;
      case 'Agriculture Office':
        return <Award className="w-4 h-4 text-purple-600" />;
      default:
        return <MapPin className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section
      id="services"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Local Farmer Support Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dealer, lab or mandi..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Category Icon & Rating & Distance */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                    {getCategoryIcon(service.category)}
                    <span>{service.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                      {service.distanceKm} km
                    </span>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{service.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Name & Address */}
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{service.address}</span>
                </p>

                {/* Hours */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mt-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.operatingHours}</span>
                </div>

                {/* Services List */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">
                    Services / Inventory:
                  </div>
                  {service.servicesOffered.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={`tel:${service.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.call}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${service.name}, ${service.address}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.directions}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
