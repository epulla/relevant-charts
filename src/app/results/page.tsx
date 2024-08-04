"use client";
import MetricCard from "@/metrics/components/metric-card";
import { useMetricsStore } from "@/metrics/store";
import { useChartsStore } from "@/charts/store";
import {
  SUPPORTED_CHARTS_STRATEGIES,
  SUPPORTED_CHARTS_WITH_STRATEGIES,
} from "@/charts/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoDownload, IoPeople, IoRefresh } from "react-icons/io5";
import { useGeneralStore } from "@/lib/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { downloadFile, jsonToCsv } from "@/lib/utils";
import { MAX_RECORDS_TO_CONSIDER_FOR_AI } from "@/lib/constants";
import { ConfirmationModal } from "@/components/confirmation-modal";
import TooltipWrapper from "@/components/tooltip-wrapper";
import { getAiResponse } from "../actions";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SUPPORTED_METRIC_STRATEGIES } from "@/metrics/utils";
import { MetricProcessedData } from "@/metrics/types";
import { ChartProcessedData } from "@/charts/types";
import CommunitySaveModal from "../../components/community-save-modal";
import html2canvas from "html2canvas";

function ReloadChecker() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.has("reloaded")) {
      toast({
        title: "Hecho!",
        description:
          "Tus datos han sido procesados nuevamente. Probablemente hayas notado cambios en las métricas y gráficos.",
        duration: 5000,
      });
    }
  }, [searchParams, toast]);

  return null;
}

// IMPORTANT: Done like this to avoid re-rendering the whole page
const metricsProcessedData: MetricProcessedData[] = [];
const chartsProcessedData: ChartProcessedData[] = [];

