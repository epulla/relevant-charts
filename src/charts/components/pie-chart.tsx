"use client";

import { useState, useEffect, useMemo } from "react";
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
import { SUPPORTED_CHARTS_STRATEGIES } from "../utils";
import { useGeneralStore } from "@/lib/store";

const chartConfig = {
  name: {
    label: "Name",
  },
} satisfies ChartConfig;

export function ShadcnPieChart({ chartResponse }: ChartProps) {
  const [processedData, setProcessedData] = useState<any[]>([]);
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
            dataKey={"points"}
            nameKey={"name"}
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
