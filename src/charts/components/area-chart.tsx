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
import { useGeneralStore } from "@/lib/store";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnAreaChart({ chartResponse }: ChartProps) {
  const { dataObject } = useGeneralStore();
  return (
    <ShadcnChartTemplate
      title={chartResponse.name}
      description={chartResponse.description}
      highlight={chartResponse.highlight}
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
          {processedData.length > 0 && (
            <XAxis
              dataKey={Object.keys(processedData[0])[0]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
          )}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          {chartResponse.data.map((item) => {
            const randomColor = getRandomColor();
            return (
              <Area
                key={item.name}
                dataKey={item.name}
                type="natural"
                fill={randomColor}
                fillOpacity={0.4}
                stroke={randomColor}
                stackId="a"
              />
            );
          })}
        </AreaChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
