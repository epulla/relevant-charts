import { ChartProcessedData } from "@/charts/types";
import { MetricProcessedData } from "@/metrics/types";

export interface LocalExample {
  id: string;
  author: string;
  title: string;
  createdAt: string;
  coverUrl: string;
  dataUrl: string;
}

export interface ExampleData {
  aiContext: string;
  metrics: MetricProcessedData[];
  charts: ChartProcessedData[];
}
