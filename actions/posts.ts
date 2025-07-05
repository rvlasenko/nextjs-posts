"use server";

import { storePost } from "@/lib/posts";
import { uploadImage } from "@/lib/s3-upload";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get("title") as string | null;
  const image = formData.get("image") as File | null;
  const content = formData.get("content") as string | null;

  let errors = [];
  let imageUrl = "";

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed");
  }

  await storePost({
    imageUrl,
    title: title || "",
    content: content || "",
    userId: 1,
  });

  redirect("/feed");
}
