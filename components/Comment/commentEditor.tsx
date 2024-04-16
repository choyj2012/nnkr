'use client'

import HaiComponent from "../Card/hai"
import { useHaiSelectStore } from "@/store/store";

export default function CommentEditor() {

  const selectedHai = useHaiSelectStore((state) => state.hai);
  return (
    <div className="flex flex-row items-center border-4 border-green-700 mx-auto p-4 mb-4">
      <HaiComponent hai={selectedHai} width="w-[8%]" height="h-auto" />
      <textarea className="flex-grow border-black border-2 ml-2 mr-2 resize-none" />
      <button className="border border-black p-1 hover:bg-slate-300">
        Add
      </button>
    </div>
  );
}