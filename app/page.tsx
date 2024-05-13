import Card from "@/components/Card/card";
import { getAllQuestions } from "@/lib/queries";
import { Question } from "@/lib/types";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export const revalidate = 60;
// const getCachedAllQuestions = unstable_cache(
//   () => getAllQuestions(),
//   ['all-questions']
// );
export default async function Home() {
  
  // const Q = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/questions`, {
  //   next: {
  //     revalidate: 10,
  //   }
  // }).then(res => {
  //   return res.json()
  // }).then(res => {
  //   console.log(res);
  //   return res;
  // })
  const Q = await getAllQuestions();
  // const Q = await getCachedAllQuestions();
  return (
    <main>
      <div className="flex flex-col w-full">
        {Q?.map((quest: Question) => {
          return (
            <Link key={quest.id} href={`/questions/${quest.id}`}>
              <div className="*:hover:bg-green-50 *:hover:transition-colors cursor-pointer">
                <Card q={quest} />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
