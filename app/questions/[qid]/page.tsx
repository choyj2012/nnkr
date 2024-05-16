import Card from "@/components/Card/card";
import CommentEditor from "@/components/Comment/commentEditor";
import HaiSelector from "@/components/Comment/haiSelector";
import { getAllQuestions, getQuestion } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await getAllQuestions();

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
        <Card q={Q} selecthai>
          {/* <Answer answer={Q.answer} sol={Q.sol} /> */}
        </Card>
        <CommentEditor qid={qid}/>
      </HaiSelector>
      <Link href={`/questions/result/${qid}`}>결과 보기</Link>
    </div>
  );
}

/*
<CommentsList> -> csr
  click
  <Comment>
  
  </Comment>
</CommentsList>

*/