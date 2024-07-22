"use client";
import Link from "next/link";
import MetricCard from "@/metrics/components/metric-card";
import { useMetricsStore } from "@/metrics/store";
import { useChartsStore } from "@/charts/store";
import { SUPPORTED_CHARTS } from "@/charts/constants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";

// export const metadata = {
//   title: "Results Page",
//   description: "Your data has been processed and these are the results",
// };

export default function ProcessedPage() {
  const router = useRouter();

  const { metricsResponse } = useMetricsStore();
  // const { chartsResponse } = useChartsStore();
  console.log("metricsResponse", metricsResponse);
  // console.log("chartsResponse", chartsResponse);

  if (metricsResponse.length === 0 
    // || chartsResponse.length === 0
  ) {
    router.push("/");
    return null;
  }
  return (
    <main className="flex-1 w-full mt-12">
      <Link href={`/`}>
      <Button variant="ghost">
        <IoArrowBack/>
        Go back
      </Button>
      </Link>
      <h2 className="text-sm text-primary opacity-50">Results</h2>
      <h1 className="text-2xl text-primary font-bold">
        These are your most relevant metrics and charts...
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-64">
            {metricsResponse.map((metric) => (
              <MetricCard
                key={metric.name}
                metric={metric.value}
                unit={metric.unit}
                name={metric.name}
                description={metric.name}
              ></MetricCard>
            ))}
          </div>
          <div className="flex-1">
            {/* {SUPPORTED_CHARTS[chartsResponse[0].id]({
              chartResponse: chartsResponse[0],
            })} */}
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3">
          {/* {chartsResponse.slice(1).map((chart) => {
            const Component = SUPPORTED_CHARTS[chart.id];
            return <Component key={chart.id} chartResponse={chart} />;
          })} */}
        </div>
      </div>
    </main>
  );
}
