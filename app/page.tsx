import CardList from "@/components/CardList/cardList";

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col w-full gap-4">
        <CardList />
      </div>
    </main>
  );
}
