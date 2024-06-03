import { getResult } from "@/lib/queries";
import Chart from "./Chart";

export default async function ResultChart({qid}: {qid: number}) {

  const chartData = await getResult(qid);

  return (
    <Chart chartData={chartData} />
  )
}