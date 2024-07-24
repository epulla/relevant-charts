import FileUploader from "@/components/file-uploader";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import Warnings from "@/components/warnings";

import Link from "next/link";

import { IoArrowForward } from "react-icons/io5";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full flex flex-col items-center justify-center gap-16">
      <h1 className="text-5xl text-primary font-bold">Relevant Charts</h1>
      <div className="flex gap-2 items-center">
        <FileUploader />
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
