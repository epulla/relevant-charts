import { create } from "zustand";
import { MetricResponse } from "./types";

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
