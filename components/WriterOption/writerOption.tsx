'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function WriterOption({name}: {name: string}){

  const {data} = useSession();

  return (
    data?.user?.name === name && (
      <>
        <Link href={"#"}>수정</Link>
        <Link href={"#"}>삭제</Link>
      </>
    )
  );
}