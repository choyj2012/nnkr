import Card from "@/components/Card/card";
import CardList from "@/components/CardList/cardList";
import Skeleton from "@/components/Skeleton/skeleton";
import { getAllQuestions } from "@/lib/queries";
import { Question } from "@/lib/types";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 10;
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
  
  const Q = await getAllQuestions(0, 5);

  // const Q = await getCachedAllQuestions();
  return (
    <main>
      <div className="flex flex-col w-full">
        {/* {Q?.map((quest: Question) => {
          return (
            <Link key={quest.id} href={`/questions/${quest.id}`}>
              <div className="*:hover:bg-green-50 *:hover:transition-colors cursor-pointer">
                <Card q={quest} />
              </div>
            </Link>
          );
        })} */}
        {
          <Suspense fallback={<Skeleton/>}>
            <CardList init={Q}></CardList>
          </Suspense>
        }
      </div>
    </main>
  );
}
