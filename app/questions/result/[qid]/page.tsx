import Card from "@/components/Card/card";
import CommentsList from "@/components/Comment/commentsList";
import { getAllQuestions, getQuestion, getResult } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";
// import ResultChart from "@/components/ResultChart/ResultChartuseEffect";
import ResultChart from "@/components/ResultChart/ResultChart";


export default async function ResultPage({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);

  if(!Q) return notFound();
  return (
    <div>
      <Card q={Q}>
        <>
          <ResultChart qid={qid} />
          <Answer answer={Q.answer} sol={Q.sol} />
        </>
      </Card>
      Comment
      <CommentsList qid={qid} />
    </div>
  );
}