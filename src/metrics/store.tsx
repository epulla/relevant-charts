import { create } from "zustand";

// comes from src/lib/ai.ts
export type MetricResponse = {
  name: string;
  columnTarget: string;
  strategy: string;
  unit: string;
  relevanceScore: number;
};

export type State = {
  metricsResponse: MetricResponse[];
};

type Actions = {
  setMetricsResponse: (metricsResponse: MetricResponse[]) => void;
};

export const useMetricsStore = create<State & Actions>((set) => ({
  metricsResponse: [],
  setMetricsResponse: (metricsResponse: MetricResponse[]) =>
    set({
      metricsResponse,
    }),
}));
