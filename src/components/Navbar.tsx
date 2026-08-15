import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Bot,
  ScanEye,
  CloudSun,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Layers,
  Calculator,
  PhoneCall,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Compass,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  activeSection,
  onOpenDeployGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.home, icon: Sprout },
    { id: 'assistant', label: t.assistant, icon: Bot },
    { id: 'disease', label: t.disease, icon: ScanEye },
    { id: 'weather', label: t.weather, icon: CloudSun },
    { id: 'mandi', label: t.mandi, icon: TrendingUp },
    { id: 'recommendation', label: t.recommendation, icon: Compass },
    { id: 'schemes', label: t.schemes, icon: Award },
    { id: 'learning', label: t.learning, icon: BookOpen },
    { id: 'calendar', label: t.calendar, icon: Calendar },
    { id: 'soil', label: t.soil, icon: Layers },
    { id: 'calculator', label: t.calculator, icon: Calculator },
    { id: 'services', label: t.services, icon: MapPin },
    { id: 'emergency', label: t.emergency, icon: PhoneCall },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const languageLabels: Record<Language, { native: string; label: string }> = {
    en: { native: 'English', label: 'EN' },
    hi: { native: 'हिन्दी', label: 'HI' },
    mr: { native: 'मराठी', label: 'MR' },
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2.5 border-b border-emerald-100 dark:border-slate-800'
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm py-3.5 border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-700 via-green-600 to-amber-600 dark:from-emerald-400 dark:via-green-400 dark:to-amber-400 bg-clip-text text-transparent">
                  KrishiMitra
                </span>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-300/40">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Smart Farming Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.slice(0, 9).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Language, Theme, Emergency, Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-emerald-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
                title="Select Language / भाषा बदला"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{languageLabels[language].native}</span>
              </button>

              {langDropdownOpen && (
                <div
                  id="language-menu-dropdown"
                  className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {(['en', 'hi', 'mr'] as Language[]).map((langKey) => (
                    <button
                      key={langKey}
                      id={`lang-option-${langKey}`}
                      onClick={() => {
                        onLanguageChange(langKey);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between font-semibold transition-colors ${
                        language === langKey
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{languageLabels[langKey].native}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {languageLabels[langKey].label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* GitHub/Vercel Deployment Guide Trigger */}
            <button
              id="deploy-guide-btn"
              onClick={onOpenDeployGuide}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Deploy Guide</span>
            </button>

            {/* Emergency Hotline Button */}
            <button
              id="emergency-quick-btn"
              onClick={() => scrollTo('emergency')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-500/30 hover:brightness-110 active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>1800-180-1551</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="xl:hidden mt-3 pt-3 pb-4 px-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-1 animate-in slide-in-from-top-4 duration-200"
          >
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                id="mobile-deploy-guide-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeployGuide();
                }}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>GitHub + Vercel Setup</span>
              </button>
              <a
                href="tel:18001801551"
                className="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 1800-180-1551</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
