import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { db } from "@/lib/db";
import { Modal } from "./modal";
import { Separator } from "@/components/ui/separator";
import Like from "@/components/Like";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PhotoProps {
  params: {
    id: string;
  };
}

export default async function ImageModal({ params }: PhotoProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const photos = await db.photo.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <Modal>
      <div className="flex flex-col gap-2 md:flex-row md:!gap-4">
        <div key={photos!.id} className="group relative">
          <div className="relative h-full min-w-full">
            <Image
              src={photos!.path}
              className="rounded object-contain"
              priority
              width={1920}
              height={1080}
              alt={photos!.title}
            />
          </div>
          <div className="to-opacity-30 absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded bg-gradient-to-t from-black from-20% via-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute bottom-0 left-0 z-10 m-2 select-none text-transparent transition-colors duration-300 group-hover:text-white md:m-4">
            <p className="font-mono text-xs md:text-base xl:text-lg">
              uploaded by
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold capitalize md:text-lg xl:text-xl">
              {photos!.user?.username}
            </h3>
            <p className="line-clamp-2 text-xs md:text-base xl:text-lg ">
              {photos!.user?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:mt-4">
          <div className="space-y-2">
            <h2 className="mr-4 text-base font-semibold capitalize md:mr-20 md:text-xl xl:text-2xl">
              {photos!.title}
            </h2>
            <p className="mr-4 text-xs md:mr-20 md:text-base xl:text-lg">
              {/* {photos!.description}  */}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
              vero, laboriosam, sint, reiciendis inventore quasi similique magni
              aspernatur sunt dolorem nam quos enim. Animi rem recusandae maxime
              pariatur illo, veniam corrupti laboriosam, id architecto expedita
              reprehenderit beatae obcaecati impedit molestiae cumque earum sunt
              dolores. Obcaecati nobis pariatur molestias eos libero.
            </p>
            <Separator />
          </div>
          <div>
            <Like photoId={photos?.id!} userId={userId!} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
