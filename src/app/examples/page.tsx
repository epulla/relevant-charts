import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityCardsPagination from "@/examples/components/community-cards-pagination";
import ExampleCard from "@/examples/components/example-card";
import { LOCAL_EXAMPLES } from "@/examples/constants";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export const metadata = {
  title: "Examples",
  description: "Metrics and Charts generated from the community and from us",
};

export default async function ExamplesPage() {
  return (
    <>
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
      <Tabs defaultValue="from-community" className="mt-5">
        <TabsList>
          <TabsTrigger value="from-community">De la comunidad</TabsTrigger>
          <TabsTrigger value="from-us">De nosotros</TabsTrigger>
        </TabsList>
        <TabsContent value="from-community">
          <CommunityCardsPagination />
        </TabsContent>
        <TabsContent value="from-us">
          <div className="w-full grid grid-cols-2 md:grid-cols-3">
            {Object.entries(LOCAL_EXAMPLES).map(([key, value]) => (
              <ExampleCard
                key={key}
                example={value}
                href={`/examples/us/${value.id}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
