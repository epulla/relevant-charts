export interface ChartProps {
  title: string;
  description: string,
  labelColumn: string;
  dataColumn: string;
  processedData: any[];
}

export type ChartProcessedData = {
  title: string;
  description: string;
  relevanceScore: number;
  data: any[];
};
