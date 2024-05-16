import { addComment } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(){
  
}

export async function POST(req: Request){
  const _req = await req.json();
  const res = await addComment(_req.qid, _req.ansCom);
  return NextResponse.json(res);
}