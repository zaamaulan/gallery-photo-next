
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const LoginCover = "/assets/images/login-cover.png";

export default function Landing() {
  // const users = await prisma.user.findMany({
  //   include: {
  //     photo: true,
  //   },
  // });
  return (
    <>
      <section>Landing</section>
      {/* <Image src={LoginCover} width={200} height={200} alt="login cover" /> */}
      {/* <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={"/uploads/images/0_1.png"}
                width={200}
                height={200}
                alt="photo cover"
                className="h-96 w-96 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}

      {/* <ul className="space-y-6">
        <li key={user.id} className="space-y-4 rounded-lg border">
          <Image
            src={user.photo[0]?.path}
            width={200}
            height={200}
            alt="photo cover"
            className="h-60 w-96 rounded-t-lg object-cover"
          />
          <div className="space-y-2 px-3 pb-3">
            <h1 className="font-bold capitalize">{user.photo[0]?.title}</h1>
            <p className="text-sm">{user.photo[0]?.description}</p>
            <p className="font-mono text-xs">uploaded by {user.username}</p>
          </div>
        </li>
      </ul> */}
    </>
  );
}