export default function ProcessedPage() {
  const [openCommunitySaveModal, setOpenCommunitySaveModal] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  const router = useRouter();

  const { metricsResponses, setMetricsResponse } = useMetricsStore();
  const { chartsResponses, setChartsResponse } = useChartsStore();
  const {
    aiContext,
    dataObject,
    setAiContext,
    isAiResultLoading,
    setIsAiResultLoading,
  } = useGeneralStore();

  if (metricsResponses.length === 0 || chartsResponses.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full mt-12">
      <Suspense>
        <ReloadChecker />
      </Suspense>
      <ConfirmationModal
        title="¿Estás seguro de que deseas volver al inicio?"
        description="Si vuelves al inicio y no has descargado los datos procesados, perderás los datos procesados y tendrás que volver a subir el archivo."
        onConfirm={() => router.push("/")}
        triggerComponent={
          <Button className="-ml-4" variant="ghost">
            <IoArrowBack className="mr-2" />
            Ir a inicio
          </Button>
        }
      />
      <CommunitySaveModal
        open={openCommunitySaveModal}
        onOpenChange={setOpenCommunitySaveModal}
        coverImageUrl={coverImageUrl}
        data={{
          aiContext,
          metrics: metricsProcessedData,
          charts: chartsProcessedData,
        }}
      />
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
            <pre className="overflow-x-auto">
              {jsonToCsv(dataObject.slice(0, MAX_RECORDS_TO_CONSIDER_FOR_AI))}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-between mt-2 mb-0.5">
        <h2 className="text-2xl text-primary font-bold">
          Estos son tus métricas y gráficos más relevantes...
        </h2>
        <div className="flex gap-0.5">
          <TooltipWrapper tooltip="Regenerar el contexto de la IA y reprocesar los datos">
            <Button
              variant="outline"
              size="sm"
              className="rounded"
              onClick={async () => {
                setIsAiResultLoading(true);
                const generatedObject = await getAiResponse(
                  jsonToCsv(dataObject.slice(0, MAX_RECORDS_TO_CONSIDER_FOR_AI))
                );
                setAiContext(generatedObject.context);
                setMetricsResponse(
                  generatedObject.metrics.toSorted(
                    (a, b) => b.relevanceScore - a.relevanceScore
                  )
                );
                setChartsResponse(
                  generatedObject.charts.toSorted(
                    (a, b) => b.relevanceScore - a.relevanceScore
                  )
                );
                setIsAiResultLoading(false);
                // go to results page
                router.push("/results?reloaded=true");
              }}
            >
              <IoRefresh
                aria-checked={isAiResultLoading}
                className="aria-[checked=true]:animate-spin"
              />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Compartir con la comunidad">
            <Button
              variant="outline"
              size="sm"
              className="rounded"
              onClick={async () => {
                setOpenCommunitySaveModal(true);
                if (coverImageUrl) return;
                const mobileLayoutActive = window.innerWidth < 768;
                const $results = document.getElementById("results")!;
                const $mainResults = document.getElementById("main-results")!;
                $mainResults.style.background = "#000";
                if (mobileLayoutActive) {
                  $results.style.overflow = "hidden";
                  $mainResults.style.flexDirection = "row";
                  $mainResults.style.width = "1024px";
                  await new Promise((resolve) => setTimeout(resolve, 500));
                }
                const canvas = await html2canvas($mainResults);
                $mainResults.style.background = "";
                if (mobileLayoutActive) {
                  $results.style.overflow = "";
                  $mainResults.style.flexDirection = "";
                  $mainResults.style.width = "";
                }
                setCoverImageUrl(canvas.toDataURL());
              }}
            >
              <IoPeople />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Descargar datos procesados en .json">
            <Button
              variant="outline"
              size="sm"
              className="rounded bg-white text-black"
              onClick={() => {
                const data = {
                  aiContext,
                  metrics: metricsProcessedData,
                  charts: chartsProcessedData,
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                  type: "application/json",
                });
                downloadFile("processed-data.json", blob);
              }}
            >
              <IoDownload />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
      <div className="flex flex-col" id="results">
        <div className="flex flex-col md:flex-row" id="main-results">
          <div className="flex flex-col md:w-64">
            {metricsResponses.map((metricResponse) => {
              const strategyFunction =
                SUPPORTED_METRIC_STRATEGIES[metricResponse.strategy];
              const metric = strategyFunction(
                dataObject.map((row) => {
                  const value = row[metricResponse.columnTarget];
                  if (value === undefined || isNaN(value)) return 0;
                  return parseFloat(value);
                })
              );
              const alreadyExists = metricsProcessedData.some(
                (m) => m.name === metricResponse.name
              );
              if (!alreadyExists) {
                metricsProcessedData.push({
                  name: metricResponse.name,
                  unit: metricResponse.unit,
                  relevanceScore: metricResponse.relevanceScore,
                  data: metric,
                });
              }
              return (
                <MetricCard
                  key={metricResponse.name}
                  name={metricResponse.name}
                  metric={metric}
                  unit={metricResponse.unit}
                />
              );
            })}
          </div>
          <div className="flex-1">
            {(() => {
              const chartResponse = chartsResponses[0];
              const strategyFunction =
                SUPPORTED_CHARTS_STRATEGIES[chartResponse.strategy];
              const processedData = strategyFunction(
                dataObject,
                chartResponse.labelColumn,
                chartResponse.dataColumn
              );
              const alreadyExists = chartsProcessedData.some(
                (m) => m.title === chartResponse.title
              );
              if (!alreadyExists) {
                chartsProcessedData.push({
                  title: chartResponse.title,
                  description: chartResponse.description,
                  relevanceScore: chartResponse.relevanceScore,
                  labelColumn: chartResponse.labelColumn,
                  dataColumn: chartResponse.dataColumn,
                  chartId: chartResponse.chartId,
                  data: processedData,
                });
              }
              const ChartComponent =
                SUPPORTED_CHARTS_WITH_STRATEGIES[chartResponse.chartId]
                  .component;
              return (
                <ChartComponent
                  key={`${chartResponse.chartId}-0`}
                  title={chartResponse.title}
                  description={chartResponse.description}
                  labelColumn={chartResponse.labelColumn}
                  dataColumn={chartResponse.dataColumn}
                  processedData={processedData}
                />
              );
            })()}
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3">
          {chartsResponses.slice(1).map((chartResponse, i) => {
            const ChartComponent =
              SUPPORTED_CHARTS_WITH_STRATEGIES[chartResponse.chartId].component;
            const strategyFunction =
              SUPPORTED_CHARTS_STRATEGIES[chartResponse.strategy];
            const processedData = strategyFunction(
              dataObject,
              chartResponse.labelColumn,
              chartResponse.dataColumn
            );
            const alreadyExists = chartsProcessedData.some(
              (m) => m.title === chartResponse.title
            );
            if (!alreadyExists) {
              chartsProcessedData.push({
                title: chartResponse.title,
                description: chartResponse.description,
                relevanceScore: chartResponse.relevanceScore,
                labelColumn: chartResponse.labelColumn,
                dataColumn: chartResponse.dataColumn,
                chartId: chartResponse.chartId,
                data: processedData,
              });
            }
            return (
              <ChartComponent
                key={`${chartResponse.chartId}-${i}`}
                title={chartResponse.title}
                description={chartResponse.description}
                labelColumn={chartResponse.labelColumn}
                dataColumn={chartResponse.dataColumn}
                processedData={processedData}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
