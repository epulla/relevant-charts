import { ChartProcessedData } from "@/charts/types";
import { MetricProcessedData } from "@/metrics/types";

export interface Example {
  id: string;
  author: string;
  name: string;
  createdAt: string;
  data: string;
  cover: string;
}

export interface ExampleData {
  aiContext: string;
  metrics: MetricProcessedData[];
  charts: ChartProcessedData[];
}
