import FileAnalyzer from "@/components/file-analyzer";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import Warnings from "@/components/warnings";

import Link from "next/link";

import { IoArrowForward } from "react-icons/io5";

export const metadata = {
  title: "Relevant Charts",
  description: "Sube tus datos y genera gráficos relevantes",
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full flex flex-col items-center justify-center gap-16">
      <h1 className="text-5xl text-primary font-bold">
        <div className="inline-grid">
          <span className="mr-2 col-start-1 row-start-1 bg-gradient-to-r from-red-500 to-orange-500 blur-xl"></span>
          <span className="mr-2 col-start-1 row-start-1 bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text">
            Relevant
          </span>
          <span className="col-start-2 row-start-1">Charts</span>
        </div>
      </h1>
      <div className="flex gap-2 items-center">
        <FileAnalyzer />
        <Link href="/examples">
          <Button variant="secondary">
            Ver ejemplos
            <IoArrowForward className="ml-1" />
          </Button>
        </Link>
      </div>
      <Loader />
      <Warnings />
    </main>
  );
}
