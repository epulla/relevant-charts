"use client";

import { useEffect, useRef, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Button } from "./ui/button";
import { csvToJson, getFirstNRecords, parseFile } from "@/lib/utils";
import { useMetricsStore } from "@/metrics/store";
import { useRouter } from "next/navigation";
import { useChartsStore } from "@/charts/store";
import { MAX_RECORDS_TO_CONSIDER_FOR_AI } from "@/lib/constants";
import { useGeneralStore } from "@/lib/store";
import { getAiResponse } from "@/app/actions";
import { useToast } from "./ui/use-toast";

// reference: https://stackoverflow.com/questions/71991961/how-to-read-content-of-uploaded-json-file-on-react-next-js
export default function FileAnalyzer() {
  const [fileContent, setFileContent] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { setMetricsResponse } = useMetricsStore();
  const { setChartsResponse } = useChartsStore();
  const {
    setAiContext,
    setDataObject,
    setIsFileReading,
    setIsAiResultLoading,
  } = useGeneralStore();

  const { toast } = useToast();

  useEffect(() => {
    const callAiResponseAction = async () => {
      setIsAiResultLoading(true);
      try {
        const generatedObject = await getAiResponse(
          getFirstNRecords(fileContent, MAX_RECORDS_TO_CONSIDER_FOR_AI)
        );
        setAiContext(generatedObject.context);
        setDataObject(csvToJson(fileContent));
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
        router.push("/results");
      } catch (error) {
        console.error("Error while fetching AI response", error);
        setIsAiResultLoading(false);
        setChartsResponse([]);
        setDataObject([]);
        setFileContent("");
        setDone(false);
        fileInputRef.current!.value = "";
        toast({
          title: "Uh oh!",
          description: "Ocurrió un error al recibir la respuesta de la IA",
          duration: 5000,
        });
        return;
      }
    };
    if (done) {
      callAiResponseAction();
    }
  }, [
    done,
    fileContent,
    router,
    setDataObject,
    setAiContext,
    setMetricsResponse,
    setChartsResponse,
    setIsAiResultLoading,
    toast,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    setIsFileReading(true);
    parseFile(
      files[0],
      // reader callback
      (chunk) => {
        setFileContent((prev) => prev + chunk);
      },
      // done callback
      () => {
        setDone(true);
        setIsFileReading(false);
      }
    );
  };

  return (
    <>
      <label htmlFor="file-input">
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <IoCloudUpload className="mr-2" />
          Escoge un archivo
        </Button>
      </label>
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        accept=".csv" // Only allow CSV files for now
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}
