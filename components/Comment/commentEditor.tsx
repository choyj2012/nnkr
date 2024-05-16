'use client'

import HaiComponent from "../Card/hai"
import { useHaiSelectStore } from "@/store/store";
import TiptapComment from "./texteditor";
import { MouseEvent, useState } from "react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function CommentEditor({qid}: {qid: number}) {
  const selectedHai = useHaiSelectStore((state) => state.hai);
  const [com, setCom] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const req = {
      qid: qid,
      ansCom: {
        id: 'testid',
        name: 'testname',
        comment: com,
        date: new Date(),
        answer: selectedHai,
        subComments: [],
      }
    }
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        }
      });
      // console.log(res);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="flex flex-row items-start border-4 border-green-700 mx-auto p-4 mb-4 gap-4">
      <HaiComponent hai={selectedHai} width="w-[8%]" height="h-auto" />
      <TiptapComment set={setCom}/>
      <button className="border border-black p-1 hover:bg-slate-300 self-stretch"
      onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
}