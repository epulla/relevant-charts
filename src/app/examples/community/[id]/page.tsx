import { SUPPORTED_CHARTS_WITH_STRATEGIES } from "@/charts/utils";
import DownloadJsonButton from "@/components/download-json-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getExampleById } from "@/db/db";
import { ExampleData } from "@/examples/types";
import MetricCard from "@/metrics/components/metric-card";
import { kv } from "@vercel/kv";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  params: { id: string };
}

export default async function CommunityExamplePage({ params }: Props) {
  const pgResults = await getExampleById(params.id);
  if (pgResults.length === 0) {
    return notFound();
  }
  const example = pgResults[0];
  const data: ExampleData = (await kv.get(params.id)) as ExampleData;

  return (
    <>
      <Link href="/examples">
        <Button className="-ml-4" variant="ghost">
          <IoArrowBack className="mr-2" />
          Ir a ejemplos
        </Button>
      </Link>
      <h1 className="text-4xl text-primary">{example.title}</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Contexto:</AccordionTrigger>
          <AccordionContent>
            <p>
              Se utilizó lo siguiente para la generación de las métricas y
              gráficos:
            </p>
            <br />
            <p>{data.aiContext}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col">
        <div className="flex justify-end mt-2 mb-0.5">
          <DownloadJsonButton
            tooltip="Descargar los datos procesados en .json"
            data={data}
            filename={example.title}
          ></DownloadJsonButton>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-64">
            {data.metrics.map((metric) => (
              <MetricCard
                key={metric.name}
                name={metric.name}
                metric={metric.data}
                unit={metric.unit}
              />
            ))}
          </div>
          <div className="flex-1">
            {(() => {
              const chart = data.charts[0];
              const ChartComponent =
                SUPPORTED_CHARTS_WITH_STRATEGIES[chart.chartId].component;
              return (
                <ChartComponent
                  key={chart.title}
                  title={chart.title}
                  description={chart.description}
                  labelColumn={chart.labelColumn}
                  dataColumn={chart.dataColumn}
                  processedData={chart.data}
                />
              );
            })()}
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3">
          {data.charts.slice(1).map((chart) => {
            const ChartComponent =
              SUPPORTED_CHARTS_WITH_STRATEGIES[chart.chartId].component;
            return (
              <ChartComponent
                key={chart.title}
                title={chart.title}
                description={chart.description}
                labelColumn={chart.labelColumn}
                dataColumn={chart.dataColumn}
                processedData={chart.data}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
