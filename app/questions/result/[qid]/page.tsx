import Card from "@/components/Card/card";
import CommentsList from "@/components/Comment/commentsList";
import { getQuestion, getResult } from "@/lib/queries";
import { notFound } from "next/navigation";
import Answer from "@/components/Answer/answer";
import Chart from "@/components/ResultChart/Chart";
import { Suspense } from "react";
import { revalidateTag, unstable_cache } from "next/cache";
import { revalidate } from "@/app/page";

export default async function ResultPage({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);

  if(!Q) return notFound();
  return (
    <div>
      <Card q={Q}>
        <>
          <Suspense fallback={<p>Chart Loading...</p>}>
            <ResultChart qid={qid}/>
          </Suspense>
          <Answer answer={Q.answer} sol={Q.sol} />
        </>
      </Card>

      Comment
      <CommentsList qid={qid}/>
    </div>
  );
}


async function ResultChart({qid}: {qid: number}) {

  
  //const chartData = await getResult(qid);
  // const chartData = await getCacheResult(qid);
  const getCacheResult = unstable_cache(
    async (qid) => {
      const res = await getResult(qid);
      console.log(res);
      return res;
    },
    undefined,
    { tags: [`result-${qid}`] }
  )
  const chartData = await getCacheResult(qid);

  return (
    <>
      <Chart chartData={chartData}></Chart>
    </>
  )
}