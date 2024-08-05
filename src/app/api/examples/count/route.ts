import { getTotalExamples } from "@/db/db";

export async function GET(request: Request) {
  const total = await getTotalExamples();
  return Response.json({ total });
}