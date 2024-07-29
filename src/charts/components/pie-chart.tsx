"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartProps } from "../types";
import { getRandomColor } from "@/lib/utils";
import { ShadcnChartTemplate } from "./chart-template";

const chartConfig = {
  name: {
    label: "Name",
  },
} satisfies ChartConfig;

export function ShadcnPieChart({
  title,
  description,
  labelColumn,
  dataColumn,
  processedData,
}: ChartProps) {
  return (
    <ShadcnChartTemplate
      title={title}
      description={description}
      processedData={processedData}
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
          <Pie
            data={processedData}
            dataKey={dataColumn}
            nameKey={labelColumn}
            innerRadius={60}
            strokeWidth={5}
          >
            {processedData.map((index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </ShadcnChartTemplate>
  );
}
