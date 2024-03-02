"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

export default function SignOut() {
  return <Button onClick={() => signOut({ redirect: true })}>Sign out</Button>;
}
