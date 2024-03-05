"use server";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function likeHandler({
  liked,
  photoId,
  userId,
}: {
  liked?: boolean;
  photoId?: string;
  userId?: string;
}) {
  try {
    // const response = await fetch(`${process.env.NEXTURL}/api/like`, {
    //   method: liked ? "DELETE" : "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     photoId: photoId,
    //     userId: userId,
    //   }),
    // });

    // if (!response.ok) {
    //   console.log("Failed to add/remove like");
    // }

    if (liked) {
      await db.like.deleteMany({
        where: { photoId: photoId, userId: userId },
      });
    } else {
      await db.like.create({
        data: {
          userId: userId,
          photoId: photoId,
        },
      });
    }

    revalidatePath('/gallery')
  } catch (error) {
    console.log("Error", error);
  }
  
}
