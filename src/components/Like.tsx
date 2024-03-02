'use client'
import { useState } from "react";
import Image from "next/image";

export default function Like({ photoId, userId }: { photoId?: string, userId?: string }) {
  const [liked, setLiked] = useState(false);
  const [totalLiked, setTotalLiked] = useState<number| null>(null)

  async function getLike(){
    try {
      const response = await fetch(`/api/like/photoId=${photoId}`)
      const data = await response.json()
      
    } catch (error) {
      
    }
  }

  async function toggleLike() {
    try {
      const response = await fetch("/api/like", {
        method: liked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoId: photoId,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      setLiked(!liked); // Update liked state based on toggle action
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  return (
    <div onClick={toggleLike} className="cursor-pointer">
      <Image
        src={liked ? "/assets/icons/love-filled.svg" : "/assets/icons/love.svg"}
        width={24}
        height={24}
        alt="love ic"
      />
    </div>
  );
}
