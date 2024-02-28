import SignInForm from "@/components/form/SignInForm";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div>
      <SignInForm />
      <p>belum punya akun? <Link href={'/auth/sign-up'}>Sign Up</Link></p>
    </div>
  );
}
