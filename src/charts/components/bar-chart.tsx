"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { getRandomColor } from "@/lib/utils";
import { ChartProps } from "../types";
import { ShadcnChartTemplate } from "./chart-template";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnBarChart({
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
        <BarChart accessibilityLayer data={processedData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={labelColumn}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey={dataColumn} fill={randomColor} />
        </BarChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
