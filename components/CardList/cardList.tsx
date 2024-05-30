'use client'

import { Question } from "@/lib/types";
import Card from "../Card/card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const FETCH_ONECE = 5;

export default function CardList({init} : {init: Question[] | undefined}) {
  const {ref, inView} = useInView();

  const {
    data : list,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['nnkrList'],
    queryFn: async ({pageParam}: {pageParam: number}) => {
      const res = await fetch(`api/questions?offset=${pageParam}`)
      return res.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPage.length < FETCH_ONECE ? undefined : lastPageParam + FETCH_ONECE;
      return nextPage;
    },
    refetchOnWindowFocus: false,
  })


  useEffect(() => {
    if(inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {list?.pages?.map(page => page.map(
        (quest: Question) => {
        return (
          <div
            key={quest.id}
            className="*:hover:bg-green-50 *:hover:transition-colors cursor-pointer"
          >
            <Card q={quest} />
          </div>
        );
      }))}
      <div ref={ref}> 
      {isFetchingNextPage && 'Loading...'}
      {!hasNextPage && 'no more'}
      </div>
    </>
  );
}