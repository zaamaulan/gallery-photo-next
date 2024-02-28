import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Gallery() {
  
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h1>{session?.user?.id}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOut />
    </div>
  );
}
