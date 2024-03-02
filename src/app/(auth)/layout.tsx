import CurrentPath from "@/components/CurrentPath";
import NavBar from "@/components/NavBar";
import SearchSave from "@/components/SearchSave";
import SocialMedia from "@/components/SocialMedia";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-6 md:h-20 md:px-32">
        {/* <SocialMedia /> */}
        <NavBar session={session} />

        <div className="md:-translate-x-16 text-2xl capitalize">
          <CurrentPath />
        </div>
        <SearchSave />
      </header>

      {/* <NavBar session={session} /> */}
      <main className="-z-10 mx-2 mt-16 md:mt-20">{children}</main>
      <footer></footer>
    </div>
  );
}
