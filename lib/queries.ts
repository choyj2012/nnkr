import { Question } from "./types";
import { Q } from "./mock";

export async function getAllQuestions(): Promise<Question[] | null> {
  return Q;
}

export async function getQuestion(qid: string): Promise<Question | null> {
  for(const q of Q){
    if(q.id === qid) return q;
  }
  return null;
}