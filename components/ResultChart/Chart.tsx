'use client'

import { Hai } from '@/lib/types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Fragment, useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import HaiComponent from '../Card/hai';
import { hai2String } from '@/lib/function';
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface VoteResult {
  hai: Hai,
  vote: number,
}

export default function ResultChart({qid}: {qid: number}) {
  const [chartData, setChartData] =
    useState<VoteResult[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [voteSum, setVoteSum] = useState(0);

  useEffect(() => {
    fetch(`/api/result?qid=${qid}`)
      .then((res) => res.json())
      .then((data: VoteResult[]) => {
        setVoteSum(data.reduce((acc, obj) => ({vote: acc.vote + obj.vote}), {vote: 0}).vote);
        setChartData(data);
        setIsLoading(false);
      });
  }, []);

  console.log(chartData);
  const data = {
    labels: chartData?.map((item) => hai2String(item.hai)),
    datasets: [
      {
        data: chartData?.map((item) => item.vote),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col-reverse items-center sm:flex-row mt-4">
      {isLoading ? (
        <p className='m-auto text-2xl'>Loading...</p>
      ) : (
        <>
          <div className="w-1/2 flex flex-col justify-center gap-2">
            {chartData?.slice(0, 5).map(({ hai, vote }, idx) => {
              return (
                <Fragment key={hai}>
                  <div className="flex items-center justify-center *:text-lg gap-4">
                    <div className="min-w-10 text-center">{idx + 1}위</div>
                    <HaiComponent hai={hai} width="w-[10%]" height="h-auto" />
                    <div className="min-w-10 text-center">{vote}표</div>
                    <div className="min-w-10 text-center">
                      {((vote / voteSum) * 100).toFixed(0)}%
                    </div>
                  </div>
                  {idx < 5 && <div className="w-2/3 h-px bg-[#ccc] self-center"></div>}
                </Fragment>
              );
            })}
          </div>
          <div className="relative w-1/2">
            <Doughnut
              className="w-full"
              data={data}
              options={{
                layout: {},
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      font: { size: 14 },
                      color: '#000',
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
