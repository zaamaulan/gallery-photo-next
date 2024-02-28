import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserProfile() {
  return (
    <div>
      <Link href="/profile">
        <Image
          src={"/assets/icons/user.svg"}
          width={26}
          height={26}
          alt="user ic"
        />
      </Link>
    </div>
  );
}
