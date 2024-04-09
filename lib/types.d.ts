type Man = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'M7' | 'M8' | 'M9' | 'M51';
type Pin = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P51';
type Sou = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9' | 'S51';
type Zi = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5' | 'Z6' | 'Z7';
type Hai = Man | Pin | Sou | Zi;

export interface Question {
  id: string;
  tehai: Hai[];
  tsumo: Hai;
  kyokumen: string;
  junme: number;
  dora: Hai;
  description: string;
  answer: Hai | '?';
}

export interface Comment {
  id: string,
  name: string,
  comment: string,
  date: Date,
}

export type AnswerComment = { 
  answer: Hai | '?', subComment: Comment[] 
} & Comment