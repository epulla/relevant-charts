import { LOCAL_EXAMPLES } from "@/examples/constants";
import { ExampleData } from "@/examples/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { promises as fs } from "fs";
import MetricCard from "@/metrics/components/metric-card";
import { SUPPORTED_CHARTS_WITH_STRATEGIES } from "@/charts/utils";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DownloadJsonButton from "@/components/download-json-button";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function LocalExamplePage({ params }: Props) {
  if (!params.id || !LOCAL_EXAMPLES[params.id]) {
    return notFound();
  }
  const example = LOCAL_EXAMPLES[params.id];
  const file = await fs.readFile(
    `${process.cwd()}/public/${example.dataUrl}`,
    "utf8"
  );
  const data: ExampleData = JSON.parse(file);
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
