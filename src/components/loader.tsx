"use client";

import { useGeneralStore } from "@/lib/store";
import { IoReload } from "react-icons/io5";

export default function Loader() {
  const { isFileReading, isAiResultLoading } = useGeneralStore();
  return (
    <div
      className="flex flex-col items-center aria-[hidden=true]:hidden"
      aria-hidden={!isFileReading && !isAiResultLoading}
    >
      <IoReload className="animate-spin text-3xl text-primary" />
      <p className="text-primary text-lg opacity-50">
        {isFileReading
          ? "Leyendo archivo..."
          : isAiResultLoading
          ? "IA trabajando..."
          : "Cargando resultados..."}
      </p>
    </div>
  );
}
