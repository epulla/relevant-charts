"use client";
import Link from "next/link";
import MetricCard from "@/metrics/components/metric-card";
import { useMetricsStore } from "@/metrics/store";
import { useChartsStore } from "@/charts/store";
import { SUPPORTED_CHARTS_WITH_STRATEGIES } from "@/charts/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { useGeneralStore } from "@/lib/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { jsonToCsv } from "@/lib/utils";
import { MAX_RECORDS_TO_CONSIDER_FOR_AI } from "@/lib/constants";

// export const metadata = {
//   title: "Results Page",
//   description: "Your data has been processed and these are the results",
// };

export default function ProcessedPage() {
  const router = useRouter();

  const { metricsResponses } = useMetricsStore();
  const { chartsResponses } = useChartsStore();
  const { aiContext, dataObject } = useGeneralStore();
  console.log("dataObject", dataObject);
  // console.log("metricsResponse", metricsResponse);
  // console.log("chartsResponse", chartsResponse);

  if (metricsResponses.length === 0 || chartsResponses.length === 0) {
    router.push("/");
    return null;
  }
  return (
    <main className="flex-1 w-full mt-12">
      <Link href={`/`}>
        <Button variant="ghost">
          <IoArrowBack />
          Ir a inicio
        </Button>
      </Link>
      <h1 className="text-sm text-primary opacity-50">Resultados</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Contexto:</AccordionTrigger>
          <AccordionContent>
            <p>
              Se utilizó lo siguiente para la generación de las métricas y
              gráficos:
            </p>
            <br />
            <p>{aiContext}</p>
            <br />
            <p>
              Más las primeras {MAX_RECORDS_TO_CONSIDER_FOR_AI} líneas del
              dataset:
            </p>
            <br />
            <pre>
              {jsonToCsv(dataObject.slice(0, MAX_RECORDS_TO_CONSIDER_FOR_AI))}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="text-2xl text-primary font-bold mt-2">
        {/* These are your most relevant metrics and charts... */}
        Estos son tus métricas y gráficos más relevantes...
      </h2>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-64">
            {metricsResponses.map((metric) => (
              <MetricCard
                key={metric.name}
                unit={metric.unit}
                name={metric.name}
                columnTarget={metric.columnTarget}
                strategy={metric.strategy}
              ></MetricCard>
            ))}
          </div>
          <div className="flex-1">
            {SUPPORTED_CHARTS_WITH_STRATEGIES[chartsResponses[0].id].component({
              chartResponse: chartsResponses[0],
            })}
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3">
          {chartsResponses.slice(1).map((chartResponse, i) => {
            const ChartComponent =
              SUPPORTED_CHARTS_WITH_STRATEGIES[chartResponse.id].component;
            return (
              <ChartComponent
                key={`${chartResponse.id}-${i}`}
                chartResponse={chartResponse}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
