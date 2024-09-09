import CardList from "@/components/CardList/cardList";
import Skeleton from "@/components/Skeleton/skeleton";
import { Suspense } from "react";

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <Suspense fallback={<Skeleton/>}>
          <CardList />
        </Suspense>
      </div>
    </main>
  );
}
