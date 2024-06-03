import { getResult } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request){
  const {searchParams} = new URL(req.url);
  const qid = parseInt(searchParams.get('qid') ?? '0');
  const result = await getResult(qid);
  return NextResponse.json(result);
}