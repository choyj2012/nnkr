import { Question } from "@/lib/types";
import HaiComponent from "./hai";

export default function Card({ q }: { q: Question }) {
  return (
    <div
      className="
        mx-auto my-2 px-[4%] py-6 flex flex-col
        border-4 border-green-700 bg-green-50
        hover:bg-green-100 hover:transition-colors cursor-pointer
        *:text-sm md:*:text-base lg:*:text-xl xl:*:text-2xl 2xl:*:text-4xl"
    >
      <div className="flex flex-row gap-2 items-center mb-2 md:mb-3">
        <div className="min-w-[8%] mr-4">Q. {q.id}</div>
        <div>{q.kyokumen}국</div>
        <div>{q.junme}순</div>
        <div>도라</div>
        <HaiComponent hai={q.dora} width="w-[5%]" height="h-auto" />
      </div>

      <div className="">{q.description}</div>
      <div className="flex flex-row flex-wrap justify-center *:mr-[1px] mt-4 md:mt-8 w-fit">
        {q.tehai?.map((hai, index) => {
          return (
            <HaiComponent
              key={index}
              hai={hai}
              width="w-[6.5%]"
              height="h-auto"
            />
          );
        })}

        <div className="w-1"></div>
        <HaiComponent hai={q.tsumo} width="w-[6.5%]" height="h-auto" />
      </div>
    </div>
  );
}
