import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";

interface PhotoProps {
  params: {
    id: string;
  };
}

export default async function Photo({ params }: PhotoProps) {
  const photos = await db.photo.findUnique({
    where: {
      id: params.id,
    },
  });

  // console.log(params.id)
  return (
    <div>
      <div
        key={photos!.id}
        className="group relative mx-px my-0.5 md:mx-0.5 md:my-1"
      >
        <Image
          src={photos!.path}
          className="rounded object-contain"
          priority
          width={800}
          height={800}
          alt={photos!.title}
        />
        {/* <div className="to-opacity-30 absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded bg-gradient-to-t from-black from-20% via-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
        <div className="absolute bottom-0 left-0 z-10 m-2 select-none text-transparent transition-colors duration-300 group-hover:text-white md:m-4">
          <h3 className="line-clamp-1 text-sm font-semibold capitalize md:text-lg xl:text-xl">
            {photos!.title}
          </h3>
          <p className="line-clamp-2 text-xs md:text-base xl:text-lg">
            {photos!.description}
          </p>
        </div> */}
      </div>
    </div>
  );
}
