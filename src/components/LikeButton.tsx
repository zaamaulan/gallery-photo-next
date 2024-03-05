"use client";

import { likeHandler } from "@/actions/like-action";
import Image from "next/image";
import React, { useOptimistic, useState, useTransition } from "react";

export default function LikeButton({
  photoId,
  userId,
  liked,
  totalLike,
  showLikes,
}: {
  photoId?: string;
  userId?: string;
  liked?: boolean;
  showLikes?: boolean;
  totalLike?: number;
}) {
  const [isLiked, setIsLiked] = useState(liked || false);
  const [optimisticTotalLike, setOptimisticTotalLike] = useOptimistic(
    totalLike || 0,
  );

  return (
    <div className="flex items-center gap-0.5 md:gap-1">
      <button
        onClick={() => {
          const newIsLiked = !isLiked;
          likeHandler({ liked: liked, photoId: photoId, userId: userId });
          setIsLiked(!isLiked);
          setOptimisticTotalLike((prev) => prev + (newIsLiked ? 1 : -1));
        }}
      >
        <Image
          priority
          src={
            isLiked
              ? "/assets/icons/love-filled.svg"
              : "/assets/icons/love-white.svg"
          }
          width={24}
          height={24}
          alt="love ic"
          className="md:w-6 md:h-6 w-5 h-5"
        />
      </button>
      {showLikes && <span className="md:text-base text-sm">{optimisticTotalLike}</span>}
    </div>
  );
}
