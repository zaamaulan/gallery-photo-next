import React from "react";
import { Textarea } from "../ui/textarea";
import { db } from "@/lib/db";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";

export default function CommentForm({
  userId,
  photoId,
}: {
  userId: string;
  photoId: string;
}) {
  async function addComment(formData: FormData) {
    "use server";
    const comment = formData.get("comment") as string;
    const userId = formData.get("userId") as string;
    const photoId = formData.get("photoId") as string;

    await db.comment.create({
      data: {
        comment: comment,
        userId: userId,
        photoId: photoId,
      },
    });

    revalidatePath(`/gallery/photo/${photoId}`);
  }

  return (
    <form action={addComment} className="space-y-2">
      <Input type="hidden" value={userId} name="userId"/>
      <Input type="hidden" value={photoId} name="photoId"/>
      <div>
        <Textarea name="comment" placeholder="Write your comment here.." className="resize-none"/>
      </div>
      <Button type="submit" >Submit</Button>
    </form>
  );
}
