import { addComment, addSubComment } from "@/lib/queries";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(){
  
}

export async function POST(req: Request){
  const _req = await req.json();

  console.log('revlidate ' + `/result/${_req.qid}`);
  if(_req?.isSub){
    console.log(_req);
    const res = await addSubComment(_req.qid, _req.comId, _req.com)
    revalidateTag(`/result/${_req.qid}`);
    return NextResponse.json(res);
  }
  else{
    const res = await addComment(_req.qid, _req.ansCom);
    revalidateTag(`/result/${_req.qid}`);
    return NextResponse.json(res);
  }
}