'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SignIn() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/auth/sign-in')}>Sign in</button>
  )
}
