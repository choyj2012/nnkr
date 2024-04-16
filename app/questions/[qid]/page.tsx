import Card from "@/components/Card/card";
import CommentEditor from "@/components/Comment/commentEditor";
import CommentsList from "@/components/Comment/commentsList";
import HaiSelector from "@/components/Comment/haiSelector";
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
    <div className="group-[click]">
      <HaiSelector>
        <Card q={Q} selecthai />
        <CommentEditor />
      </HaiSelector>
      <CommentsList id={qid} />
    </div>
  );
}