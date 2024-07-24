import { promises as fs } from "fs";
import { SUPPORTED_CHARTS_WITH_STRATEGIES } from "@/charts/utils";
import { ChartResponse } from "@/charts/store";
import { MetricResponse } from "@/metrics/store";
import { LocalExample } from "@/local-examples/types";

interface Props {
  example: LocalExample;
}

export default async function LocalExampleCard({ example }: Props) {
  const data = JSON.parse(
    await fs.readFile(
      process.cwd() + `/src/local-examples/samples/${example.data}`,
      "utf8"
    )
  ) satisfies { metrics: MetricResponse[]; charts: ChartResponse[] };
  const chartData = {
    ...data.charts[0],
    name: example.name,
    description: `Author: ${example.author}`,
    highlight: `Created at: ${new Date(
      example.createdAt
    ).toLocaleDateString()}`,
  } satisfies ChartResponse;
  const ChartComponent = SUPPORTED_CHARTS_WITH_STRATEGIES[chartData.id];

  // return <ChartComponent chartResponse={chartData} />;
  return <></>;
}
