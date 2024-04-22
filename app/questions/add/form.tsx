"use client";

import Card from "@/components/Card/card";
import Tiptap from "@/components/TextEditor/texteditor";
import { Hai, Kaze, Question } from "@/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

let t: ReturnType<typeof setTimeout> | null = null;
interface FormData {
  kyokumen: string;
  junme: number;
  jikaze: Kaze;
  tehai: string;
  dora: string;
  description: string;
  answer: Hai;
}

const emptyQ: Question = {
  id: "",
  tehai: Array<Hai>(13).fill("?"),
  tsumo: "?",
  kyokumen: "동 1",
  junme: 1,
  jikaze: "동",
  dora: "?",
  description: "",
  answer: "?",
};
function string2Hai(tehai: string): [Hai[], Hai] {
  const Tehai: Hai[] = Array<Hai>(14).fill("?");

  const stack: string[] = [];
  let idx = 0;
  for (let i = 0; i < tehai.length; i++) {
    if (tehai.charAt(i) >= "0" && tehai.charAt(i) <= "9")
      if(tehai.charAt(i) == "0") stack.push("51");
      else stack.push(tehai.charAt(i));
    else {
      const C = tehai.charAt(i).toUpperCase();
      while (stack.length > 0) {
        Tehai[idx++] = (C + stack.pop()!) as Hai;
      }
    }
  }
  
  return [Tehai.slice(0, 13).sort((a, b) => {
    if(a === '?') return 1;
    else if(b === '?') return -1;
    else return a <= b ? -1 : 1;
  }), Tehai[13]];
}

export default function NNKREditor() {
  const { register, setValue, control, handleSubmit, watch, getValues } =
    useForm<FormData>();

  const onSubmit = handleSubmit((data) => {});

  const [preview, setPreview] = useState<Question>(emptyQ);

  const handleChange = () => {
    if(t) clearTimeout(t);

    t = setTimeout(() => {
      const [Tehai, Tsumo] = string2Hai(getValues("tehai"));
      const Dora = getValues("dora") === "" ? "?" : getValues("dora");
      setPreview({
        id: "",
        tehai: Tehai,
        tsumo: Tsumo,
        kyokumen: getValues("kyokumen"),
        junme: getValues("junme"),
        jikaze: getValues("jikaze"),
        dora: (Dora.charAt(1).toUpperCase() + Dora.charAt(0)) as Hai,
        description: getValues("description"),
        answer: "?",
      });
    }, 1000);
  }

  return (
    <>
      <form onSubmit={onSubmit} onChange={handleChange}>
        <div
          className="flex flex-col border-4 border-green-700
        px-4 *:my-4"
        >
          <div className="flex items-center gap-4">
            <label className="font-bold min-w-[20%] text-center">국면</label>
            <div
              className="flex-grow flex flex-col gap-4
              md:flex-row"
              >
              <select {...register("kyokumen")}>
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <option key={idx} value={`동 ${idx + 1}`}>
                      동 {idx + 1}국
                    </option>
                  ))}
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <option key={idx} value={`남 ${idx + 1}`}>
                      남 {idx + 1}국
                    </option>
                  ))}
              </select>

              <select {...register("junme")}>
                {Array(18)
                  .fill(null)
                  .map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1} 순
                    </option>
                  ))}
              </select>

              <select {...register("jikaze")}>
                <option value="동">동가</option>
                <option value="남">남가</option>
                <option value="서">서가</option>
                <option value="북">북가</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <label className="font-bold min-w-[20%] text-center">도라</label>
              <input className="w-20"
                {...register("dora", {
                  maxLength: 2,
                  pattern: /[0-9][mspz]/,
                })}
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <label className="font-bold min-w-[20%] text-center">손패</label>
              <input className=" w-52"
                pattern="/([0-9]+[msp]|[1-7]+z)+$/"
                {...register("tehai", {
                  pattern: /([0-9]+[msp]|[1-7]+z)+$/,
                  maxLength: 20,
                })}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">설명</label>
              <Tiptap />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">답</label>
            <input className="w-20" {...register("answer")}></input>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">해설</label>
              <Tiptap />
          </div>
        </div>
      </form>
      <Card q={preview} />
    </>
  );
}
