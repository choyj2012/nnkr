'use client'

import { Hai } from "@/lib/types";
import HaiComponent from "./hai";
import { useHaiSelectStore } from "@/store/store";

export default function SelectableTehai({tehai, tsumo}: {tehai: Hai[], tsumo: Hai}) {
  const setHai = useHaiSelectStore((state) => state.select);
  setHai('?');
  return (
    <div className="flex flex-row flex-wrap justify-center *:mr-[1px] mt-4 md:mt-8 w-fit">
      {tehai?.map((hai, index) => {
        return (
          <div key={index} className="w-[6.5%] h-full cursor-pointer hover:-translate-y-2" onClick={() => setHai(hai)}>
            <HaiComponent
              hai={hai}
              width="w-full"
              height="h-full"
            />
          </div>
        );
      })}

      <div className="w-1"></div>
      <div className="w-[6.5%] h-full cursor-pointer hover:-translate-y-2" onClick={() => setHai(tsumo)}>
        <HaiComponent hai={tsumo} width="w-fit" height="h-fit" />
      </div>
    </div>
  );
}