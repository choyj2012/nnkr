import { addQuestion, getAllQuestions } from "@/lib/queries";
import { NextResponse } from "next/server";
import { Question } from "@/lib/types";
import { verifyJwt } from "@/lib/jwt";
import { FETCH_ONCE } from "@/lib/constant";

export async function POST(req: Request) {
  const accessToken = req.headers.get('authorization');
  if(!accessToken || !verifyJwt(accessToken)){
    return new NextResponse(JSON.stringify({error: 'No Authorization'}), { status: 401, })
  }
  
  const q: Question = await req.json();
  const res = await addQuestion(q);
  return NextResponse.json(res);
}

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const offset = parseInt(searchParams.get('offset') ?? '0');
  const res = await getAllQuestions(offset, FETCH_ONCE);
  return NextResponse.json(res)
}