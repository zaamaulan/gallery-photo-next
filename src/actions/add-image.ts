"use server";

import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

export async function addPhoto(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const userId = formData.get("userId") as string;
    const file: File = formData.get("file") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join("public/uploads/", file.name);
    await writeFile(path, buffer);

    await db.photo.create({
      data: {
        title: title as string,
        description: description as string,
        path: `/uploads/${file.name}`,
        userId: userId as string,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    revalidatePath("/gallery");

    // if (addPhoto) {
    //   redirect("/gallery");
    // }
  } catch (error) {
    console.log("Failed to post new photo", error);
  }
}
