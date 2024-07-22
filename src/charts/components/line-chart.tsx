"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { ChartProps } from "../types";
import { getProcessedData } from "../utils";
import { IoMegaphoneSharp } from "react-icons/io5";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnLineChart({
  chartResponse,
}: ChartProps) {
  const [processedData, setProcessedData] = useState<any[]>([]);
  useEffect(() => {
    if (chartResponse) {
      setProcessedData(getProcessedData(chartResponse));
    }
  }, [chartResponse]);
  return (
    <ShadcnChartTemplate
      title={chartResponse.name}
      description={chartResponse.description}
      highlight={chartResponse.highlight}
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
          {processedData.length > 0 && (
            <XAxis
              dataKey={Object.keys(processedData[0])[0]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
          )}
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {chartResponse.data.map((item) => (
            <Line
              key={item.name}
              dataKey={item.name}
              stroke={getRandomColor()}
              strokeWidth={2}
              type="monotone"
            />
          ))}
        </LineChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
