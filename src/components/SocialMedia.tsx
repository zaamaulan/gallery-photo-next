import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socialIcons = [
  {
    name: "facebook",
    url: "https://www.facebook.com/shutterscapelabs",
    icon: "/assets/icons/facebook.svg",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/shutterscapelabs",
    icon: "/assets/icons/instagram.svg",
  },
  {
    name: "github",
    url: "https://www.github.com/shutterscapelabs",
    icon: "/assets/icons/github.svg",
  },
];

interface SocialMediaProps {
  className?: string;
}

export default function SocialMedia({ className }: SocialMediaProps) {
  return (
    <div className={cn("flex gap-4 scale-[0.87] md:scale-100", className)}>
      {socialIcons.map((item) => (
        <Link href={item.url} key={item.name}>
          <Image src={item.icon} width={24} height={24} alt={item.name} />
        </Link>
      ))}
    </div>
  );
}
