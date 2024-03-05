import LikeButton from "@/components/LikeButton";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function LikedPhoto() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const users = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      like: {
        include: {
          photo: {
            include: {
              like: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
      photo: {
        include: {
          like: true,
        },
      },
    },
  });

  return (
    <div className="mb-10">
      <section className="mx-4 columns-2 gap-0 md:mx-20 md:columns-3 xl:mx-60">
        {users?.like?.length! > 0 ? (
          <>
            {users?.like.map((like: any) => {
              const isLikedByUser = like.userId === userId;
              return (
                <div
                  key={like?.photo?.id}
                  className="group relative mx-px mb-0.5 cursor-pointer xl:mx-0.5 xl:mb-1 "
                >
                  <Image
                    src={like?.photo?.path!}
                    className="rounded object-contain"
                    priority
                    width={800}
                    height={800}
                    alt={like?.photo?.title!}
                  />
                  <Link href={`/gallery/photo/${like?.photo?.id}`}>
                    <div className="to-opacity-30 absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded bg-gradient-to-t from-black from-20% via-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                  </Link>
                  <div className="absolute bottom-0 left-0 z-10 m-2 flex select-none items-end justify-between gap-2 text-transparent transition-colors duration-300 group-hover:text-white md:m-4">
                    <div>
                      <h3 className="line-clamp-1 text-sm font-semibold capitalize md:text-lg xl:text-xl">
                        {like?.photo?.title}
                      </h3>
                      <p className="line-clamp-2 text-xs md:text-base xl:text-lg">
                        {like?.photo?.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <LikeButton
                        userId={userId}
                        photoId={like?.photo?.id}
                        liked={isLikedByUser}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex h-screen items-center justify-center text-base md:text-xl">
            {"You haven't liked any photos."}{" "}
          </div>
        )}
      </section>
    </div>
  );
}
