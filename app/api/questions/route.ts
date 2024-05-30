import clientPromise from "@/lib/mongodb";
import { addQuestion, getAllQuestions } from "@/lib/queries";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { Question } from "@/lib/types";

export async function POST(req: Request) {
  const q: Question = await req.json();
  const res = await addQuestion(q);
  //revalidatePath('/');
  // revalidateTag('all-questions');
  return NextResponse.json(res);
}

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const offset = parseInt(searchParams.get('offset') ?? '0');
  const res = await getAllQuestions(offset, 5);
  return NextResponse.json(res)
}