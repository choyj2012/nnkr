import clientPromise from "@/lib/mongodb";
import { addQuestion, getAllQuestions } from "@/lib/queries";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { Question } from "@/lib/types";

export async function POST(req: Request) {
  const q: Question = await req.json();
  const res = await addQuestion(q);
  revalidatePath('/')
  redirect(`/questions/${q.id}`);
  return NextResponse.json(res);
}

export async function GET() {
  const res = await getAllQuestions();
  return NextResponse.json(res)
}