import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Example } from "../types";

import Link from "next/link";

interface Props {
  example: Example;
}

export default function LocalExampleCard({ example }: Props) {
  return (
    <Link href={`/examples/us/${example.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{example.title}</CardTitle>
          <CardDescription>
            Autor: {example.author}
            <br />
            {new Date(example.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img src={example.cover} alt={example.title} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Link>
  );
}
