import { ShadcnAreaChart } from "./components/area-chart";
import { ShadcnBarChart } from "./components/bar-chart";
import { ShadcnLineChart } from "./components/line-chart";
import { ShadcnPieChart } from "./components/pie-chart";
import { ChartProps } from "./types";

// export const getProcessedData = (chartResponse: ChartResponse) => {
//   return chartResponse.labels.map((item, i) => ({
//     label: item,
//     ...chartResponse.data.reduce(
//       (acc, { name, values }) => ({
//         ...acc,
//         [name]: values[i] || 0,
//       }),
//       {}
//     ),
//   }));
// };

export const SUPPORTED_CHARTS_WITH_STRATEGIES: {
  [id: string]: {
    component: ({ chartResponse }: ChartProps) => JSX.Element;
    strategies: string[];
  };
} = {
  bar: {
    component: ShadcnBarChart,
    strategies: ["mapLabelsWithData", "groupByLabelsAndCount"],
  },
  pie: {
    component: ShadcnPieChart,
    strategies: [],
  },
  area: {
    component: ShadcnAreaChart,
    strategies: [],
  },
  line: {
    component: ShadcnLineChart,
    strategies: [],
  },
};

// strategies to calculate data for charts
export const SUPPORTED_CHARTS_STRATEGIES: {
  [id: string]: (data: any[], labelColumn: string, dataColumn: string) => any[];
} = {
  mapLabelsWithData: (data: any[], labelColumn: string, dataColumn: string) => {
    return data.map((item) => ({
      [labelColumn]: item[labelColumn],
      [dataColumn]: item[dataColumn],
    }));
  },
  groupByLabelsAndCount: (data: any[], labelColumn: string, _: string) => {
    const groupedData = Object.groupBy(
      data,
      ({ [labelColumn]: label }) => label
    );
    return Object.entries(groupedData).map(([label, values]) => ({
      label,
      count: values?.length || 0,
    }));
  },
};
