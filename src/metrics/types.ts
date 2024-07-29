export type MetricResponse = {
  name: string;
  columnTarget: string;
  strategy: string;
  unit: string;
  relevanceScore: number;
};

export type MetricProcessedData = {
  name: string;
  unit: string;
  relevanceScore: number;
  data: number;
};
