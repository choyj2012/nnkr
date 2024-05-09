'use client'

import { Hai } from "@/lib/types"
import { useState } from "react"
import HaiComponent from "../Card/hai";

export default function Answer({answer, sol}: {answer: Hai, sol: string}) {
  
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="mt-8">
      <div onClick={() => setIsVisible(p => !p)}>{!isVisible ? "> 정답 보기" : "> 정답 접기"}</div>

      {isVisible && (
        <div className="flex flex-row gap-4 mt-4">
          <HaiComponent hai={answer} width="w-[8%]" height="auto" />
          <div dangerouslySetInnerHTML={{__html: sol}}/>
        </div>
      )
      }
    </div>
  );
}