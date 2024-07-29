"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartProps } from "../types";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";
import { useMemo } from "react";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnAreaChart({
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
        <AreaChart
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
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey={dataColumn}
            type="natural"
            fill={randomColor}
            fillOpacity={0.4}
            stroke={randomColor}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
