import Card from "@/components/Card/card";
import { Q } from "@/lib/mock";



export default function Home() {


  return (
    <main>
      <div className=" flex flex-col w-full lg:w-3/4 m-auto">
        {Q.map((quest) => {
          return <Card key={quest.id} q={quest}/>
        })}
      </div>
    </main>
  );
}
