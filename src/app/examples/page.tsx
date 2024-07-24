// import LocalExamplesGrid from "@/components/local-examples-grid";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Examples",
  description: "Metrics and Charts generated from the community and from us",
};

export default function ExamplesPage() {
  const images = [
    "/images/holup.webp",
    "/images/bongo-moth.webp",
    "/images/cat-working.webp",
  ];
  const image = images[Math.floor(Math.random() * images.length)];
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full mt-12">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl">Página en construcción 👷</h1>
        <h2 className="text-lg opacity-50">
          Click{" "}
          <Link className="hover:text-blue-300 underline" href="/">
            AQUI
          </Link>{" "}
          para volver al inicio
        </h2>
        <Image
          src={image}
          alt="Página en construcción"
          width={450}
          height={450}
        />
      </div>
      {/* <h1 className="text-2xl">Examples</h1>
      <h2 className="text-lg opacity-50">
        Check out the metrics and charts generated from the community and from
        us
      </h2>
      <Tabs defaultValue="from-us" className="mt-5">
        <TabsList>
          <TabsTrigger value="from-community">From the Community</TabsTrigger>
          <TabsTrigger value="from-us">From us</TabsTrigger>
        </TabsList>
        <TabsContent value="from-community"></TabsContent>
        <TabsContent value="from-us"></TabsContent>
      </Tabs> */}
    </main>
  );
}
