'use client'

import { useState } from "react";

export default function CommentsList({children, commentsCnt}: {
  children: React.ReactNode,  //Comment FlexBox
  commentsCnt: number | undefined
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <span className="cursor-pointer"onClick={() => setIsOpen((state) => !state)}>
        {isOpen ? `댓글 접기 (${commentsCnt}) ▲` : `댓글 펼치기 (${commentsCnt}) ▼`}
      </span>

      {isOpen && children}
    </div>
  );
}