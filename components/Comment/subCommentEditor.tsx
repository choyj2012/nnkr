'use client'

import { useState } from "react"
import TiptapComment from "./texteditor"


export default function SubCommentEditor() {

  const [com, setCom] = useState('');
  return (
    <div className="flex flex-row gap-4 pl-[4%]">
      <TiptapComment set={setCom}/>
      <button className="border border-black p-1 hover:bg-slate-300 self-stretch"> 등록 </button>
    </div>
  )
}