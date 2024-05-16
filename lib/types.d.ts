import { ObjectId } from "bson";

type Man = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'M7' | 'M8' | 'M9' | 'M51';
type Pin = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P51';
type Sou = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9' | 'S51';
type Zi = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5' | 'Z6' | 'Z7';
type Hai = Man | Pin | Sou | Zi | '?';
type Kaze = '동' | '남' | '서' | '북';

export interface Question {
  id: number;
  tehai: Hai[];
  tsumo: Hai;
  kyokumen: string;
  junme: number;
  jikaze: Kaze;
  dora: Hai;
  description: string;
  answer: Hai;
  sol: string;
}

export interface CommentList {
  qid: number,
  commentsList: AnswerComment[],
}

export interface Comment {
  id: ObjectId,
  name: string,
  comment: string,
  date: string,
}

export type AnswerComment = { 
  answer: Hai, subComments: Comment[] 
} & Comment