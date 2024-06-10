import { Hai } from "@/lib/types"
import HaiComponent from "../Card/hai";

export default function Answer({answer, sol}: {answer: Hai, sol: string}) {

  return (
    <div className="flex flex-row gap-4 mt-4">
      <HaiComponent hai={answer} width="w-[8%]" height="h-fit" />
      
      <div className="flex-1">
        <p className=" whitespace-pre-wrap">{sol}</p>
      </div>
    </div>
  );
}