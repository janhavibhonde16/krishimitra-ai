import React, { useState, useRef } from 'react';
import {
  ScanEye,
  UploadCloud,
  Camera,
  X,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Droplets,
  Leaf,
  FlaskConical,
  FileText,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { DiseaseDetectionResult, Language } from '../types';
import { apiService } from '../services/api';
import { sampleDiseasePresets, SampleDiseasePreset } from '../data/sampleDiseases';
import { translations } from '../i18n/translations';

interface DiseaseDetectionProps {
  language: Language;
  onShowToast: (msg: string) => void;
}

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ language, onShowToast }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropHint, setCropHint] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical'>('organic');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language].disease;

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onShowToast('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = async (preset: SampleDiseasePreset) => {
    setCropHint(preset.cropName);
    setErrorMsg(null);
    // Convert sample url to base64 or load sample image
    setSelectedImage(preset.thumbnailUrl);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      onShowToast('Please upload or take a photo of the affected crop leaf first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const data = await apiService.detectCropDisease(
        selectedImage,
        'image/jpeg',
        cropHint,
        language
      );
      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Diagnosis failed. Please retry with a clearer photo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityBadge = (severity: DiseaseDetectionResult['severity']) => {
    switch (severity) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      case 'High':
      case 'Severe':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300';
      case 'Uncertain':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-400';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <section
      id="disease"
      className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/80 text-green-800 dark:text-green-300 text-xs font-bold mb-3 border border-green-300/40">
            <ScanEye className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <span>Computer Vision & Agronomy Pathologist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-lg">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                <span>{t.uploadLabel}</span>
                {selectedImage && (
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Photo</span>
                  </button>
                )}
              </h3>

              {/* Upload Dropzone / Preview */}
              {!selectedImage ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-400/60 dark:border-emerald-600/40 hover:border-emerald-500 rounded-2xl p-8 text-center bg-white dark:bg-slate-900/60 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {t.uploadPrompt}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports JPG, PNG, WebP (Max 15MB)
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3.5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-500 transition-colors"
                    >
                      Browse Gallery
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cameraInputRef.current?.click();
                      }}
                      className="px-3.5 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{t.cameraButton}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                  <img
                    src={selectedImage}
                    alt="Crop Leaf Preview"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white text-xs font-semibold">
                      Photo Loaded for AI Pathologist Analysis
                    </div>
                  </div>
                </div>
              )}

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />

              {/* Optional Crop Name Hint */}
              <div className="mt-4">
                <label
                  htmlFor="crop-hint-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Crop Name (Optional):
                </label>
                <input
                  id="crop-hint-input"
                  type="text"
                  value={cropHint}
                  onChange={(e) => setCropHint(e.target.value)}
                  placeholder="e.g. Cotton, Tomato, Soybean, Paddy, Wheat..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Action Button */}
              <button
                id="analyze-crop-disease-btn"
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className="w-full mt-4 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <ScanEye className="w-5 h-5" />
                    <span>{t.analyzeButton}</span>
                  </>
                )}
              </button>

              {errorMsg && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Test Sample Presets */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                {t.sampleHeading}
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {sampleDiseasePresets.map((preset) => (
                  <button
                    key={preset.id}
                    id={`sample-preset-${preset.id}`}
                    onClick={() => handleSelectSample(preset)}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-left bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-slate-700 transition-colors group cursor-pointer"
                  >
                    <img
                      src={preset.thumbnailUrl}
                      alt={preset.cropName}
                      className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {preset.cropName}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {preset.diseaseName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Diagnosis Report Card */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
                {/* Result Top Summary Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Crop / Plant: {result.cropName}
                      </span>
                      {result.provider && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {result.provider}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {result.diseaseName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Confidence Meter */}
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {result.confidence}%
                      </div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase">
                        {t.confidence}
                      </div>
                    </div>

                    {/* Severity Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${getSeverityBadge(
                        result.severity
                      )}`}
                    >
                      {t.severity}: {result.severity}
                    </div>
                  </div>
                </div>

                {/* Prominent Uncertainty Warning if inconclusive */}
                {(result.isUncertain || result.severity === 'Uncertain' || result.confidence < 50) && (
                  <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700/80 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                        Diagnosis Uncertain / Inconclusive
                      </h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                        The foliar pattern could not be determined with sufficient confidence. To prevent chemical burn or crop damage, <strong>do not apply aggressive chemical sprays without expert confirmation</strong>. Please take a sharper close-up photo in bright, indirect daylight or consult a qualified agricultural officer.
                      </p>
                    </div>
                  </div>
                )}

                {/* Symptoms & Possible Causes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>{t.symptoms}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {result.symptoms.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2.5">
                      <Droplets className="w-4 h-4 text-sky-500" />
                      <span>{t.causes}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {result.possibleCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-sky-500 font-bold">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Management Tabs: Organic vs Chemical */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab('organic')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          activeTab === 'organic'
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <Leaf className="w-3.5 h-3.5" />
                        <span>Organic / Bio Management</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('chemical')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          activeTab === 'chemical'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Recommended Chemical Spray</span>
                      </button>
                    </div>
                  </div>

                  {activeTab === 'organic' ? (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">
                        Eco-friendly bio-fungicides & natural extracts (zero chemical residue):
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                        {result.organicManagement.map((org, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-green-50/60 dark:bg-green-950/40 p-2.5 rounded-xl border border-green-200/60 dark:border-green-900/60">
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                            <span>{org}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                        Targeted chemical molecules with dosage precautions:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                        {result.chemicalManagement.map((chem, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200/60 dark:border-blue-900/60">
                            <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{chem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Immediate Next Steps & Prevention */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                    <h5 className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      <span>{t.nextSteps}</span>
                    </h5>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {result.recommendedNextSteps.map((step, idx) => (
                        <li key={idx}>• {step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{t.prevention}</span>
                    </h5>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      {result.prevention.map((prev, idx) => (
                        <li key={idx}>• {prev}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mandatory Disclaimer */}
                <div className="p-3.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <p className="leading-tight font-medium">
                    {result.disclaimer || "AI-assisted result. This is not a guaranteed diagnosis. For serious or uncertain crop problems, consult a qualified agricultural expert."}
                  </p>
                </div>
              </div>
            ) : (
              /* Empty / Placeholder State */
              <div className="h-full min-h-[480px] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-900/30">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <ScanEye className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  AI Plant Pathology Engine Ready
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1.5 leading-relaxed">
                  Upload a photo on the left or select a sample image. Our deep learning model will identify foliar diseases, calculate confidence score, and deliver organic and chemical remedies.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
