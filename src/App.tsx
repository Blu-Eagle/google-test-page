import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink,
  Zap,
  Gift
} from 'lucide-react';

interface AITool {
  name: string;
  function: string;
  replaces: string;
  link: string;
  isBonus?: boolean;
}

const AI_TOOLS: AITool[] = [
  { name: "DeepSeek (V4 Pro)", function: "Chatbot avanzato open-source ideale per ragionamento complesso, brainstorming e scrittura di codice.", replaces: "ChatGPT Plus", link: "https://www.deepseek.com" },
  { name: "Kimi K2.7", function: "Assistente LLM multimodale agentico specializzato nell'analisi di dati, compiti complessi e coding.", replaces: "ChatGPT Plus, Claude Pro", link: "https://www.kimi.com" },
  { name: "Perplexity (con Comet Browser)", function: "Motore di ricerca AI avanzato con report dettagliati con fonti e browser agentico integrato.", replaces: "Perplexity Pro, ChatGPT Plus, Claude Pro, Gemini Advanced", link: "https://www.perplexity.ai" },
  { name: "Nano Banana Pro (Gemini)", function: "Generatore di immagini ad alta definizione e fotorealistiche integrato nativamente in Gemini.", replaces: "Midjourney, ChatGPT Image (DALL-E)", link: "https://gemini.google.com" },
  { name: "Krea AI", function: "Piattaforma creativa per la generazione e l'upscaling di immagini in tempo reale mentre si disegna.", replaces: "Abbonamenti per la generazione/upscale di immagini", link: "https://www.krea.ai" },
  { name: "Napkin AI", function: "Strumento che trasforma automaticamente testi in infografiche, diagrammi e schemi concettuali.", replaces: "Canva Pro, servizi di graphic design", link: "https://www.napkin.ai" },
  { name: "JensPark", function: "Workspace di agenti AI autonomi in grado di svolgere ricerche, creare slide, fogli di calcolo e codice.", replaces: "Manus AI e altri tool ad agenti a pagamento", link: "https://www.jenspark.com" },
  { name: "Google AI Studio (Build)", function: "Ambiente di sviluppo per generare e testare applicazioni web partendo da semplici prompt di testo.", replaces: "Bolt.new, Lovable, Replit (tool di vibe coding)", link: "https://aistudio.google.com" },
  { name: "Fellow", function: "Browser agentico per automazioni avanzate, ricerca profonda su più siti e azioni automatiche sul web.", replaces: "Tool di ricerca web intensiva e automazione", link: "https://www.fellow.ai" },
  { name: "NotebookLM", function: "Spazio di lavoro che sintetizza e trasforma le proprie fonti (PDF, video, doc) in riassunti o podcast audio.", replaces: "Tool di sintesi documenti, trascrizione e nota-taking", link: "https://notebooklm.google.com" },
  { name: "Kling AI", function: "Generatore di brevi clip video cinematiche a partire da prompt di testo.", replaces: "Runway, Sora e altri generatori di video AI", link: "https://klingai.com" },
  { name: "CapCut AI", function: "Software di montaggio video con funzionalità AI per stacco silenzi e sottotitoli automatici.", replaces: "Software di editing video e generazione sottotitoli pro", link: "https://www.capcut.com" },
  { name: "Google Flow Music", function: "Studio musicale guidato da intelligenza artificiale per comporre brani completi conversando con un producer.", replaces: "Suno AI e licenze musicali a pagamento", link: "https://flowmusic.ai" },
  { name: "Gemma", function: "Modello open-source leggero di Google da eseguire direttamente sul proprio hardware o dispositivo mobile.", replaces: "Abbonamenti a modelli cloud commerciali proprietari", link: "https://ai.google.dev/gemma", isBonus: true },
  { name: "Ollama", function: "Strumento CLI e ambiente locale per scaricare ed eseguire qualsiasi LLM open-source direttamente sul PC.", replaces: "Tutti i servizi API o chat cloud a pagamento", link: "https://ollama.com", isBonus: true },
  { name: "OpenClaw", function: "Framework agentico open-source per trasformare il proprio PC in un assistente autonomo guidato via chat/audio.", replaces: "Soluzioni di automazione avanzata e assistenti agentici enterprise", link: "https://github.com/openclaw", isBonus: true }
];

