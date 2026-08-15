import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Globe,
  Sparkles,
  GitBranch,
  Layers,
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    onShowToast('Snippet copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitSnippet = `# 1. Initialize git & push to GitHub
git init
git add .
git commit -m "feat: KrishiMitra AI Smart Agriculture Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/krishimitra-ai.git
git push -u origin main`;

  const vercelEnvSnippet = `# In Vercel Project Dashboard -> Settings -> Environment Variables:
GEMINI_API_KEY=AIzaSy... (Your Google Gemini API Key)
OPENWEATHER_API_KEY=... (Optional live weather key)
DISEASE_DETECTION_API_KEY=... (Optional plant API key)
MANDI_API_KEY=... (Optional Agmarknet API key)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                GitHub + Vercel Deployment Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deploy KrishiMitra AI to a live public URL for farmers across all devices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Push to GitHub */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Push Codebase to GitHub</span>
            </h4>
            <button
              onClick={() => copySnippet(gitSnippet, 1)}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Commands</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
            {gitSnippet}
          </pre>
        </div>

        {/* Step 2: Connect to Vercel */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Import Project in Vercel (vercel.com)</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            1. Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold underline">vercel.com/new</a> and connect your GitHub account.<br />
            2. Select the <strong>krishimitra-ai</strong> repository.<br />
            3. Framework Preset: <strong>Vite</strong> or <strong>Other (Fullstack)</strong>.<br />
            4. Build Command: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">npm run build</code>.<br />
            5. Output Directory: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">dist</code>.
          </p>
        </div>

        {/* Step 3: Configure Environment Variables */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Set Secure Server Environment Variables</span>
            </h4>
            <button
              onClick={() => copySnippet(vercelEnvSnippet, 2)}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Variables</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
            {vercelEnvSnippet}
          </pre>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Leakage Guarantee:</strong> All API keys remain strictly on the backend/serverless layer and are never shipped in frontend browser bundles.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1 font-semibold"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
