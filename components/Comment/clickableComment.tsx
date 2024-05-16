'use client'

import { useState } from "react";
import SubCommentEditor from "./subCommentEditor";

export default function ClickableComment({comment, data, children}: {
  comment: React.ReactElement,
  children: React.ReactElement,
  data: {qid: number, comId: string}
}) {

  const [click, isClick] = useState(false);
  return (
    <>
      <div onClick={() => isClick((p) => !p)}>{comment}</div>
      {click && <SubCommentEditor data={data} />}
      {children}
    </>
  );
}