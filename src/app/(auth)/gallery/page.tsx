import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

export default async function Gallery() {
  const session = await getServerSession(authOptions);

  const photos = await db.photo.findMany({orderBy: {
    createdAt: "desc"
  }});
  return (
    <div className="mb-10">
      <section className="columns-2 gap-0 md:columns-3 mx-4 md:mx-20 xl:mx-60">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative mx-px mb-0.5 cursor-pointer xl:mx-0.5 xl:mb-1 "
          >
            <Link href={`/gallery/photo/${photo.id}`} passHref>
              <Image
                src={photo.path}
                className="rounded object-contain"
                priority
                width={800}
                height={800}
                alt={photo.title}
              />
              <div className="to-opacity-30 absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded bg-gradient-to-t from-black from-20% via-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
              <div className="absolute bottom-0 left-0 z-10 m-2 select-none text-transparent transition-colors duration-300 group-hover:text-white md:m-4">
                <h3 className="line-clamp-1 text-sm font-semibold capitalize md:text-lg xl:text-xl">
                  {photo.title}
                </h3>
                <p className="line-clamp-2 text-xs md:text-base xl:text-lg">
                  {photo.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </section>
      {/* <MasonryLayout /> */}
    </div>
  );
}
