'use client'

import { MouseEvent, useState } from "react"
import TiptapComment from "./texteditor"
import { addSubComment } from "@/lib/queries";
import { Comment } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function SubCommentEditor({data: {qid, comId}}: {data : {qid: number, comId: string}}) {

  const [com, setCom] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const req = {
      isSub: true,
      qid: qid,
      comId: comId,
      com: {
        id: 'testid',
        name: 'testname',
        comment: com,
        date: new Date(),
      }
    }
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();
  }
  return (
    <div className="flex flex-row gap-4 pl-[4%]">
      <div>↳</div>
      <TiptapComment set={setCom}/>
      <button className="border border-black p-1 hover:bg-slate-300 self-stretch"
      onClick={handleSubmit}> 등록 </button>
    </div>
  )
}