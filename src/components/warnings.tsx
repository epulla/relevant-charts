"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import WarningCard from "./warning-card";

import Autoplay from "embla-carousel-autoplay";

interface Warning {
  description: string;
  variant: "reminder" | "warning";
}

const warnings: Warning[] = [
  {
    description:
      "Los datasets deben estar en formato CSV y separados por comas (,)",
    variant: "warning",
  },
  {
    description: "La IA no reemplaza a un ingeniero o científico de datos.",
    variant: "reminder",
  },
  {
    description:
      "Mientras más grande el dataset, los gráficos se vuelven más imprecisos, por lo cual no se debería tomar los resultados como verdad absoluta.",
    variant: "warning",
  },
  {
    description: "Tu dataset es privado y no se almacena en ningún servidor.",
    variant: "reminder",
  },
];

export default function Warnings() {
  return (
    <Carousel
      className="w-full max-w-[17rem] md:max-w-sm"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
        }),
      ]}
    >
      <CarouselContent>
        {warnings.map((warning, index) => (
          <CarouselItem key={index}>
            <WarningCard {...warning} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
