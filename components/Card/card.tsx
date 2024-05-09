import { Question } from "@/lib/types";
import HaiComponent from "./hai";
import SelectableTehai from "./selectableTehai";

export default function Card({ q, selecthai, children }: { q: Question, selecthai?: boolean, children?: React.ReactElement }) {
  return (
    <div
      className="
        mx-auto my-2 px-[4%] py-6 flex flex-col
        border-4 border-green-700
        *:text-base lg:*:text-xl"
    >
      <div className="flex flex-row gap-2 items-center mb-2 md:mb-3">
        <div className="min-w-[8%] mr-4">Q. {q.id}</div>
        <div>{q.kyokumen}국</div>
        <div>{q.junme}순</div>
        <div>{q.jikaze}가</div>
        <div>도라</div>
        <HaiComponent hai={q.dora} width="w-[5%]" height="h-auto" />
      </div>

      <div className="" dangerouslySetInnerHTML={{__html: q.description}}></div>

      {selecthai ? (
        <SelectableTehai tehai={q.tehai} tsumo={q.tsumo} />
      ) : (
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
      )}

      {children}
    </div>
  );
}
