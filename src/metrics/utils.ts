export const SUPPORTED_METRIC_STRATEGIES: {
  [id: string]: (data: any[]) => number;
} = {
  count: (data: any[]) => data.length,
  sum: (data: any[]) => data.reduce((acc, value) => acc + value, 0),
  average: (data: any[]) =>
    data.reduce((acc, value) => acc + value, 0) / data.length,
  max: (data: any[]) => Math.max(...data),
  min: (data: any[]) => Math.min(...data),
};
