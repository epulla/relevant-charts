import { create } from "zustand";

// comes from src/lib/ai.ts
export type ChartResponse = {
  id: string;
  title: string;
  description: string;
  labelColumn: string;
  dataColumn: string;
  strategy: string;
  relevanceScore: number;
};

export type State = {
  chartsResponse: ChartResponse[];
};

type Actions = {
  setChartsResponse: (chartsResponse: ChartResponse[]) => void;
};

export const useChartsStore = create<State & Actions>((set) => ({
  chartsResponse: [],
  setChartsResponse: (chartsResponse: ChartResponse[]) => set({ chartsResponse }),
}));
