"use server";

import { createExample } from "@/db/db";

export async function saveUserData(formData: FormData, data: any) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const isAnonymous = formData.get("isAnonymous") === "true";
  const coverImageUrl = formData.get("coverImageUrl") as string;

  return await createExample(
    {
      title,
      author: isAnonymous
        ? `Anonymous-${Math.random().toString(36).slice(2, 10)}`
        : author,
    },
    data,
    coverImageUrl
  );
}
