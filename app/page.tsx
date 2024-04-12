import Card from "@/components/Card/card";
import { Question } from "@/lib/types";
import Link from "next/link";


const handleFetch = async () : Promise<Question[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/questions`);
  return res.json() as Promise<Question[]>;
}

export default async function Home() {
  
  // const staticData = await fetch("http://localhost:3000/api/questions");
  // const Q: Question[] = await staticData.json();
  const Q = await handleFetch();

  return (
    <main>
      <div className=" flex flex-col w-full lg:w-3/4 m-auto">
        {Q.map((quest) => {
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
