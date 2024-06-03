import { getResult } from "@/lib/queries";
import Chart from "./Chart";
import { unstable_cache } from "next/cache";

export default async function ResultChart({qid}: {qid: number}) {

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
    <Chart chartData={chartData} />
  )
}