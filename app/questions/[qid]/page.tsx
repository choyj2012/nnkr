import Card from "@/components/Card/card";
import CommentsBox from "@/components/Comment/commentsBox";
import { Question } from "@/lib/types";

// export async function generateStaticParams() {
//   const res = await fetch(
//     "http://localhost:3000/api/questions"
//   )
//   const Q: Question[] = await res.json();

//   return Q.map((item) => ({ qid: item.id }));
// }

const handleFetch = async (qid: string): Promise<Question> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/questions/?id=${qid}`)
  return res.json() as Promise<Question>;
}

export default async function Page({params}: {params : {qid: string}}) {
  const {qid} = params;
  const Q = await handleFetch(qid);
  return (
    <div className="group-[click] mx-auto *:w-11/12">
      <Card q={Q} />
      <CommentsBox id={qid}/>
    </div>
  )
}