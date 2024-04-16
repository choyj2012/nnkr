import { AnswerComment } from "@/lib/types";
import Comment from "./comment";
import HaiComponent from "../Card/hai";
import { getCommentsList } from "@/lib/queries";

export default async function CommentsList({id} : {id: string}) {

  const commentsList = await getCommentsList(id);
  return (
    <div className="flex flex-col  mx-auto gap-4">
      {commentsList?.map((comment) => {
        return <Comment key={comment.id} comdate={comment} />;
      })}
      {/* {commentsList?.length === 0 && '아직 댓글이 없습니다'} */}
    </div>
  );
}