import { Comment } from "@/lib/types";
import { date2String } from "@/lib/queries";

export default function Subcomment({subCom}: {subCom: Comment}) {
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