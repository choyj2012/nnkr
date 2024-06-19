"use client";

import HaiComponent from "../Card/hai";
import { useHaiSelectStore } from "@/store/store";
import TiptapComment from "./texteditor";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function CommentEditor({ qid }: { qid: number }) {
  const selectedHai = useHaiSelectStore((state) => state.hai);
  const [com, setCom] = useState("");
  const router = useRouter();
  const {data: session} = useSession();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const req = {
      qid: qid,
      ansCom: {
        name: session?.user?.name ?? "ㅇㅇ",
        comment: com,
        date: new Date(),
        answer: selectedHai,
        subComments: [],
      },
    };
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    if(res.ok) router.push(`/questions/result/${qid}`);
    else console.log(await res.json())
  };
  
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
    <div className="flex flex-row items-start border-4 border-green-700 mx-auto p-4 mb-4 gap-4">
      <HaiComponent hai={selectedHai} width="w-[8%]" height="h-auto" />
      <TiptapComment editor={editor} />
      <button
        className="border border-black p-1 hover:bg-slate-300 self-stretch ml-auto"
        onClick={handleSubmit}
      >
        등록
      </button>
    </div>
  );
}
