'use client'

import { MouseEvent, useState } from "react"
import TiptapComment from "./texteditor"
import { addSubComment } from "@/lib/queries";
import { Comment } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function SubCommentEditor({data: {qid, comId}}: {data : {qid: number, comId: string}}) {

  const [com, setCom] = useState('');
  const router = useRouter();
  const {data: session} = useSession();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const req = {
      isSub: true,
      qid: qid,
      comId: comId,
      com: {
        id: 'testid',
        name: session?.user?.name ?? 'ㅇㅇ',
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
    editor?.commands.clearContent(true);
    router.refresh();
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
    onUpdate({editor}) {
      setCom(editor.getText());
    },
  })

  return (
    <div className="flex flex-row gap-4 pl-[4%]">
      <div>↳</div>
      <TiptapComment editor={editor}/>
      <button className="border border-black p-1 hover:bg-slate-300 self-stretch"
      onClick={handleSubmit}> 등록 </button>
    </div>
  )
}