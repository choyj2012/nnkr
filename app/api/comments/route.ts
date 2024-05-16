import { addComment, addSubComment } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(){
  
}

export async function POST(req: Request){
  const _req = await req.json();

  if(_req?.isSub){
    console.log(_req);
    const res = await addSubComment(_req.qid, _req.comId, _req.com)
    return NextResponse.json(res);
  }
  else{
    const res = await addComment(_req.qid, _req.ansCom);
    return NextResponse.json(res);
  }
}