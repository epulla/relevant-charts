"use client";

import { useState, useEffect } from "react";
import { Cell, Pie, PieChart } from "recharts";

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
import { ChartProps } from "../types";
import { getProcessedData } from "../utils";
import { IoMegaphoneSharp } from "react-icons/io5";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";

const chartConfig = {} satisfies ChartConfig;

export function ShadcnPieChart({
  chartResponse,
}: ChartProps) {
  const [processedData, setProcessedData] = useState<any[]>([]);
  useEffect(() => {
    setProcessedData(getProcessedData(chartResponse));
  }, [chartResponse]);
  return (
    <ShadcnChartTemplate
      title={chartResponse.name}
      description={chartResponse.description}
      highlight={chartResponse.highlight}
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {processedData.length > 0 && (
            <Pie
              data={processedData}
              dataKey={Object.keys(processedData[0])[1]}
              innerRadius={60}
              strokeWidth={5}
            >
              {processedData.map((index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Pie>
          )}
        </PieChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
