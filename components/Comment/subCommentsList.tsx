export default function SubCommentsList({subComments}: {subComments: Comment[]}) {
  return (
    <div className="flex flex-col">
      {subComments.map((subCom) => (
        <Subcomment key={subCom.id.toString()} subCom={subCom} />
      ))}
    </div>
  );
}

import { Comment } from "@/lib/types";
import { date2String } from "@/lib/function";

function Subcomment({subCom}: {subCom: Comment}) {
  return (
    <div className="flex flex-row pl-[4%] gap-4 mt-2">
      <div>↳</div>
      <div className="flex-grow">
        <div>{subCom.comment}</div>
        <div className="float-end text-sm">
          - {subCom.name} {date2String(subCom.date)}
        </div>
      </div>
    </div>
  );
}