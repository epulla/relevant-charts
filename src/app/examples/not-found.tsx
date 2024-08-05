"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function ExampleNotFoundPage() {
  return (
    <div className="h-screen -mt-12 container flex flex-col items-center justify-center px-5">
      <div className="text-5xl font-dark font-bold">404</div>
      <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
        Lo sentimos, no se pudo encontrar ese ejemplo{" "}
      </p>
      <Link href="/examples">
        <Button>
          <IoArrowBack className="mr-2" />
          Volver a los Ejemplos
        </Button>
      </Link>
    </div>
  );
}
