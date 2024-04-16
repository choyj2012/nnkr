import { Comment } from "@/lib/types";

export default function Subcomment({subCom}: {subCom: Comment}) {
  return (
    <div className="flex flex-row pl-[4%] gap-4 mt-2">
      <div>↳</div>
      <div className="flex-grow">{subCom.comment}</div>
      <div className="">
        <span className="text-sm">
          - {subCom.name} {subCom.date.toDateString()}
        </span>
      </div>
    </div>
  );
}