export enum ThinkingSystem {
  SYSTEM_1 = 'SYSTEM_1', // Fast, Intuitive
  SYSTEM_2 = 'SYSTEM_2', // Slow, Deliberate
}

export enum Mindset {
  FIXED = 'FIXED', // Static intelligence
  GROWTH = 'GROWTH', // Malleable intelligence
}

export interface SimulationResponse {
  internalMonologue: string;
  action: string;
  energyLevel: number; // 0-100
  stressLevel: number; // 0-100
}

export interface ScenarioLog {
  id: string;
  scenario: string;
  system: ThinkingSystem;
  mindset: Mindset;
  response: SimulationResponse;
}