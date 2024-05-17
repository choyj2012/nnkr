'use client'
import { signOut } from "next-auth/react"
import { MouseEvent } from "react"

export default function SignOutButton() {
  return (
    <button onClick={() => {
      console.log('logout');
      signOut()
    }}>Logout</button>
  )
}