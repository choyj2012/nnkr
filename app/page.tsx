import Card from "@/components/Card/card";
import { getAllQuestions } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  
  const Q = await getAllQuestions();

  return (
    <main>
      <div className="flex flex-col w-full mt-4 gap-4">
        {Q?.map((quest) => {
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
