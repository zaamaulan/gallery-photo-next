import SignUpForm from "@/components/form/SignUpForm";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div>
      <SignUpForm />
      <p>sudah punya akun? <Link href={'/auth/sign-in'}>Sign In</Link></p>
    </div>
  );
}
