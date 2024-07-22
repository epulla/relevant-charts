"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { ChartProps } from "../types";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";
import { useGeneralStore } from "@/lib/store";
import { SUPPORTED_CHARTS_STRATEGIES } from "../utils";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnLineChart({ chartResponse }: ChartProps) {
  const [processedData, setProcessedData] = useState<any[]>([]);
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
  }, [chartResponse, dataObject]);
  return (
    <ShadcnChartTemplate
      title={chartResponse.title}
      description={chartResponse.description}
    >
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={processedData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={chartResponse.labelColumn}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey={chartResponse.dataColumn}
            stroke={getRandomColor()}
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
