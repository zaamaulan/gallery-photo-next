import SignInForm from "@/components/form/SignInForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    return null;
  }
  
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-zinc-50 p-3">
      <SignInForm />
    </div>
  );
}
