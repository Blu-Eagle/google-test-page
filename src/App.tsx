import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  RotateCcw, 
  Award,
  Check,
  Cpu,
  Layers,
  Activity,
  Sliders,
  History
} from 'lucide-react';

interface VersionLog {
  id: string;
  version: string;
  type: 'Major' | 'Minor' | 'Patch' | 'Reset';
  note: string;
  timestamp: string;
}

export default function App() {
  // State for versioning tracking starting from 1.0.0
  const [major, setMajor] = useState<number>(() => {
    const saved = localStorage.getItem('google_test_version_major');
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [minor, setMinor] = useState<number>(() => {
    const saved = localStorage.getItem('google_test_version_minor');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [patch, setPatch] = useState<number>(() => {
    const saved = localStorage.getItem('google_test_version_patch');
    return saved ? parseInt(saved, 10) : 0;
  });

  // State for custom logs / history
  const [logs, setLogs] = useState<VersionLog[]>(() => {
    const saved = localStorage.getItem('google_test_version_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'initial',
        version: '1.0.0',
        type: 'Reset',
        note: 'System initialization and first test deployment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }
    ];
  });

  // State for interactive features
  const [noteText, setNoteText] = useState('');
  const [activeTab, setActiveTab] = useState<'control' | 'history'>('control');
  const [colorTheme, setColorTheme] = useState<'google' | 'cosmic' | 'neon' | 'cyberpunk'>('google');
  const [isCopied, setIsCopied] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'System Ready', 
    'Vite Dev Server Connected', 
    'Brutalist Theme Loaded'
  ]);

  // Effect to sync state to localStorage
  useEffect(() => {
    localStorage.setItem('google_test_version_major', major.toString());
  }, [major]);

  useEffect(() => {
    localStorage.setItem('google_test_version_minor', minor.toString());
  }, [minor]);

  useEffect(() => {
    localStorage.setItem('google_test_version_patch', patch.toString());
  }, [patch]);

  useEffect(() => {
    localStorage.setItem('google_test_version_logs', JSON.stringify(logs));
  }, [logs]);

  // Helper to add logs and trigger browser alerts/logs
  const addLog = (newVersion: string, type: 'Major' | 'Minor' | 'Patch' | 'Reset', customNote?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logItem: VersionLog = {
      id: Math.random().toString(36).substr(2, 9),
      version: newVersion,
      type,
      note: customNote || `Bumped ${type} version update.`,
      timestamp: timeStr
    };
    setLogs(prev => [logItem, ...prev]);
    setSystemLogs(prev => [`[${timeStr}] Version updated to ${newVersion} (${type})`, ...prev.slice(0, 8)]);
  };

  // Bump actions
  const handleBumpMajor = () => {
    const nextMajor = major + 1;
    const nextMinor = 0;
    const nextPatch = 0;
    setMajor(nextMajor);
    setMinor(nextMinor);
    setPatch(nextPatch);
    addLog(`${nextMajor}.${nextMinor}.${nextPatch}`, 'Major', noteText.trim() || undefined);
    setNoteText('');
  };

  const handleBumpMinor = () => {
    const nextMinor = minor + 1;
    const nextPatch = 0;
    setMinor(nextMinor);
    setPatch(nextPatch);
    addLog(`${major}.${nextMinor}.${nextPatch}`, 'Minor', noteText.trim() || undefined);
    setNoteText('');
  };

  const handleBumpPatch = () => {
    const nextPatch = patch + 1;
    setPatch(nextPatch);
    addLog(`${major}.${minor}.${nextPatch}`, 'Patch', noteText.trim() || undefined);
    setNoteText('');
  };

  const handleReset = () => {
    setMajor(1);
    setMinor(0);
    setPatch(0);
    addLog('1.0.0', 'Reset', 'Reset version back to initial 1.0.0 baseline.');
    setNoteText('');
  };

  // Clipboard copy
  const copyVersionToClipboard = () => {
    const currentVer = `${major}.${minor}.${patch}`;
    navigator.clipboard.writeText(currentVer);
    setIsCopied(true);
    setSystemLogs(prev => [`Copied version ${currentVer} to clipboard`, ...prev.slice(0, 8)]);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Color theme generator
  const getThemeBackground = () => {
    switch (colorTheme) {
      case 'google':
        return 'bg-[#FBBC04]'; // Vibrant Yellow from the design instructions
      case 'cosmic':
        return 'bg-[#A78BFA]'; // Rich Violet
      case 'neon':
        return 'bg-[#2DD4BF]'; // Vibrant Teal
      case 'cyberpunk':
        return 'bg-[#F43F5E]'; // Vibrant Rose
      default:
        return 'bg-[#FBBC04]';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${getThemeBackground()} transition-all duration-700 font-sans p-6 sm:p-12 flex flex-col justify-between overflow-x-hidden text-black`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4285F4] opacity-15 rounded-full blur-3xl -mr-48 -mb-48 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-black opacity-5 pointer-events-none" />
      
      {/* Header Bar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-[0.3em] bg-black text-white px-3 py-1.5 inline-block mb-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Status: Deployment Active
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-black/60">
              Internal QA Environment — Node: SV-G-14
            </span>
          </div>

          {/* Theme customiser inside a brutalist bar */}
          <div className="flex items-center gap-2 bg-white border-4 border-black p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-black uppercase tracking-wider px-2 text-black">Theme:</span>
            <div className="flex gap-1">
              {[
                { id: 'google', name: 'G', color: 'bg-[#FBBC04]' },
                { id: 'cosmic', name: 'C', color: 'bg-[#8B5CF6] text-white' },
                { id: 'neon', name: 'N', color: 'bg-[#0D9488] text-white' },
                { id: 'cyberpunk', name: 'P', color: 'bg-[#EC4899] text-white' }
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setColorTheme(theme.id as any)}
                  className={`w-8 h-8 font-black text-xs border-2 border-black flex items-center justify-center transition-all ${
                    colorTheme === theme.id 
                      ? `${theme.color} translate-y-[-2px] shadow-[2px_2px_0px_0px_#000]` 
                      : 'bg-white hover:bg-slate-100 text-black'
                  }`}
                  title={`${theme.id.toUpperCase()} Theme`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-5xl md:text-6xl font-black text-black leading-none tracking-tighter">
              {major}.{minor}.{patch}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest bg-white border-4 border-black px-4 py-1.5 mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              Versioning Release
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-6">
        
        {/* Left Column: Big Bold Typography Title */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="relative">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[110px] xl:text-[130px] text-black leading-[0.85] tracking-tighter uppercase select-none">
              <span className="block">TEST</span>
              <span className="block">PAGE</span>
              <span className="block text-[#4285F4] filter drop-shadow-[2px_2px_0px_#000]">
                G<span className="text-[#EA4335]">O</span><span className="text-white filter drop-shadow-[2px_2px_0px_#000]">O</span>G<span className="text-[#34A853]">L</span><span className="text-[#EA4335]">E</span>
              </span>
            </h1>
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 rotate-90 origin-left hidden xl:block">
              <span className="text-black font-black text-xl uppercase tracking-tighter opacity-20">
                STATIC_ENVIRONMENT_BUILD
              </span>
            </div>
          </div>
          
          {/* Playfair Italic custom styled sub-banner */}
          <div className="mt-8 border-l-8 border-black pl-6 py-2">
            <p className="font-serif-italic text-2xl md:text-3xl font-black italic text-black leading-tight">
              “Tracks version state persistently starting from 1.0.0”
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-black/60 mt-2">
              Full Local Storage Synchronization
            </p>
          </div>
        </div>

        {/* Right Column: Interactive State Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          
          {/* Version string & copy interface */}
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute top-4 right-4">
              <Award className="w-8 h-8 text-[#FBBC04] stroke-[3]" />
            </div>
            
            <span className="text-xs font-black uppercase tracking-widest text-black/40">
              Live Semantic Version
            </span>
            
            <div className="flex flex-col items-center justify-center py-6">
              <div 
                onClick={copyVersionToClipboard}
                className="flex items-center gap-1 cursor-pointer select-none group"
                title="Click to copy"
              >
                <span className="font-display font-black text-6xl sm:text-7xl md:text-8xl text-black tracking-tighter group-hover:scale-105 transition-transform duration-200">
                  {major}.{minor}.{patch}
                </span>
              </div>

              <button
                onClick={copyVersionToClipboard}
                className="mt-4 px-5 py-2.5 border-4 border-black bg-white hover:bg-slate-50 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#34A853] stroke-[3]" />
                    <span className="text-[#34A853]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-black" />
                    <span>Copy Version String</span>
                  </>
                )}
              </button>
            </div>

            {/* Semantic breakdowns */}
            <div className="grid grid-cols-3 gap-2 mt-4 border-t-4 border-black pt-4 text-center">
              <div className="bg-slate-50 p-2.5 border-2 border-black">
                <span className="block text-[10px] font-black uppercase tracking-widest text-black/40">Major</span>
                <span className="font-mono text-xl font-black text-black">{major}</span>
              </div>
              <div className="bg-slate-50 p-2.5 border-2 border-black">
                <span className="block text-[10px] font-black uppercase tracking-widest text-black/40">Minor</span>
                <span className="font-mono text-xl font-black text-black">{minor}</span>
              </div>
              <div className="bg-slate-50 p-2.5 border-2 border-black">
                <span className="block text-[10px] font-black uppercase tracking-widest text-black/40">Patch</span>
                <span className="font-mono text-xl font-black text-black">{patch}</span>
              </div>
            </div>
          </div>

          {/* Controller Tabs / Sandbox logs */}
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            
            {/* Tab navigation */}
            <div className="flex items-center justify-between pb-4 border-b-4 border-black">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('control')}
                  className={`px-4 py-2 border-2 border-black text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'control' 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  Bumping Console
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 border-2 border-black text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'history' 
                      ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  Changelog ({logs.length})
                </button>
              </div>

              <button
                onClick={handleReset}
                className="p-2 border-2 border-black bg-white hover:bg-red-100 text-black hover:text-red-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                title="Reset baseline to 1.0.0"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Panel views */}
            <div className="mt-6">
              {activeTab === 'control' ? (
                <div className="space-y-6">
                  {/* Note input */}
                  <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                      Release Changelog Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="e.g., Implemented brutalist typography theme..."
                      className="w-full px-4 py-3 bg-white border-4 border-black font-bold text-sm text-black placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 transition-colors"
                    />
                  </div>

                  {/* Chunky trigger buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={handleBumpMajor}
                      className="group relative flex flex-col items-center justify-center p-4 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      <div className="p-2 bg-[#4285F4] text-white border-2 border-black rounded-lg mb-2 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-xs font-black text-black uppercase">Major Bump</span>
                      <span className="text-[10px] font-mono text-black/60 font-bold mt-1">
                        ({major}.x.x → {major + 1}.0.0)
                      </span>
                    </button>

                    <button
                      onClick={handleBumpMinor}
                      className="group relative flex flex-col items-center justify-center p-4 bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      <div className="p-2 bg-[#EA4335] text-white border-2 border-black rounded-lg mb-2 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-xs font-black text-black uppercase">Minor Bump</span>
                      <span className="text-[10px] font-mono text-black/60 font-bold mt-1">
                        (x.{minor}.x → x.{minor + 1}.0)
                      </span>
                    </button>

                    <button
                      onClick={handleBumpPatch}
                      className="group relative flex flex-col items-center justify-center p-4 bg-[#FBBC04]/20 hover:bg-[#FBBC04]/30 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      <div className="p-2 bg-[#FBBC04] text-black border-2 border-black rounded-lg mb-2 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-xs font-black text-black uppercase">Patch Bump</span>
                      <span className="text-[10px] font-mono text-black/60 font-bold mt-1">
                        (x.x.{patch} → x.x.{patch + 1})
                      </span>
                    </button>
                  </div>

                  {/* Dev output block */}
                  <div className="bg-black text-[#34A853] p-4 border-4 border-black font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-900 mb-2">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
                        Runtime Console
                      </span>
                      <span className="text-slate-500 text-[10px]">Active Node Feed</span>
                    </div>
                    <div className="space-y-1.5 max-h-[110px] overflow-y-auto">
                      {systemLogs.map((log, i) => (
                        <div key={i} className="leading-relaxed">
                          <span className="text-slate-600">&gt;&gt;</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {logs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-slate-50 border-2 border-black p-3.5 flex items-start gap-4 hover:bg-slate-100 transition-colors"
                        >
                          <div className={`px-2.5 py-1 border-2 border-black font-mono text-xs font-black text-white ${
                            log.type === 'Major' ? 'bg-[#4285F4]' :
                            log.type === 'Minor' ? 'bg-[#EA4335]' :
                            log.type === 'Patch' ? 'bg-[#FBBC04] text-black' : 'bg-black'
                          }`}>
                            v{log.version}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black uppercase text-black">
                                {log.type === 'Reset' ? 'Baseline set' : `${log.type} release`}
                              </span>
                              <span className="text-[10px] text-black/50 font-mono font-bold">{log.timestamp}</span>
                            </div>
                            <p className="text-xs text-black/70 mt-1 font-bold">
                              {log.note}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="pt-4 border-t-2 border-black flex justify-between items-center text-xs font-bold">
                    <span className="text-black/50 uppercase tracking-widest font-black">Local storage active</span>
                    <button
                      onClick={() => {
                        const initialLog = {
                          id: 'initial',
                          version: '1.0.0',
                          type: 'Reset',
                          note: 'System initialization and first test deployment.',
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        } as VersionLog;
                        setLogs([initialLog]);
                        setSystemLogs(['[Changelog Purged] system reset']);
                      }}
                      className="text-[#EA4335] hover:underline uppercase tracking-wider font-black"
                    >
                      Clear History
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer Metrics Panel */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-t-4 border-black pt-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Runtime Engine</div>
            <div className="text-xl font-black text-black">Chrome/V8</div>
          </div>
          <div className="border-t-4 border-black pt-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Encryption</div>
            <div className="text-xl font-black text-black">SSL-TLS v1.3</div>
          </div>
          <div className="border-t-4 border-black pt-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Asset Manifest</div>
            <div className="text-xl font-black text-black">G-ASSET_099</div>
          </div>
          <div className="bg-black text-white p-4 flex items-center justify-between border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Last Checksum</span>
              <span className="text-xs font-mono font-bold text-[#FBBC04]">A92-BF-C01</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-[#34A853] border-2 border-white animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}
