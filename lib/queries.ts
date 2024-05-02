import { AnswerComment, Question } from "./types";
import { Q, mockComments } from "./mock";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

export async function getAllQuestions(): Promise<Question[]> {
  let res: Question[] = [];
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    res = await db.collection("nnkr").find<Question>({}).toArray();
    console.log(res);
  }
  catch (e) {
    console.error(e);
  }
  return res;
}

export async function getQuestion(qid: string): Promise<Question | null> {
  let res = null;
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    res = await db.collection("nnkr").findOne<Question>({id: qid});
  }
  catch (e) {
    console.error(e);
  }

  return res;
}

export async function addQuestion(q: Question) {
  let res;
  try {
    const client = await clientPromise;
    const db = client.db('nnkr');
    res = await db.collection('nnkr').insertOne(q); 
  }
  catch (e) {
    console.error(e);
  }
}

export async function getCommentsList(qid: string): Promise<AnswerComment[] | null> {
  if(qid === '1') return [];
  return mockComments
}

export function date2String(date: Date): string {
  const Now = new Date();
  if(Now.toDateString() === date.toDateString())
    return date.toLocaleTimeString('ko-KR', {hour:'numeric', minute:'numeric'});
  
  else return date.toLocaleDateString('ko-KR', {month:'numeric', day:'numeric'})
}