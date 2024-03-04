import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { Photo } from "@/types/photo";
import LikeButton from "@/components/LikeButton";

export default async function Gallery() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const photos = await db.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      like: true,
    },
  });

  return (
    <div className="mb-10">
      <section className="mx-4 columns-2 gap-0 md:mx-20 md:columns-3 xl:mx-60">
        {photos.map((photo) => {
          const isLikedByUser = photo.like.some(
            (like) => like.userId === userId && like.photoId === photo.id,
          );
          return (
            <div
              key={photo.id}
              className="group relative mx-px mb-0.5 cursor-pointer xl:mx-0.5 xl:mb-1 "
            >
              <Image
                src={photo.path}
                className="rounded object-contain"
                priority
                width={800}
                height={800}
                alt={photo.title}
              />
              <Link href={`/gallery/photo/${photo.id}`}>
                <div className="to-opacity-30 absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded bg-gradient-to-t from-black from-20% via-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
              </Link>
              <div className="absolute bottom-0 left-0 z-10 m-2 flex select-none items-end justify-between gap-2 text-transparent transition-colors duration-300 group-hover:text-white md:m-4">
                <div>
                  <h3 className="line-clamp-1 text-sm font-semibold capitalize md:text-lg xl:text-xl">
                    {photo.title}
                  </h3>
                  <p className="line-clamp-2 text-xs md:text-base xl:text-lg">
                    {photo.description}
                  </p>
                </div>

                <div className="flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <LikeButton
                    userId={userId}
                    photoId={photo.id}
                    liked={isLikedByUser}
                    totalLike={photo.like.length}
                    showLikes
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {/* <MasonryLayout /> */}
    </div>
  );
}
