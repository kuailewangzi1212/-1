import React from 'react';
import { ThinkingSystem, Mindset } from '../types';
import { Battery, BatteryCharging, Zap } from 'lucide-react';

interface BrainVisualProps {
  system: ThinkingSystem;
  mindset: Mindset;
}

const BrainVisual: React.FC<BrainVisualProps> = ({ system, mindset }) => {
  const isSystem1 = system === ThinkingSystem.SYSTEM_1;
  const isFixed = mindset === Mindset.FIXED;

  // Colors
  const sysColor = isSystem1 ? '#22d3ee' : '#fb923c'; // Cyan vs Orange
  const mindColor = isFixed ? '#94a3b8' : '#34d399'; // Slate vs Emerald

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto flex items-center justify-center p-4">
      {/* Outer Halo (Mindset Filter) */}
      <div 
        className={`absolute inset-0 rounded-full border-4 transition-all duration-700 ${
           isFixed ? 'border-slate-600 border-dashed opacity-50' : 'border-emerald-500/50 border-double scale-105'
        }`} 
      />
      
      {/* Energy Indicator (Battery) */}
      <div className={`absolute top-0 right-0 p-2 rounded-lg backdrop-blur-md border flex flex-col items-center gap-1 transition-all duration-500 ${
          isSystem1 ? 'bg-cyan-900/30 border-cyan-500/30' : 'bg-orange-900/30 border-orange-500/30'
      }`}>
          {isSystem1 ? (
             <BatteryCharging className="w-5 h-5 text-cyan-400" />
          ) : (
             <Battery className="w-5 h-5 text-orange-400 animate-pulse" />
          )}
          <span className="text-[10px] uppercase font-bold text-slate-400">
             {isSystem1 ? '低能耗' : '高能耗'}
          </span>
      </div>

       {/* Background Glow */}
       <div 
        className="absolute inset-4 rounded-full blur-3xl opacity-20 transition-colors duration-700"
        style={{ backgroundColor: sysColor }}
      />

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={sysColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={mindColor} stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Head/Brain Outline */}
        <path
          d="M100 180 C 60 180, 30 140, 30 100 C 30 50, 60 20, 100 20 C 140 20, 170 50, 170 100 C 170 140, 140 180, 100 180 Z"
          fill="none"
          stroke={mindColor}
          strokeWidth={isFixed ? "4" : "2"}
          className="transition-all duration-700"
        />
        
        {/* Mindset "Filter" Effect */}
        {isFixed && (
            <path 
                d="M30 100 Q 100 20 170 100" 
                fill="none" 
                stroke={mindColor} 
                strokeWidth="2" 
                strokeDasharray="4 4"
                className="opacity-50"
            />
        )}

        {/* Neural Network Visualization */}
        {isSystem1 ? (
          /* System 1: Simple, Direct Lines (Fast/Auto) */
          <g className="opacity-80">
            <path d="M50 100 L 150 100" stroke={sysColor} strokeWidth="4" className="path-fast" filter="url(#glow)" />
            <path d="M60 70 L 140 130" stroke={sysColor} strokeWidth="3" className="path-fast" filter="url(#glow)" />
            <path d="M60 130 L 140 70" stroke={sysColor} strokeWidth="3" className="path-fast" filter="url(#glow)" />
            {/* Spark for intuition */}
            <Zap x="90" y="90" width="20" height="20" className="text-cyan-200 animate-pulse origin-center" />
          </g>
        ) : (
          /* System 2: Complex, Interconnected Nodes (Slow/Deep) */
          <g className="opacity-90">
             {/* Central Processing Unit */}
            <circle cx="100" cy="100" r="25" fill="none" stroke={sysColor} strokeWidth="2" className="animate-pulse-slow" />
            <circle cx="100" cy="100" r="15" fill={sysColor} opacity="0.3" />
            
            {/* Satellite Nodes */}
            <circle cx="60" cy="60" r="6" fill={mindColor} />
            <circle cx="140" cy="60" r="6" fill={mindColor} />
            <circle cx="60" cy="140" r="6" fill={mindColor} />
            <circle cx="140" cy="140" r="6" fill={mindColor} />
            <circle cx="100" cy="40" r="6" fill={mindColor} />

            {/* Connections - Heavy processing */}
            <path d="M100 75 L 100 40" stroke={sysColor} strokeWidth="2" className="path-slow" />
            <path d="M78 78 L 60 60" stroke={sysColor} strokeWidth="2" className="path-slow" />
            <path d="M122 78 L 140 60" stroke={sysColor} strokeWidth="2" className="path-slow" />
            <path d="M78 122 L 60 140" stroke={sysColor} strokeWidth="2" className="path-slow" />
            <path d="M122 122 L 140 140" stroke={sysColor} strokeWidth="2" className="path-slow" />
            
            {/* Gear-like rotation for effort */}
            <g transform="translate(100, 100)">
                 <circle r="32" stroke={sysColor} strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow" style={{animationDuration: '10s'}}/>
            </g>
          </g>
        )}
      </svg>
      
      {/* Label Overlay */}
      <div className="absolute bottom-4 text-center w-full">
         <span className={`text-xs uppercase tracking-widest font-bold block ${isFixed ? 'text-slate-500' : 'text-emerald-500'}`}>
            思维模式: {isFixed ? '固定型' : '成长型'}
         </span>
         <span className={`text-xs font-mono mt-1 block ${isSystem1 ? 'text-cyan-400' : 'text-orange-400'}`}>
            思考系统: {system === ThinkingSystem.SYSTEM_1 ? '默认程序' : '深度思考'}
         </span>
      </div>
    </div>
  );
};

export default BrainVisual;