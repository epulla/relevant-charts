import { create } from "zustand";

export type State = {
  aiContext: string;
  dataObject: any[];
};

type Actions = {
  setAiContext: (aiContext: string) => void;
  setDataObject: (dataObject: any[]) => void;
};

export const useGeneralStore = create<State & Actions>((set) => ({
  aiContext: "",
  setAiContext: (aiContext: string) => set({ aiContext }),
  dataObject: [],
  setDataObject: (dataObject: any[]) => set({ dataObject }),
}));
