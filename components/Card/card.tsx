import { Question } from "@/lib/types";
import HaiComponent from "./hai";

export default function Card({q} : {q: Question}) {

  return (
    <div
      className="w-11/12 mx-auto border-4 border-green-700 py-6 flex flex-col my-2 gap-y-4 bg-green-50 hover:bg-green-100
     hover:transition-colors cursor-pointer"
    >
      <div className="flex flex-row gap-2 items-center px-[4%] *:text-base md:*:text-xl lg:*:text-2xl xl:*:text-3xl 2xl:*:text-4xl">
        <div className="min-w-[8%] mr-6">Q. {q.id}</div>
        <div>{q.kyokumen}국</div>
        <div>{q.junme}순</div>
        <div>도라</div>
        <HaiComponent hai={q.dora} width="w-[5%]" height="h-auto"/>
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-[0.2%] md:mt-6">
        {q.tehai?.map((hai, index) => {
          return (
            <HaiComponent
              key={index}
              hai={hai}
              width="w-[6%]"
              height="h-full"
            />
          );
        })}

        <div className="w-[4%]"></div>
        <HaiComponent hai={q.tsumo} width="w-[6%]" height="h-full" />
      </div>
    </div>
  );
}