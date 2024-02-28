import CurrentPath from "@/components/CurrentPath";
import NavBar from "@/components/NavBar";
import SearchSave from "@/components/SearchSave";
import SocialMedia from "@/components/SocialMedia";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-12">
      <header className="flex justify-between items-center">
        <SocialMedia />
        <div className="text-2xl capitalize">
          <CurrentPath />
        </div>
        <SearchSave />
      </header>

      <div className="mt-10">
        <NavBar />
      </div>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
