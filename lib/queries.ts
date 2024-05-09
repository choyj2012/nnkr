import { AnswerComment, Question } from "./types";
import { mockComments } from "./mock";
import clientPromise from "./mongodb";
import { JSDOM } from 'jsdom';
import DOMPurify from "dompurify";

const purify = DOMPurify(new JSDOM('').window);

export async function getAllQuestions() {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db.collection("nnkr").find<Question>({}).sort({id: -1}).toArray();
    return res;
  }
  catch (e) {
    console.error(e);
  }
}

export async function getQuestion(qid: number) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db.collection("nnkr").findOne<Question>({id: qid});
    return res;
  }
  catch (e) {
    console.error(e);
  }
}

export async function addQuestion(q: Question) {
  try {
    const client = await clientPromise;
    const db = client.db('nnkr');
    const res = await db.collection<Question>('nnkr').insertOne({
      ...q,
      description: purify.sanitize(q.description),
      sol: purify.sanitize(q.sol),
      id: await getNextSequence()
    }); 
    return res;
  }
  catch (e) {
    console.error(e);
  }
}

async function getNextSequence(): Promise<number> {
  let res;
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    res = await db.collection("counter").findOneAndUpdate(
      { id: "inc" },
      {
        $inc: {
          seq: 1,
        },
      },
      { returnDocument: "after" }
    );
  } catch (e) {
    console.error(e);
  }
  console.log(res);
  return res?.seq;
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