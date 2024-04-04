import { Hai } from "@/lib/types";
import Image from "next/image";

export default function HaiComponent({hai, width, height} : {hai: Hai, width: string, height: string}) {
  return (
    <div className={`${width} ${height} relative inline-block`}>
      <Image
        src={`/img/Front.svg`}
        alt={"bg"}
        width={0}
        height={0}
        className="w-full h-auto border md:border-2 border-black rounded-[15%] box-border"
      />
      <div className="w-full h-full absolute top-0 p-[5%]">
        <Image
          src={`/img/${hai}.svg`}
          alt={hai}
          width={0}
          height={0}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}