import { AnswerComment, Question } from "./types";
import { Q, mockComments } from "./mock";

export async function getAllQuestions(): Promise<Question[] | null> {
  return Q;
}

export async function getQuestion(qid: string): Promise<Question | null> {
  for(const q of Q){
    if(q.id === qid) return q;
  }
  return null;
}

export async function getCommentsList(qid: string): Promise<AnswerComment[] | null> {
  if(qid === '1') return [];
  return mockComments
}