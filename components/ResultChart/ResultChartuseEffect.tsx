'use client'

import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function ResultChart({qid}: {qid: number}) {

  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      console.log('fetch s');
      if(!ignore){
        const res = await fetch(`/api/result?qid=${qid}`).then(res => res.json());
        console.log('fetch');
        setChartData(res);
      }
    }

    fetchData();

    return () => {
      ignore = true
    };
  }, []);

  if(chartData === undefined) return <h1>Loading...</h1>
  return (
    <>
      <Chart chartData={chartData}></Chart>
    </>
  )
}