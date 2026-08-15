import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  RotateCcw,
  Sparkles,
  User,
  AlertCircle,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { ChatMessage, Language, WeatherData } from '../types';
import { apiService } from '../services/api';
import { translations } from '../i18n/translations';

interface AIAssistantProps {
  language: Language;
  weatherData?: WeatherData | null;
  onShowToast: (msg: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ language, weatherData, onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chatLanguage, setChatLanguage] = useState<Language>(language);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const t = translations[language].aiAssistant;

  // Initialize with greeting
  useEffect(() => {
    setChatLanguage(language);
    const greetingMap: Record<Language, string> = {
      mr: `नमस्कार शेतकरी बंधूंनो! 🙏 मी **कृषिमित्र एआय** आहे. तुम्ही मला कापूस, सोयाबीन, तूर, कांदा, ऊस यांसारख्या पिकांविषयी खते, फवारणी, कीड नियंत्रण किंवा हवामानानुसार सल्ला विचारू शकता. मी तुमची कशी मदत करू?`,
      hi: `नमस्ते किसान भाइयों! 🙏 मैं **कृषिमित्र एआई** हूँ। आप मुझसे कपास, सोयाबीन, धान, गेहूं या सब्जियों से संबंधित खाद, कीटनाशक, रोग उपचार या मौसम अनुसार कृषि सलाह पूछ सकते हैं। मैं आपकी क्या मदद करूँ?`,
      en: `Namaste! 🙏 I am **KrishiMitra AI**, your smart agricultural assistant. Ask me anything about crop nutrition, fertilizer dosing, pest & fungal remedies, irrigation scheduling, or market insights. How can I help your farm today?`,
    };

    setMessages([
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: greetingMap[language],
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: language,
      },
    ]);
  }, [language]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition (Web Speech API)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onShowToast('Voice recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        chatLanguage === 'mr' ? 'mr-IN' : chatLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
          // Optional auto-submit: handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        onShowToast('Could not capture audio. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Text-To-Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Speech synthesis not supported on this device.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/\*\*/g, '').replace(/###/g, '').replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = chatLanguage === 'mr' ? 'mr-IN' : chatLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customQuery?: string) => {
    const queryToSend = (customQuery || inputQuery).trim();
    if (!queryToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryToSend,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const weatherContext = weatherData
        ? {
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            rainProbability: weatherData.rainProbability,
            city: weatherData.city,
          }
        : undefined;

      const result = await apiService.sendChatMessage(
        queryToSend,
        chatLanguage,
        messages,
        weatherContext
      );

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        language: (result.languageDetected as Language) || chatLanguage,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          chatLanguage === 'mr'
            ? 'माफ करा, तांत्रिक अडचणीमुळे उत्तर देता आले नाही. कृपया पुन्हा प्रयत्न करा.'
            : chatLanguage === 'hi'
            ? 'क्षमा करें, सर्वर त्रुटि के कारण उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।'
            : 'Sorry, I encountered an issue connecting to the agronomy server. Please try again.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast(t.copySuccess);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Clear current chat history?')) {
      const greetingMap: Record<Language, string> = {
        mr: 'संवाद इतिहास साफ केला आहे. आपला नवीन प्रश्न विचारा.',
        hi: 'चैट इतिहास साफ कर दिया गया है। अपना नया प्रश्न पूछें।',
        en: 'Chat history cleared. Please ask your farming question.',
      };
      setMessages([
        {
          id: 'cleared-init',
          sender: 'assistant',
          text: greetingMap[chatLanguage],
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <section
      id="assistant"
      className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Powered by Google Gemini</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Chatbot Main Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[650px]">
          {/* Chat Header Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>KrishiMitra AI Chatbot</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-emerald-100 opacity-90">
                  Multilingual Agronomy Expert
                </div>
              </div>
            </div>

            {/* Language Selector in Header & Clear button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/20 rounded-lg p-0.5 text-xs">
                {(['en', 'hi', 'mr'] as Language[]).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => setChatLanguage(langKey)}
                    className={`px-2 py-1 rounded-md font-bold transition-all ${
                      chatLanguage === langKey
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {langKey === 'en' ? 'EN' : langKey === 'hi' ? 'हिन्दी' : 'मराठी'}
                  </button>
                ))}
              </div>

              <button
                id="clear-chat-btn"
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={t.clearChat}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fbfdfa] dark:bg-slate-900/60">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-1 border border-emerald-200 dark:border-emerald-800">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm ${
                      isAssistant
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80'
                        : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                    }`}
                  >
                    {/* Message Header / Timestamp */}
                    <div className="flex items-center justify-between gap-4 mb-1 text-[11px] opacity-75">
                      <span className="font-semibold">
                        {isAssistant ? 'KrishiMitra AI' : 'You (शेतकरी)'}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Body with Line Breaks & Markdown formatting */}
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-1">
                      {msg.text}
                    </div>

                    {/* Assistant Action Buttons: Copy, TTS */}
                    {isAssistant && (
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-2 text-slate-400">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Listen to advice (आवाज ऐका)"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Consulting agronomy models...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Suggestion Chips */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex gap-2 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 self-center">
              {t.suggestedHeading}
            </span>
            {t.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                id={`suggestion-chip-${idx}`}
                onClick={() => handleSendMessage(suggestion)}
                className="text-xs bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shrink-0 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="chat-input-field"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? t.listening : t.placeholder}
                className={`flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border focus:outline-none transition-all ${
                  isListening
                    ? 'border-red-500 bg-red-50/30 ring-2 ring-red-400/20'
                    : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                } text-slate-900 dark:text-white placeholder:text-slate-400`}
                disabled={isLoading}
              />

              {/* Voice Input Button */}
              <button
                type="button"
                id="voice-input-btn"
                onClick={toggleSpeechRecognition}
                className={`p-3 rounded-xl font-bold transition-all ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                }`}
                title={isListening ? 'Stop Recording' : 'Voice Input (बोला)'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                id="send-chat-btn"
                disabled={!inputQuery.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>{t.send}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Advisory Disclaimer */}
            <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-tight">{t.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
