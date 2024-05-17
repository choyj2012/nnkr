'use client'

import { useSession } from "next-auth/react"
import SignOutButton from "../Login/signOutButton";
import SignInButton from "../Login/signInButton";

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
      <SignInButton />
    )
  }
}