import SignInForm from "@/components/form/SignInForm";
import Link from "next/link";
import React from "react";

export default function SignIn() {
  return (
    <div className="w-full p-3 flex items-center justify-center h-dvh bg-zinc-50">
      <SignInForm />
    </div>
  );
}