export default function App() {
  const [colorTheme, setColorTheme] = useState<'google' | 'cosmic' | 'neon' | 'cyberpunk'>('google');

  const getThemeBackground = () => {
    switch (colorTheme) {
      case 'google': return 'bg-[#FBBC04]';
      case 'cosmic': return 'bg-[#A78BFA]';
      case 'neon': return 'bg-[#2DD4BF]';
      case 'cyberpunk': return 'bg-[#F43F5E]';
      default: return 'bg-[#FBBC04]';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${getThemeBackground()} transition-all duration-700 font-sans p-4 sm:p-12 flex flex-col text-black`}>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4285F4] opacity-20 rounded-full blur-3xl -mr-48 -mb-48 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-black opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-black text-white px-3 py-1.5 inline-block mb-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              AI TOOLS COMPARISON 2024
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-black/60">
              Curated by Google AI Studio Build
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white border-4 border-black p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {['google', 'cosmic', 'neon', 'cyberpunk'].map(t => (
              <button
                key={t}
                onClick={() => setColorTheme(t as any)}
                className={`w-8 h-8 font-black text-xs border-2 border-black flex items-center justify-center transition-all ${
                  colorTheme === t ? 'bg-black text-white -translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]' : 'bg-white hover:bg-slate-100'
                }`}
              >
                {t[0].toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto w-full flex-1">
        <div className="mb-16">
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[120px] text-black leading-[0.8] tracking-tighter uppercase select-none mb-8">
            <span className="block">TEST</span>
            <span className="block">PAGE</span>
            <span className="block text-[#4285F4] drop-shadow-[4px_4px_0px_#000]">
              G<span className="text-[#EA4335]">O</span><span className="text-white drop-shadow-[4px_4px_0px_#000]">O</span>G<span className="text-[#34A853]">L</span><span className="text-[#EA4335]">E</span>
            </span>
          </h1>
          <div className="border-l-[12px] border-black pl-8 py-2">
            <p className="font-serif-italic text-3xl md:text-5xl font-black italic text-black leading-tight max-w-4xl">
              I migliori strumenti AI per sostituire gli abbonamenti a pagamento.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest border-r-2 border-white/20">Modello / Tool AI</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest border-r-2 border-white/20">Funzione principale</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest border-r-2 border-white/20">Sostituisce</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black">
                {AI_TOOLS.map((tool, idx) => (
                  <tr key={idx} className={`group hover:bg-black/5 transition-colors ${tool.isBonus ? 'bg-yellow-50' : ''}`}>
                    <td className="px-6 py-6 border-r-4 border-black">
                      <div className="flex items-center gap-2">
                        {tool.isBonus && <Gift className="w-4 h-4 text-[#EA4335]" />}
                        <span className="font-black text-lg tracking-tight uppercase">
                          {tool.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 border-r-4 border-black text-sm font-bold text-black/80 leading-relaxed">
                      {tool.function}
                    </td>
                    <td className="px-6 py-6 border-r-4 border-black">
                      <span className="inline-block bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider mb-1">Target Replacement:</span>
                      <p className="text-xs font-black uppercase tracking-tight text-black">{tool.replaces}</p>
                    </td>
                    <td className="px-6 py-6">
                      <a 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black bg-white hover:bg-black hover:text-white font-black text-xs uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-[#FBBC04]" />
              <span className="text-xs font-black uppercase tracking-widest">Quick Tip</span>
            </div>
            <p className="text-sm font-bold leading-relaxed opacity-80">
              Usa questi strumenti per ottimizzare il tuo workflow creativo senza costi fissi mensili.
            </p>
          </div>
          <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[#4285F4]" />
              <span className="text-xs font-black uppercase tracking-widest">Bonus Content</span>
            </div>
            <p className="text-sm font-bold leading-relaxed">
              Modelli open-source come Gemma possono essere eseguiti localmente per la massima privacy.
            </p>
          </div>
          <div className="bg-[#34A853] p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest">System Status</span>
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            </div>
            <div className="text-2xl font-black italic">DATABASE READY</div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto w-full py-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em]">© 2024 AI TOOLS COMPARISON</div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  );
}
