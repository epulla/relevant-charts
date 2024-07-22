import { ShadcnAreaChart } from "./components/area-chart";
import { ShadcnBarChart } from "./components/bar-chart";
import { ShadcnLineChart } from "./components/line-chart";
import { ShadcnPieChart } from "./components/pie-chart";
import { ChartProps } from "./types";

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
    strategies: ["mapLabelsWithData", "groupByLabelsAndCount"],
  },
  // area: {
  //   component: ShadcnAreaChart,
  //   strategies: [],
  // },
  line: {
    component: ShadcnLineChart,
    strategies: ["mapLabelsWithData", "groupByLabelsAndCount"],
  },
};

// strategies to calculate data for charts
export const SUPPORTED_CHARTS_STRATEGIES: {
  [id: string]: (data: any[], labelColumn: string, dataColumn: string) => any[];
} = {
  mapLabelsWithData: (data: any[], labelColumn: string, dataColumn: string) => {
    return data.map((item) => ({
      [labelColumn]: item[labelColumn],
      [dataColumn]: +item[dataColumn],
    }));
  },
  groupByLabelsAndCount: (
    data: any[],
    labelColumn: string,
    dataColumn: string
  ) => {
    const groupedData = Object.groupBy(
      data,
      ({ [labelColumn]: label }) => label
    );
    return Object.entries(groupedData).map(([label, values]) => ({
      [labelColumn]: label,
      [dataColumn]: values?.length || 0,
    }));
  },
};
