import clientPromise from "@/lib/mongodb";
import { addQuestion, getAllQuestions } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await addQuestion(await req.json());
  return NextResponse.json(res);
}

export async function GET() {
  const res = await getAllQuestions();
  return NextResponse.json(res)
}