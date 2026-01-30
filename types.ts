
export interface Employee {
  id: string;
  role: string;
  area: string;
  detail: string;
  level: number;
  count: number;
  parentId?: string;
  position: { x: number; y: number };
  type?: 'dg' | 'ops' | 'comm' | 'support' | 'gov';
}

export type AnalysisType = 'Diagnostico' | 'Crisis' | 'Futuro' | 'Estrategia' | 'Cultura' | 'TownHall';

export interface AIResponse {
  title: string;
  content: string;
}
