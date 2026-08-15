import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIAssistant } from './components/AIAssistant';
import { DiseaseDetection } from './components/DiseaseDetection';
import { WeatherDashboard } from './components/WeatherDashboard';
import { CropRecommendation } from './components/CropRecommendation';
import { MandiPrices } from './components/MandiPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { LearningHub } from './components/LearningHub';
import { FarmingCalendar } from './components/FarmingCalendar';
import { SoilHealth } from './components/SoilHealth';
import { FarmExpenseCalculator } from './components/FarmExpenseCalculator';
import { NearbyServices } from './components/NearbyServices';
import { EmergencyHelp } from './components/EmergencyHelp';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DeploymentModal } from './components/DeploymentModal';
import { Toast } from './components/Toast';
import { Language, Theme, WeatherData } from './types';
import { apiService } from './services/api';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('krishi_lang') as Language) || 'mr';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('krishi_theme') as Theme) || 'light';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);

  // Sync theme class to documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('krishi_theme', theme);
  }, [theme]);

  // Sync language
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('krishi_lang', newLang);
    showToast(
      newLang === 'mr'
        ? 'भाषा मराठीमध्ये बदलली आहे.'
        : newLang === 'hi'
        ? 'भाषा हिन्दी में बदल दी गई है।'
        : 'Language changed to English.'
    );
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Initial weather load
  useEffect(() => {
    const loadInitialWeather = async () => {
      try {
        const data = await apiService.getWeather('Pune, Maharashtra');
        setWeatherData(data);
      } catch (err) {
        console.warn('Initial weather load:', err);
      }
    };
    loadInitialWeather();
  }, []);

  // Intersection observer for active nav indicator
  useEffect(() => {
    const sectionIds = [
      'home',
      'assistant',
      'disease',
      'weather',
      'mandi',
      'recommendation',
      'schemes',
      'learning',
      'calendar',
      'soil',
      'calculator',
      'services',
      'emergency',
      'about',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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

  return (
    <div className="min-h-screen bg-[#F9FBF7] dark:bg-[#0b1310] text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeSection={activeSection}
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          language={language}
          weatherData={weatherData}
          onNavigate={navigateTo}
        />

        {/* 2. AI Farming Assistant (Gemini Chatbot) */}
        <AIAssistant
          language={language}
          weatherData={weatherData}
          onShowToast={showToast}
        />

        {/* 3. Crop Disease Detection (Computer Vision) */}
        <DiseaseDetection
          language={language}
          onShowToast={showToast}
        />

        {/* 4. Hyperlocal Weather & Agro-Meteorology */}
        <WeatherDashboard
          language={language}
          weatherData={weatherData}
          onWeatherChange={(data) => setWeatherData(data)}
          onShowToast={showToast}
        />

        {/* 5. AI Crop Recommendation Engine */}
        <CropRecommendation
          language={language}
          onShowToast={showToast}
        />

        {/* 6. APMC Mandi Rates Live Terminal */}
        <MandiPrices
          language={language}
          onShowToast={showToast}
        />

        {/* 7. Government Schemes & Subsidies */}
        <GovernmentSchemes
          language={language}
          onShowToast={showToast}
        />

        {/* 8. Agronomy Learning Hub */}
        <LearningHub
          language={language}
          onShowToast={showToast}
        />

        {/* 9. Interactive Farming Calendar */}
        <FarmingCalendar
          language={language}
        />

        {/* 10. Soil Health & Nutrient Guide */}
        <SoilHealth
          language={language}
        />

        {/* 11. Farm Expense & Profit Calculator */}
        <FarmExpenseCalculator
          language={language}
          onShowToast={showToast}
        />

        {/* 12. Nearby Agri Services Directory */}
        <NearbyServices
          language={language}
        />

        {/* 13. 24x7 Emergency Help & Kisan Helpline */}
        <EmergencyHelp
          language={language}
        />

        {/* 14. About Startup Mission */}
        <AboutSection
          language={language}
        />

        {/* 15. Support Desk & Contact */}
        <ContactSection
          language={language}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={navigateTo}
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
      />

      {/* Deployment to GitHub/Vercel Guide Modal */}
      <DeploymentModal
        isOpen={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
        onShowToast={showToast}
      />

      {/* Action Toast Notifications */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
