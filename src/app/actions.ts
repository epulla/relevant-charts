"use server";

import { z } from "zod";

import { generateRelevantMetricsChartsObject } from "@/lib/ai";
import { AiResponse } from "@/lib/ai";

export async function getAiResponse(dataSample: string) {
  const response = await generateRelevantMetricsChartsObject(dataSample);
  const data = JSON.parse(JSON.stringify(response));
  return data.object as z.infer<typeof AiResponse>;
}
