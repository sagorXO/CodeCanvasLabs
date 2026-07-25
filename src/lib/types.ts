export interface WaitlistRequest {
  email: string;
  role?: string;
  use_case?: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  role: string;
  use_case: string;
  waitlist_position: number;
  referral_code: string;
  created_at: string;
}

export interface WaitlistApiResponse {
  status: number;
  success: boolean;
  data?: WaitlistEntry;
  error?: string;
}

export type CanvasTab = 'visual' | 'json' | 'logs';

export interface PipelineNode {
  id: string;
  type: 'trigger' | 'ai_transform' | 'output';
  label: string;
  status: string;
  execution_ms?: number;
}

export interface PipelineMetrics {
  execution_time_ms: number;
  uptime_percentage: number;
}

export interface PipelineState {
  active_tab: CanvasTab;
  nodes: PipelineNode[];
  metrics: PipelineMetrics;
}
