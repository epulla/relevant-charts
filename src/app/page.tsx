import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { IoArrowForward } from "react-icons/io5";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center gap-16">
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
    </main>
  );
}
