import Card from "@/components/Card/card";
import CommentsList from "@/components/Comment/commentsList";
import { getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";

export default async function ResultPage({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);

  if(!Q) return notFound();
  return (
    <div>
      <Card q={Q}>
        <>
          <div>Result</div>
          <Answer answer={Q.answer} sol={Q.sol} />
        </>
      </Card>

      
      Comment
      <CommentsList qid={qid}/>
    </div>
  );
}
