import clientPromise from "@/lib/mongodb";
import { Hai } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(req: Request){
  
  const {searchParams} = new URL(req.url);
  const qid = parseInt(searchParams.get('qid') ?? '0');
  console.log(qid);
  const client = await clientPromise;
  const db = client.db('nnkr');

  const res = await db.collection('comments').findOne<{result: Record<Hai, number>}>({id: qid});
  if(!res?.result) return NextResponse.json([]);

  const temp: Array<{hai: string, vote: number}> = [];
  for (const key in res.result) {
    temp.push({ hai: key, vote: res.result[key as Hai] });
  }
  return NextResponse.json(temp.sort((a, b) => {
    return a.vote < b.vote ? 1 : -1;
  }));
}