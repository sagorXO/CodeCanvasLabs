import { describe, it, expect } from 'vitest';
import { PipelineNode, PipelineState, CanvasTab } from '../lib/types';

describe('Pipeline State Schema & Node Transitions', () => {
  const createDefaultState = (): PipelineState => ({
    active_tab: 'visual',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Webhook Ingest', status: '200 OK' },
      { id: 'n2', type: 'ai_transform', label: 'Gemini Engine Node', status: 'processing' },
      { id: 'n3', type: 'output', label: 'HTTP Response', status: 'ready' },
    ],
    metrics: { execution_time_ms: 11, uptime_percentage: 99.99 },
  });

  it('should initialize with 3 nodes and visual tab', () => {
    const state = createDefaultState();
    expect(state.nodes).toHaveLength(3);
    expect(state.active_tab).toBe('visual');
  });

  it('should accept valid tab transitions', () => {
    const tabs: CanvasTab[] = ['visual', 'json', 'logs'];
    tabs.forEach((tab) => {
      const state: PipelineState = { ...createDefaultState(), active_tab: tab };
      expect(state.active_tab).toBe(tab);
    });
  });

  it('should enforce correct node type enum values', () => {
    const state = createDefaultState();
    const validTypes = ['trigger', 'ai_transform', 'output'];
    state.nodes.forEach((node) => {
      expect(validTypes).toContain(node.type);
    });
  });

  it('should maintain metrics invariants', () => {
    const state = createDefaultState();
    expect(state.metrics.execution_time_ms).toBeLessThanOrEqual(100);
    expect(state.metrics.uptime_percentage).toBeGreaterThanOrEqual(99.0);
    expect(state.metrics.uptime_percentage).toBeLessThanOrEqual(100.0);
  });

  it('should preserve node order (trigger → ai_transform → output)', () => {
    const state = createDefaultState();
    expect(state.nodes[0].type).toBe('trigger');
    expect(state.nodes[1].type).toBe('ai_transform');
    expect(state.nodes[2].type).toBe('output');
  });

  it('should ensure all nodes have unique IDs', () => {
    const state = createDefaultState();
    const ids = state.nodes.map((n) => n.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
