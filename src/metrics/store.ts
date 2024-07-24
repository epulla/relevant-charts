import { create } from "zustand";

export type MetricResponse = {
  name: string;
  columnTarget: string;
  strategy: string;
  unit: string;
  relevanceScore: number;
};

export type State = {
  metricsResponses: MetricResponse[];
};

type Actions = {
  setMetricsResponse: (metricsResponse: MetricResponse[]) => void;
};

export const useMetricsStore = create<State & Actions>((set) => ({
  metricsResponses: [],
  setMetricsResponse: (metricsResponse: MetricResponse[]) =>
    set({
      metricsResponses: metricsResponse,
    }),
}));
