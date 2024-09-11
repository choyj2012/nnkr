// import CardList from "@/components/CardList/cardList";
import Skeleton from "@/components/Skeleton/skeleton";

import dynamic from 'next/dynamic'
 
const CardList = dynamic(() => import("@/components/CardList/cardList"),
  {
    loading: () => <Skeleton />,
    ssr: false,
  }
);

// export const revalidate = 0;

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <CardList />
      </div>
    </main>
  );
}
