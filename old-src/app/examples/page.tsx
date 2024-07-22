import LocalExamplesGrid from "@/components/local-examples-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Examples",
  description: "Metrics and Charts generated from the community and from us",
};

export default function ExamplesPage() {
  return (
    <>
      <h1 className="text-2xl">Examples</h1>
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
        <TabsContent value="from-us">
          <LocalExamplesGrid />
        </TabsContent>
      </Tabs>
    </>
  );
}
