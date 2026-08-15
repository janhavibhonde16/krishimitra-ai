import React from 'react';
import {
  PhoneCall,
  ShieldAlert,
  Clock,
  ExternalLink,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { emergencyContactsData } from '../data/emergencyData';
import { translations } from '../i18n/translations';

interface EmergencyHelpProps {
  language: Language;
}

export const EmergencyHelp: React.FC<EmergencyHelpProps> = ({ language }) => {
  const t = translations[language].emergency;

  return (
    <section
      id="emergency"
      className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-xs font-bold mb-3 border border-rose-300/40">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-pulse" />
            <span>24x7 National Kisan Helplines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Highlighted PMFBY 72-Hour Calamity Alert Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border-2 border-amber-400/40 dark:border-amber-600/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-extrabold shadow-md">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Critical Crop Loss Notice: 72-Hour PMFBY Deadline
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
                In case of localized crop loss due to hailstorm, inundation, or cyclone, you MUST notify your insurance company or call <strong>14447</strong> within <strong>72 hours</strong> with photos and 7/12 land extract to qualify for survey compensation.
              </p>
            </div>
          </div>

          <a
            href="tel:14447"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 14447 Now</span>
          </a>
        </div>

        {/* Emergency Contacts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContactsData.map((contact) => (
            <div
              key={contact.id}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-lg border border-rose-300/40">
                    {contact.category}
                  </span>
                  {contact.tollFree && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ 100% Toll Free
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {language === 'mr'
                    ? contact.marathiTitle
                    : language === 'hi'
                    ? contact.hindiTitle
                    : contact.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                  {contact.description}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{contact.hours}</span>
                </div>
              </div>

              {/* Action Phone Button */}
              <div className="mt-5 pt-3">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>
                    {t.callNow}: {contact.phone}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
