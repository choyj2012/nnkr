import { getCommentsList } from "@/lib/queries";

export default async function CommentsList({qid}: {qid: number}) {

  const commentsList = await getCommentsList(qid);
  // console.log(commentsList?.length)


  return (
    <div className="flex flex-col mx-auto gap-4 border-4 border-green-700 px-[4%] py-4 *:text-sm">
      {commentsList?.map((comment) => {
        return (
          <div key={comment.id.toString()} className="border-b-2 border-green-700 py-4">
            <ClickableComment
              comment={<Comment comdate={comment} />}
              data={{qid: qid, comId: comment.id.toString()}}
            >
              <SubCommentsList subComments={comment.subComments} />
            </ClickableComment>
          </div>
        );
      })}
    </div>
  );
}

import { AnswerComment } from "@/lib/types";
import HaiComponent from "@/components/Card/hai";
import SubCommentsList from "./subCommentsList";
import { date2String } from "@/lib/queries";
import ClickableComment from "./clickableComment";

function Comment({comdate}: {comdate : AnswerComment}) {
  
  const {answer, name, comment, date, subComments} = comdate;
  return (
      <div className="flex flex-row gap-4 mb-1">
        <HaiComponent hai={answer} width="max-w-[8%]" height="h-fit" />

        <div className="flex-grow flex flex-col">
          <div className="flex-grow">{comment}</div>

          <div className="text-right">
            - {name} {date2String(date)}
          </div>
        </div>
      </div>
  );
}