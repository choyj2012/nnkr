import Card from "@/components/Card/card";
import CommentsBox from "@/components/Comment/commentsBox";
import { getAllQuestions, getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await getAllQuestions();

  if(!res) return [];
  return res.map((item) => ({ qid: item.id }));
}


export default async function Page({params}: {params : {qid: string}}) {
  const {qid} = params;
  const Q = await getQuestion(qid);

  if(!Q) return notFound();

  return (
    <div className="group-[click] mx-auto *:w-11/12">
      <Card q={Q} />
      <CommentsBox id={qid}/>
    </div>
  )
}