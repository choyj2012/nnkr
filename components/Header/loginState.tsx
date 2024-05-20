'use client'

import { useSession } from "next-auth/react"
import SignOutButton from "../Login/signOutButton";
import SignInButton from "../Login/signInButton";
import { useRouter } from "next/navigation";

export default function LoginState() {

  const { data: session } = useSession();
  const router = useRouter();
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
        <div onClick={() => router.push('/signup')}>회원가입</div>
        <SignInButton />
      </>
    )
  }
}