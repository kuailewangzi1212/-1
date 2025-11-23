import React, { useState, useRef, useEffect } from 'react';
import { ThinkingSystem, Mindset, SimulationResponse } from './types';
import { SYSTEM_INFO, MINDSET_INFO } from './constants';
import BrainVisual from './components/BrainVisual';
import { generateCognitiveResponse } from './services/geminiService';
import { Play, RotateCcw, Activity, BrainCircuit, ArrowRight, Info, AlertTriangle, Layers, Send } from 'lucide-react';

const App: React.FC = () => {
  const [system, setSystem] = useState<ThinkingSystem>(ThinkingSystem.SYSTEM_1);
  const [mindset, setMindset] = useState<Mindset>(Mindset.FIXED);
  
  const [scenario, setScenario] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSimulate = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await generateCognitiveResponse(scenario, system, mindset);
      setResult(data);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e) {
      setError("生成模拟结果失败。请检查您的网络连接或 API Key。");
    } finally {
      setLoading(false);
    }
  };

  const sysData = SYSTEM_INFO[system];
  const mindData = MINDSET_INFO[mindset];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">认知双核模拟器</h1>
              <p className="text-xs text-slate-400">心理学系统可视化工具</p>
            </div>
          </div>
          <div className="hidden md:flex text-xs text-slate-500 gap-4">
             <span>《思考，快与慢》(卡尼曼)</span>
             <span>•</span>
             <span>《终身成长》(德韦克)</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visualization & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visualizer Card */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                 <Activity className="w-5 h-5 text-indigo-400" />
                 状态监控
               </h2>
               <div className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400">
                  实时 (REAL-TIME)
               </div>
            </div>

            <BrainVisual system={system} mindset={mindset} />
            
            <div className="mt-6 flex justify-between text-xs text-slate-400 font-mono border-t border-slate-700/50 pt-4">
              <div className="text-center w-1/2 border-r border-slate-700">
                <span className="block mb-1 text-[10px] uppercase tracking-wider">能量负荷</span>
                <span className={`text-lg font-bold ${system === ThinkingSystem.SYSTEM_2 ? 'text-orange-400' : 'text-cyan-400'}`}>
                  {system === ThinkingSystem.SYSTEM_2 ? '高 (HIGH)' : '低 (LOW)'}
                </span>
              </div>
              <div className="text-center w-1/2">
                <span className="block mb-1 text-[10px] uppercase tracking-wider">成长潜能</span>
                <span className={`text-lg font-bold ${mindset === Mindset.GROWTH ? 'text-emerald-400' : 'text-slate-400'}`}>
                   {mindset === Mindset.GROWTH ? '高 (HIGH)' : '低 (LOW)'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* System Control */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">思考系统 (System)</label>
              <div className="space-y-2">
                <button
                  onClick={() => setSystem(ThinkingSystem.SYSTEM_1)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between group ${
                    system === ThinkingSystem.SYSTEM_1 
                      ? 'bg-cyan-900/30 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className={system === ThinkingSystem.SYSTEM_1 ? 'text-cyan-200' : 'text-slate-400'}>默认程序 (快)</span>
                  <div className={`w-3 h-3 rounded-full ${system === ThinkingSystem.SYSTEM_1 ? 'bg-cyan-400 shadow-glow' : 'bg-slate-700'}`} />
                </button>
                <button
                  onClick={() => setSystem(ThinkingSystem.SYSTEM_2)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between ${
                    system === ThinkingSystem.SYSTEM_2 
                      ? 'bg-orange-900/30 border-orange-500/50 shadow-[0_0_15px_rgba(251,146,60,0.1)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className={system === ThinkingSystem.SYSTEM_2 ? 'text-orange-200' : 'text-slate-400'}>深度思考 (慢)</span>
                  <div className={`w-3 h-3 rounded-full ${system === ThinkingSystem.SYSTEM_2 ? 'bg-orange-400 shadow-glow' : 'bg-slate-700'}`} />
                </button>
              </div>
            </div>

            {/* Mindset Control */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">思维模式 (Mindset)</label>
              <div className="space-y-2">
                <button
                  onClick={() => setMindset(Mindset.FIXED)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between ${
                    mindset === Mindset.FIXED 
                      ? 'bg-slate-700 border-slate-400/50 shadow-[0_0_15px_rgba(148,163,184,0.1)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className={mindset === Mindset.FIXED ? 'text-slate-200' : 'text-slate-400'}>固定型</span>
                  <div className={`w-3 h-3 rounded-full border-2 ${mindset === Mindset.FIXED ? 'border-slate-300 bg-slate-500' : 'border-slate-700'}`} />
                </button>
                <button
                  onClick={() => setMindset(Mindset.GROWTH)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between ${
                    mindset === Mindset.GROWTH 
                      ? 'bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.1)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <span className={mindset === Mindset.GROWTH ? 'text-emerald-200' : 'text-slate-400'}>成长型</span>
                  <div className={`w-3 h-3 rounded-full border-2 ${mindset === Mindset.GROWTH ? 'border-emerald-300 bg-emerald-500' : 'border-slate-700'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Simulation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Info Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selected System Info */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${sysData.borderColor} ${sysData.bgColor}`}>
              <div className="flex items-start justify-between mb-4">
                <sysData.icon className={`w-8 h-8 ${sysData.color}`} />
                <span className={`text-xs font-bold px-2 py-1 rounded bg-black/20 ${sysData.color}`}>
                  运行程序
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${sysData.color}`}>{sysData.name}</h3>
              <p className="text-xs font-semibold opacity-75 mb-4">{sysData.subtitle}</p>
              <p className="text-sm leading-relaxed opacity-90 mb-4">{sysData.description}</p>
              <div>
                <span className="text-xs font-bold uppercase opacity-60 block mb-2">典型场景:</span>
                <div className="flex flex-wrap gap-2">
                  {sysData.examples.map((ex, i) => (
                    <span key={i} className="text-xs bg-black/20 px-2 py-1 rounded text-slate-200 border border-white/5">{ex}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Mindset Info */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${mindData.borderColor} ${mindData.bgColor}`}>
              <div className="flex items-start justify-between mb-4">
                <mindData.icon className={`w-8 h-8 ${mindData.color}`} />
                <span className={`text-xs font-bold px-2 py-1 rounded bg-black/20 ${mindData.color}`}>
                  信念滤镜
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${mindData.color}`}>{mindData.name}</h3>
              <p className="text-xs font-semibold opacity-75 mb-4">{mindData.subtitle}</p>
              <p className="text-sm leading-relaxed opacity-90 mb-4">{mindData.description}</p>
              <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-xs font-bold uppercase opacity-60 block mb-1">核心信念:</span>
                <p className={`text-sm italic font-medium ${mindData.color}`}>"{mindData.motto}"</p>
              </div>
            </div>
          </div>

          {/* Scenario Simulator */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-full min-h-[400px]">
             <div className="p-6 border-b border-slate-700 bg-slate-800/80">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-purple-400" />
                  情境模拟器
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  观察特定的 系统 + 心态 组合如何应对具体情境。
                </p>
             </div>

             <div className="p-6 flex-1 flex flex-col gap-6">
                
                {/* Result Display */}
                {result ? (
                  <div className="flex-1 space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2 text-purple-300 text-sm font-bold">
                          <sysData.batteryIcon className="w-4 h-4" /> 能量消耗
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 transition-all duration-1000" 
                            style={{ width: `${result.energyLevel}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 mt-1 block text-right">{result.energyLevel}% 负荷</span>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2 text-rose-300 text-sm font-bold">
                          <AlertTriangle className="w-4 h-4" /> 压力水平
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-rose-500 transition-all duration-1000" 
                            style={{ width: `${result.stressLevel}%` }}
                          />
                        </div>
                         <span className="text-xs text-slate-500 mt-1 block text-right">{result.stressLevel}% 强度</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 relative">
                      <span className="absolute -top-3 left-4 bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded shadow-sm">内心独白</span>
                      <p className="italic text-slate-300 leading-relaxed font-serif text-lg">"{result.internalMonologue}"</p>
                    </div>

                    <div className="bg-indigo-900/20 p-5 rounded-xl border border-indigo-500/30">
                      <div className="text-indigo-300 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" /> 采取行动
                      </div>
                      <p className="text-indigo-100 font-medium">{result.action}</p>
                    </div>
                    
                    <button 
                       onClick={() => setResult(null)}
                       className="w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                       <RotateCcw className="w-4 h-4" /> 重置模拟
                    </button>
                    <div ref={bottomRef} />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-3 min-h-[200px]">
                    <div className="p-4 bg-slate-800/50 rounded-full">
                       <BrainCircuit className="w-12 h-12 opacity-20" />
                    </div>
                    <p className="text-sm">在下方输入情境以开始模拟。</p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs">
                      <button onClick={() => setScenario("这次期中考试我考得很差。")} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors text-slate-300">示例：考试失败</button>
                      <button onClick={() => setScenario("老板让我负责一个从未做过的复杂项目。")} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors text-slate-300">示例：全新挑战</button>
                      <button onClick={() => setScenario("同事在会议上公开指出了我的错误。")} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors text-slate-300">示例：遭受批评</button>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-900/30 text-red-300 text-sm rounded-lg border border-red-800 flex items-center gap-2">
                    <Info className="w-4 h-4" /> {error}
                  </div>
                )}

                {/* Input Area */}
                <div className="mt-auto pt-4 border-t border-slate-700">
                   <div className="relative">
                      <textarea
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        placeholder="描述一个情境 (例如：'我想学编程，但是看到复杂的代码就头疼')..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-24"
                        onKeyDown={(e) => {
                           if(e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSimulate();
                           }
                        }}
                      />
                      <button
                        onClick={handleSimulate}
                        disabled={loading || !scenario.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25"
                      >
                         {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-500 mt-2 text-center">
                      AI 将根据选定的认知参数（系统+心态）生成模拟反应。
                   </p>
                </div>

             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;