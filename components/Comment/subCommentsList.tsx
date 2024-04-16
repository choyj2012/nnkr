'use client'

import { useState } from "react";
import SubCommentEditor from "./subCommentEditor";

export default function SubCommentsList({
  children,
  subCommentsCnt,
}: {
  children: React.ReactNode;  //
  subCommentsCnt: number | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div>
      <span className="cursor-pointer mr-4 underline underline-offset-2" onClick={() => setIsOpen((p) => !p)}>
        {isOpen
          ? `답글 접기(${subCommentsCnt}) ▲`
          : `답글 보기(${subCommentsCnt}) ▼`}
      </span>
      <span className="cursor-pointer underline underline-offset-2" onClick={() => setIsVisible((p) => !p)}>
        {'답글 쓰기'}
      </span>
      {isOpen && children}
      {isVisible && <SubCommentEditor />}
    </div>
  );
}

