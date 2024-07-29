import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocalExampleCard from "@/examples/components/local-example-card";
import { LOCAL_EXAMPLES } from "@/examples/constants";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

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
      <Link href="/">
        <Button className="-ml-4" variant="ghost">
          <IoArrowBack className="mr-2" />
          Ir a Inicio
        </Button>
      </Link>
      <h1 className="text-2xl">Ejemplos</h1>
      <h2 className="text-lg opacity-50">
        Métricas y gráficos generados por la comunidad y por nosotros
      </h2>
      <Tabs defaultValue="from-us" className="mt-5">
        <TabsList>
          <TabsTrigger value="from-community">De la comunidad</TabsTrigger>
          <TabsTrigger value="from-us">De nosotros</TabsTrigger>
        </TabsList>
        <TabsContent value="from-community">
          {/* list of <CommunityExampleCard></CommunityExampleCard> */}
          <div className="w-full flex flex-col items-center">
            En construcción
            {/* Reminder: using <img> to avoid Vercel's Data Transfer */}
            <img src={image} alt="En construcción" />
          </div>
        </TabsContent>
        <TabsContent value="from-us">
          <div className="w-full grid grid-cols-2 md:grid-cols-3">
            {Object.entries(LOCAL_EXAMPLES).map(([key, value]) => (
              <LocalExampleCard key={key} example={value} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
