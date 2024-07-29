"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { ChartProps } from "../types";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnLineChart({ 
  title,
  description,
  labelColumn,
  dataColumn,
  processedData,
 }: ChartProps) {
  const randomColor = useMemo(() => getRandomColor(), []);

  return (
    <ShadcnChartTemplate
      title={title}
      description={description}
      processedData={processedData}
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
            dataKey={labelColumn}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey={dataColumn}
            stroke={randomColor}
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
