import CurrentPath from "@/components/CurrentPath";
import NavBar from "@/components/NavBar";
import AddPhoto from "@/components/AddPhoto";
import SocialMedia from "@/components/SocialMedia";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserProfile from "@/components/UserProfile";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  return (
    <div>
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 md:h-20 md:px-32">
        {/* <SocialMedia /> */}
        <NavBar session={session} />

        {/* <div className="absolute left-1/2 -translate-x-1/2 text-2xl capitalize md:static md:-translate-x-16"> */}
        <div>
          <CurrentPath />
        </div>
        <div className={"flex scale-[0.87] items-center gap-4 md:scale-100"}>
          <AddPhoto userId={userId!} />
          <Link href={"/liked-photo"}>
            <Image
              src={"/assets/icons/love.svg"}
              width={24}
              height={24}
              alt="love icon"
            />
          </Link>
          <UserProfile />
        </div>
      </header>

      {/* <NavBar session={session} /> */}
      <main className="-z-10 mx-2 mt-16 md:mt-20">{children}</main>
      <footer></footer>
    </div>
  );
}
