import { ChartProcessedData } from "@/charts/types";
import { MetricProcessedData } from "@/metrics/types";

export interface Example {
  id: string;
  author: string;
  title: string;
  createdAt: string;
  dataUrl: string;
  coverUrl: string;
}

export interface ExampleData {
  aiContext: string;
  metrics: MetricProcessedData[];
  charts: ChartProcessedData[];
}
