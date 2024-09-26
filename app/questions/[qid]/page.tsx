import Card from "@/components/Card/card";
import CommentEditor from "@/components/Comment/commentEditor";
import HaiSelector from "@/components/Comment/haiSelector";
import { getAllQuestions, getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import WriterOption from "@/components/WriterOption/writerOption";

export async function generateStaticParams() {
  const res = await getAllQuestions(0, 0);
  if(!res) return [];
  
  return res.map((item) => ({ qid: item.id.toString() }));
}


export default async function Page({params}: {params : {qid: string}}) {
  const qid = parseInt(params.qid);
  const Q = await getQuestion(qid);
  if(!Q) return notFound();

  return (
    <div>
      <HaiSelector>
        <Card q={Q} selecthai/>
        <CommentEditor qid={qid}/>
      </HaiSelector>
      <Link href={`/questions/result/${qid}`} className="underline underline-offset-2">결과 보기</Link>
      
      {/* <WriterOption name={Q.name}/> */}
    </div>
  );
}