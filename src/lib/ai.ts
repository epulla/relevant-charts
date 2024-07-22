import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { MAX_CHARTS_TO_SHOW, MAX_METRICS_TO_SHOW } from "./constants";
import { SUPPORTED_CHARTS_WITH_STRATEGIES } from "@/charts/utils";
import { SUPPORTED_METRIC_STRATEGIES } from "@/metrics/utils";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const generateRelevantMetricsChartsObject = (datasetString: string) =>
  generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      context: z
        .string()
        .describe(
          "Análisis corto de las columnas del dataset (nombre, tipo de dato y descripción corta) y el idioma utilizado"
        ),
      metrics: z.array(
        z.object({
          name: z.string().describe("Nombre de la métrica"),
          columnTarget: z.string().describe("Columna del dataset"),
          strategy: z
            .string()
            .describe(
              `Id de la estrategia de cálculo de la métrica de la lista ${Object.keys(
                SUPPORTED_METRIC_STRATEGIES
              )}`
            ),
          unit: z.string().describe("Unidad de medida"),
          relevanceScore: z
            .number()
            .describe("Puntaje de relevancia de la métrica sobre 10"),
        })
      ),
      charts: z.array(
        z.object({
          id: z
            .string()
            .describe(
              `Id del gráfico estadístico de la lista ${Object.keys(
                SUPPORTED_CHARTS_WITH_STRATEGIES
              )}`
            ),
          title: z.string().describe("Titulo del gráfico"),
          description: z.string().describe("Descripción corta del gráfico"),
          labelColumn: z
            .string()
            .describe("Columna de etiquetas para el eje X"),
          dataColumn: z.string().describe("Columna de datos para el eje Y"),
          strategy: z.string().describe("Estrategia de cálculo de datos"),
          relevanceScore: z
            .number()
            .describe("Puntaje de relevancia de la métrica sobre 10"),
        })
      ),
    }),
    mode: "json",
    system: `Te vas a comportar como un analista de datos con una amplia experiencia en el campo de analítica de datos y gráficos estadísticos para la toma de decisiones estratégicas. Serás capaz de analizar las columnas de un dataset junto a un pequeño número de registros, el tipo de dato (númerico o texto) y las relaciones entre ellas.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analiza las columnas del dataset, el tipo de dato (númerico o texto) y las relaciones entre las columnas`,
          },
          {
            type: "text",
            text: `genera una descripción resumida de menos de 100 palabras de los datos`,
          },
          {
            type: "text",
            text: `retorna las ${MAX_METRICS_TO_SHOW} métricas mas relevantes de la lista ${Object.keys(
              SUPPORTED_METRIC_STRATEGIES
            )}`,
          },
          {
            type: "text",
            text: `de la siguiente lista, retorna los ${MAX_CHARTS_TO_SHOW} gráficos más relevantes junto a su respectiva estrategia: ${Object.entries(
              SUPPORTED_CHARTS_WITH_STRATEGIES
            ).map(
              ([label, values]) => `${label} (${values.strategies.join(", ")})`
            )}`,
          },
          {
            type: "text",
            text: datasetString,
          },
        ],
      },
    ],
  });
