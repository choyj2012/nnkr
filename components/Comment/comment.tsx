import { AnswerComment } from "@/lib/types";
import HaiComponent from "@/components/Card/hai";
import Subcomment from "./subComment";
import SubCommentsList from "./subCommentsList";

export default function Comment({comdate}: {comdate : AnswerComment}) {
  
  const {answer, name, comment, date, subComment} = comdate;
  return (
    <div className=" border-b-2 border-green-700 py-4">
      <div className="flex flex-row gap-4 mb-1">
        <HaiComponent hai={answer} width="max-w-[8%]" height="h-auto" />

        <div className="relative flex-grow">
          {comment}
          <div className="absolute bottom-0 right-0 *:text-sm">
            <span>
              - {name} {date.toDateString()}
            </span>
          </div>
        </div>
      </div>
      <SubCommentsList subCommentsCnt={subComment.length}>
        <div className="flex flex-col">
          {subComment.map((subCom) => (
            <Subcomment key={subCom.id} subCom={subCom} />
          ))}
        </div>
      </SubCommentsList>
    </div>
  );
}