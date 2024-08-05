import "@/db/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { examplesTable, SelectExample, InsertExample } from "./schema";
import { count, desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { dataUrlToImageFile } from "@/lib/utils";

export const db = drizzle(sql);

export const getExamples = async (page = 1, pageSize = 10) => {
  return db
    .select()
    .from(examplesTable)
    .orderBy(desc(examplesTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

export const getExampleById = async (id: SelectExample["id"]) => {
  return db.select().from(examplesTable).where(eq(examplesTable.id, id));
};

export const createExample = async (
  data: Omit<InsertExample, "coverUrl">,
  processedData: Object,
  imageUrl: string
) => {
  const id = data.id ?? randomUUID();
  console.log("Creating example with id", id);
  // saving the data to KV store
  await kv.set(id, processedData);
  // saving the cover to Blob store
  const file = await dataUrlToImageFile(imageUrl, `${id}.png`);
  const putBlobResult = await put(id, file, {
    access: "public",
    contentType: "image/png",
  });
  // saving the example to the Postgres database
  const dataToInsert = {
    ...data,
    id,
    coverUrl: putBlobResult.url,
  };
  await db
    .insert(examplesTable)
    .values(dataToInsert)
    .returning({ insertedId: examplesTable.id });
  return id;
};

export const getTotalExamples = async () => {
  return db.select({ count: count() }).from(examplesTable);
};
