"use client";

import { useEffect, useRef, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { Button } from "./ui/button";
import { csvToJson, getFirstNRecords, parseFile } from "@/lib/utils";
import { generateRelevantMetricsChartsObject } from "@/lib/ai";
import { useMetricsStore } from "@/metrics/store";
import { useRouter } from "next/navigation";
import { useChartsStore } from "@/charts/store";
import { MAX_RECORDS_TO_CONSIDER_FOR_AI } from "@/lib/constants";
import { useGeneralStore } from "@/lib/store";

// reference: https://stackoverflow.com/questions/71991961/how-to-read-content-of-uploaded-json-file-on-react-next-js
export default function FileUploader() {
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

  useEffect(() => {
    if (done) {
      setIsAiResultLoading(true);
      generateRelevantMetricsChartsObject(
        getFirstNRecords(fileContent, MAX_RECORDS_TO_CONSIDER_FOR_AI)
      ).then((generatedObject) => {
        setAiContext(generatedObject.object.context);
        setDataObject(csvToJson(fileContent));
        setMetricsResponse(
          generatedObject.object.metrics.toSorted(
            (a, b) => b.relevanceScore - a.relevanceScore
          )
        );
        setChartsResponse(
          generatedObject.object.charts.toSorted(
            (a, b) => b.relevanceScore - a.relevanceScore
          )
        );
        setIsAiResultLoading(false);
        // go to results page
        router.push("/results");
      });
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
