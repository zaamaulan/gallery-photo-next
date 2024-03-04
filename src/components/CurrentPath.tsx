"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CurrentPath() {
  const pathname = usePathname();
  const result = pathname.split("/")[1];
  const href = `/${result}`;

  return (
    <>
      <Link href={href} className="flex items-center">
        <span className="text-sm md:text-xl">{result}</span>
      </Link>
    </>
  );
}
