import React from "react";
import Search from "./Search";
import Like from "./Like";
import { cn } from "@/lib/utils";
import UserProfile from "./UserProfile";

interface SearchSaveProps {
  className?: string;
}

export default function SearchSave({ className }: SearchSaveProps) {
  return (
    <div
      className={cn(
        "flex scale-[0.87] items-center gap-4 md:scale-100",
        className,
      )}
    >
      <Search placeholder="Search image.." />
      <Like />
      <UserProfile />
    </div>
  );
}
