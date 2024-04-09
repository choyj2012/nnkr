import { AnswerComment } from "@/lib/types";
import HaiComponent from "../Card/hai";

export default function Comment({comdate}: {comdate : AnswerComment}) {
  
  const {answer, name, comment, date, subComment} = comdate;
  return (
    <div className="flex flex-row items-center mx-4 my-2">
      <HaiComponent hai={answer} width="w-[8%]" height="h-auto" />
      <div>
        <div>{name}</div>
        <div>{comment}</div>
        <div>{date.toDateString()}</div>
        <div>
          {subComment.map((subCom) => (
            <div key={subCom.id}>{subCom.comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
}