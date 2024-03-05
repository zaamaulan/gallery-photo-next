import CommentForm from "@/components/form/CommentForm";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import moment from "moment";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import "moment/locale/id";

interface PhotoProps {
  params: {
    id: string;
  };
}

export default async function Photo({ params }: PhotoProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const photoId = params.id;

  const photos = await db.photo.findUnique({
    where: {
      id: photoId,
    },
    include: {
      user: true,
      comment: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  // console.log(params.id)
  return (
    <div className="mb-10 mt-20 px-6 md:mt-32 md:px-32">
      <div
        key={photos!.id}
        className="relative flex flex-col items-start gap-10 md:flex-row md:gap-20"
      >
        <Image
          src={photos!.path}
          className="rounded object-contain"
          priority
          width={550}
          height={550}
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
        <div className="space-y-10 md:space-y-16 flex-1">
          <div className="h-full w-full space-y-2 md:sticky md:top-40">
            <h3 className="text-lg font-semibold capitalize md:text-2xl">
              {photos!.title}
            </h3>
            <p className="text-base md:text-xl">{photos!.description}</p>

            <p className="font-mono text-base md:text-xl bg-gray-100 p-2">
              uploaded by{" "}
              <span className="font-normal">{photos!.user?.username}</span>
            </p>
          </div>
          <div className="w-full space-y-4">
            <CommentForm userId={userId!} photoId={photoId} />
            <div className="space-y-2">
              <h1 className="text-lg font-bold md:text-xl">Comments {photos?.comment.length}</h1>
              <Separator />
              <div className="space-y-4">
                {photos?.comment.map((comment: any) => (
                  <div key={comment.id} className="cursor-default space-y-1">
                    <div className="group flex w-fit items-center gap-1">
                      <h1 className="text-base font-semibold md:text-lg">
                        {comment.user?.username}
                      </h1>
                      <span className="text-sm text-slate-600 group-hover:text-black">
                        {moment.utc(comment.createdAt).local().fromNow()}
                      </span>
                    </div>
                    <p className="ml-4 w-full max-w-4xl">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
