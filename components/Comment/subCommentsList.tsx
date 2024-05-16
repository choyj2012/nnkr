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
  return (
    <div>
      <SubCommentEditor />
      {children}
    </div>
  );
}

