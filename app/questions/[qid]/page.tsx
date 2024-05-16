import Card from "@/components/Card/card";
import CommentEditor from "@/components/Comment/commentEditor";
import CommentsList from "@/components/Comment/commentsList";
import Comment from "@/components/Comment/comment";
import HaiSelector from "@/components/Comment/haiSelector";
import { getAllQuestions, getCommentsList, getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";

export async function generateStaticParams() {
  const res = await getAllQuestions();

  if(!res) return [];
  return res.map((item) => ({ qid: item.id.toString() }));
}


export default async function Page({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);
  const commentsList = await getCommentsList(qid);
  console.log(commentsList?.length)
  if(!Q) return notFound();

  return (
    <div className="group-[click]">
      <HaiSelector>
        <Card q={Q} selecthai>
          <Answer answer={Q.answer} sol={Q.sol} />
        </Card>
        <CommentEditor qid={qid}/>
      </HaiSelector>
      <CommentsList commentsCnt={commentsList?.length}>
        <div className="flex flex-col mx-auto gap-4 border-4 border-green-700 px-[4%] py-4 *:text-sm">
          {commentsList?.map((comment) => {
            return <Comment key={comment.id} comdate={comment} />;
          })}
          {/* {commentsList?.length === 0 && '아직 댓글이 없습니다'} */}
        </div>
      </CommentsList>
    </div>
  );
}