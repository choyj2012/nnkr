import CardList from "@/components/CardList/cardList";

export const revalidate = 10;

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <CardList />
      </div>
    </main>
  );
}
