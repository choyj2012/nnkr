import Card from "@/components/Card/card";
import CommentsList from "@/components/Comment/commentsList";
import { getQuestion, getResult } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";
import dynamic from "next/dynamic";
import ChartSpinner from "@/components/ResultChart/chartSpinner";

const Chart = dynamic(() => import('@/components/ResultChart/Chart'),
  {
    loading: () => <ChartSpinner />,
    ssr: false
  }
);

export default async function ResultPage({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);

  if(!Q) return notFound();

  return (
    <div>
      <Card q={Q}>
        <>
          <Chart qid={qid}/>
          <Answer answer={Q.answer} sol={Q.sol} />
        </>
      </Card>
      Comment
      <CommentsList qid={qid} />
    </div>
  );
}