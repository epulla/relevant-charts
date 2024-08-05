import { getExamples } from "@/db/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const data = await getExamples(page);
  return Response.json({ data });
}
