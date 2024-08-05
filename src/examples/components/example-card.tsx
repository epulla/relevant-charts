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
  href: string;
}

export default function ExampleCard({ example, href }: Props) {
  return (
    <Link href={href}>
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
          <img src={example.coverUrl} alt={example.title} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Link>
  );
}
