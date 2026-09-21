import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Language, LearningArticle } from '../types';
import { learningArticlesData } from '../data/learningData';
import { translations } from '../i18n/translations';

interface LearningHubProps {
  language: Language;
  onShowToast: (msg: string) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({ language, onShowToast }) => {
  const [activeArticle, setActiveArticle] = useState<LearningArticle | null>(null);

  const t = translations[language].learning;

  return (
    <section
      id="learning"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Modern Agronomy & Natural Farming Academy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningArticlesData.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Article Card Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                    {article.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {language === 'mr'
                      ? article.marathiTitle
                      : language === 'hi'
                      ? article.hindiTitle
                      : article.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Bullet Key Takeaways */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  id={`read-article-${article.id}`}
                  onClick={() => setActiveArticle(article)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.readArticle}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {activeArticle.category} • {activeArticle.readTime}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {language === 'mr'
                      ? activeArticle.marathiTitle
                      : language === 'hi'
                      ? activeArticle.hindiTitle
                      : activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Banner */}
              <div className="rounded-2xl overflow-hidden h-60 w-full bg-slate-100 dark:bg-slate-800">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2">
                  Key Takeaways for Field Success:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {activeArticle.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Educational Content */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    onShowToast('Article link copied to clipboard!');
                  }}
                  className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
