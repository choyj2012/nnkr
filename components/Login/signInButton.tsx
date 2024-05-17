'use client'
import { signIn } from "next-auth/react"
import { MouseEvent } from "react"

export default function SignInButton() {
  return (
    <button onClick={() => signIn()}>Login</button>
  )
}