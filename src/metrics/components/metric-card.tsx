"use client";

import { Card } from "@/components/ui/card";
import { SUPPORTED_METRIC_STRATEGIES } from "../utils";
import { useGeneralStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { useMetricsStore } from "../store";

interface Props {
  name: string;
  columnTarget: string;
  strategy: string;
  unit: string;
}

export default function MetricCard({
  name,
  columnTarget,
  strategy,
  unit,
}: Props) {
  const [metric, setMetric] = useState<number>(0);

  const { dataObject } = useGeneralStore();

  useEffect(() => {
    if (dataObject.length === 0) return;
    setMetric(
      SUPPORTED_METRIC_STRATEGIES[strategy](
        dataObject.map((row) => {
          const value = row[columnTarget];
          if (value === undefined || isNaN(value)) return 0;
          return parseFloat(value);
        })
      )
    );
  }, [columnTarget, dataObject, strategy]);
  return (
    <Card className="flex-1 flex flex-col justify-center items-center py-6 md:py-0 px-6 overflow-hidden">
      <>
        <div className="flex gap-1">
          <h2 className="text-4xl text-primary font-bold">
            {/* reference: https://stackoverflow.com/questions/62737265/converting-float-to-2-decimal-number-in-javascript */}
            {+metric.toFixed(2)}
          </h2>
          <span className="flex items-end text-xs text-primary opacity-50">
            {unit}
          </span>
        </div>
        <p className="text-sm text-primary text-center text-wrap opacity-50">
          {name}
        </p>
      </>
    </Card>
  );
}
