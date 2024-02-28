"use client";
import Image from "next/image";
import React from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Image
        src={"/assets/icons/search.svg"}
        width={26}
        height={26}
        alt="search ic"
      />
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      /> */}
    </div>
  );
}
