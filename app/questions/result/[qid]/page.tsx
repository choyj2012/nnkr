import Card from "@/components/Card/card";
import CommentsList from "@/components/Comment/commentsList";
import { getAllQuestions, getQuestion, getResult } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";
// import ResultChart from "@/components/ResultChart/ResultChartuseEffect";
import ResultChart from "@/components/ResultChart/ResultChart";
import { unstable_cache } from "next/cache";
import Chart from "@/components/ResultChart/Chart";


export default async function ResultPage({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);

  if(!Q) return notFound();


  const cacheKey = `/result/${qid}`;
  const getCachedResult = unstable_cache(
    async (qid) => getResult(qid),
    [cacheKey],
    {
      tags: [cacheKey]
    }
  )
  const chartData = await getCachedResult(qid);

  return (
    <div>
      <Card q={Q}>
        <>
          {/* <ResultChart qid={qid} /> */}
          <Chart chartData={chartData}/>
          <Answer answer={Q.answer} sol={Q.sol} />
        </>
      </Card>
      Comment
      <CommentsList qid={qid} />
    </div>
  );
}