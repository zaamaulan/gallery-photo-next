import React from "react";
import Search from "./Search";
import Saved from "./Saved";
import { cn } from "@/lib/utils";
import UserProfile from "./UserProfile";

interface SearchSaveProps {
  className?: string
}

export default function SearchSave({className}: SearchSaveProps ) {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <Search placeholder="Search image.." />
      <Saved />
      <UserProfile />
    </div>
  );
}
