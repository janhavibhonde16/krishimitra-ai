import React from 'react';
import {
  Sprout,
  Heart,
  PhoneCall,
  Mail,
  ShieldCheck,
  Globe2,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  KrishiMitra <span className="text-emerald-400">AI</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Smart Farming Assistant</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.tagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:18001801551"
                className="px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-600/30 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Kisan Helpline: 1800-180-1551</span>
              </a>
            </div>
          </div>

          {/* Core Modules Column */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('assistant')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  AI Farm Chatbot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disease')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Crop Disease Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weather')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Agro Weather Forecast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('recommendation')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Weather-Linked Crop Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Nearby Agri Centres & KVK
                </button>
              </li>
            </ul>
          </div>

          {/* Farmer Tools & Knowledge */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              Farmer Utilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  PM-KISAN & Schemes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learning')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Agronomy Learning Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Crop Growth Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('soil')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Soil Health Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Expense & ROI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Public Portals */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>PMFBY Crop Insurance</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://soilhealth.dac.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Soil Health Card Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://mahadbt.maharashtra.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>MahaDBT Farmer Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t.copyright} • Built with precision for Indian Agriculture.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
