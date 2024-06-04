'use client'

import { useSession } from "next-auth/react"
import SignOutButton from "../Login/signOutButton";
import SignInButton from "../Login/signInButton";

import Link from "next/link";

export default function LoginState() {

  const { data: session } = useSession();
  if(session && session.user) {
    return (
      <>
        <SignOutButton />
        {session.user.name}
      </>
    );
  }
  else {
    return (
      <>
        <Link href={'/signup'}>회원가입</Link>
        <SignInButton />
      </>
    )
  }
}