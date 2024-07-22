"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getRandomColor } from "@/lib/utils";
import { ChartProps } from "../types";
import { ShadcnChartTemplate } from "./chart-template";
import { useGeneralStore } from "@/lib/store";
import { SUPPORTED_CHARTS_STRATEGIES } from "../utils";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnBarChart({ chartResponse }: ChartProps) {
  const [processedData, setProcessedData] = useState<any>([]);
  console.log("processedData", processedData);
  const { dataObject } = useGeneralStore();

  useEffect(() => {
    const strategyFunction =
      SUPPORTED_CHARTS_STRATEGIES[chartResponse.strategy];
    setProcessedData(
      strategyFunction(
        dataObject,
        chartResponse.labelColumn,
        chartResponse.dataColumn
      )
    );
  }, [
    chartResponse.dataColumn,
    chartResponse.labelColumn,
    chartResponse.strategy,
    dataObject,
  ]);

  return (
    <ShadcnChartTemplate
      title={chartResponse.title}
      description={chartResponse.description}
    >
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={processedData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={chartResponse.labelColumn}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey={chartResponse.dataColumn} fill={getRandomColor()} />
        </BarChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
