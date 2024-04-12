import Card from "@/components/Card/card";
import { getAllQuestions } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  
  const Q = await getAllQuestions();

  return (
    <main>
      <div className="flex flex-col w-full lg:gap-8">
        {Q?.map((quest) => {
          return (
            <Link key={quest.id} href={`/questions/${quest.id}`}>
              <Card q={quest} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
