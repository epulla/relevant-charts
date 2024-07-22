import { LOCAL_EXAMPLES } from "@/local-examples/constants";
import LocalExampleCard from "./local-example-card";

export default function LocalExamplesGrid() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3">
      {LOCAL_EXAMPLES.map((example) => (
        <LocalExampleCard example={example} key={example.id} />
      ))}
    </div>
  );
}
