'use server'

import { AnswerComment, Comment, CommentList, Hai, Question } from "./types";
import clientPromise from "./mongodb";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { ObjectId } from "bson";
import { revalidatePath, revalidateTag } from "next/cache";
const purify = DOMPurify(new JSDOM("").window);

export async function getAllQuestions(offset: number, limit: number) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db
      .collection("nnkr")
      .find<Question>({})
      .sort({ id: -1 }).limit(limit).skip(offset)
      .toArray();
    return JSON.parse(JSON.stringify(res)) as Question[];
  } catch (e) {
    console.error(e);
  }
}

export async function getQuestion(qid: number) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db.collection("nnkr").findOne<Question>({ id: qid });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function addQuestion(q: Question) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const id = await getNextSequence();
    const P1 = db.collection("comments").insertOne({
      id: id,
      commentsList: [],
      result: {},
    });
    const P2 = db.collection<Question>("nnkr").insertOne({
      ...q,
      description: purify.sanitize(q.description),
      sol: purify.sanitize(q.sol),
      id: id,
    });
    await Promise.all([P1, P2]);
    return id;
  } catch (e) {
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
  return res?.seq;
}

export async function getCommentsList(qid: number) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db
      .collection<CommentList>("comments")
      .findOne({ id: qid });
    if (!res) return [];
    else return res.commentsList;
  } catch (e) {
    console.error(e);
  }
}

export async function addComment(qid: number, ansCom: AnswerComment) {
  try {
    const client = await clientPromise;
    const db = client.db("nnkr");

    const map = await db
      .collection("comments")
      .findOne<{ id: number, result: Record<Hai, number>}>({ id: qid })
      .then((res) => res?.result);

    //mongodb 명령어로 하는 방법?
    if(map){
      if (map[ansCom.answer] === undefined) {
        map[ansCom.answer] = 1;
      } else {
        map[ansCom.answer]++;
      }
    }

    const r = await db.collection("comments").updateOne(
      { id: qid },
      {
        $set: {result: map}
      }
    );

    // revalidatePath(`/questions/result/[qid]`, 'page');
    revalidateTag(`result-${qid}`);
    if (ansCom.comment === "") return r;

    ansCom.id = new ObjectId();
    const res = await db.collection<CommentList>("comments").updateOne(
      { id: qid },
      {
        $addToSet: {
          commentsList: ansCom,
        },
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function addSubComment(qid: number, comId: string, com: Comment) {
  try {
    com.id = new ObjectId();
    const client = await clientPromise;
    const db = client.db("nnkr");
    const res = await db
      .collection<CommentList>("comments")
      .updateOne(
        { id: qid, "commentsList.id": new ObjectId(comId) },
        { $push: { "commentsList.$.subComments": com } }
      );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function getResult(qid: number) {
  try {
    const client = await clientPromise;
    const res = await client
      .db("nnkr")
      .collection("comments")
      .findOne<{ result: Record<Hai, number> }>({ id: qid });

    if (!res?.result) return [];

    const temp: Array<{ hai: Hai; vote: number }> = [];
    for (const key in res.result) {
      temp.push({ hai: key as Hai, vote: res.result[key as Hai] });
    }
    return temp.sort((a, b) => {
      return a.vote < b.vote ? 1 : -1;
    });
  }
  catch (e) {
    console.error(e);
    return [];
  }
}