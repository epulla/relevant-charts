import { create } from "zustand";

export type State = {
  aiContext: string;
  dataObject: any[];
  isAiResultLoading: boolean;
  isFileReading: boolean;
};

type Actions = {
  setAiContext: (aiContext: string) => void;
  setDataObject: (dataObject: any[]) => void;
  setIsAiResultLoading: (isAiResultLoading: boolean) => void;
  setIsFileReading: (isFileReading: boolean) => void;
};

export const useGeneralStore = create<State & Actions>((set) => ({
  aiContext: "",
  setAiContext: (aiContext: string) => set({ aiContext }),
  dataObject: [],
  setDataObject: (dataObject: any[]) => set({ dataObject }),
  isAiResultLoading: false,
  setIsAiResultLoading: (isAiResultLoading: boolean) =>
    set({ isAiResultLoading }),
  isFileReading: false,
  setIsFileReading: (isFileReading: boolean) => set({ isFileReading }),
}));
