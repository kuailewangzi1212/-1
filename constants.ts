import { ThinkingSystem, Mindset } from './types';
import { Zap, Brain, Lock, Sprout, Battery, BatteryCharging } from 'lucide-react';

export const SYSTEM_INFO = {
  [ThinkingSystem.SYSTEM_1]: {
    name: "系统一：默认程序",
    subtitle: "自动 • 直觉 • 低能耗",
    description: "大脑的“自动驾驶”模式。这是一套默认程序，反应迅速，依赖习惯和直觉处理熟悉事务，消耗极少的能量。",
    icon: Zap,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400",
    examples: ["走路吃东西", "日常问候", "1 + 1 = 2"],
    energyCost: "低 (节能模式)",
    batteryIcon: BatteryCharging
  },
  [ThinkingSystem.SYSTEM_2]: {
    name: "系统二：深度思考",
    subtitle: "缓慢 • 逻辑 • 高能耗",
    description: "大脑的“手动驾驶”模式。这是一套用来处理陌生、复杂问题的程序，需要刻意专注和逻辑推理，非常消耗脑力。",
    icon: Brain,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400",
    examples: ["做复杂的数学题", "学习新技能", "做重要决策"],
    energyCost: "高 (耗电模式)",
    batteryIcon: Battery
  },
};

export const MINDSET_INFO = {
  [Mindset.FIXED]: {
    name: "固定型思维",
    subtitle: "维护形象 • 畏惧挑战",
    description: "认为智力和才能是天生的、固定不变的。为了维护“聪明”的形象，往往回避挑战，害怕失败，认为努力是能力不足的表现。",
    icon: Lock,
    color: "text-slate-400",
    bgColor: "bg-slate-400/10",
    borderColor: "border-slate-400",
    motto: "如果我要很努力才能学会，说明我不够聪明。",
  },
  [Mindset.GROWTH]: {
    name: "成长型思维",
    subtitle: "拥抱挑战 • 持续进化",
    description: "认为大脑像肌肉一样，越用越聪明。乐于迎接挑战，视失败为成长的契机，相信通过努力和策略可以突破自我。",
    icon: Sprout,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400",
    motto: "这很难，说明我正在学习和进步。",
  },
};