"use client";

import Card from "@/components/Card/card";
import { Hai, Kaze, Question } from "@/lib/types";
import { useEffect, useState } from "react";
import { Control, set, useForm, useWatch } from "react-hook-form";
import { MouseEvent } from "react";
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
      stack.push(tehai.charAt(i));
    else {
      const C = tehai.charAt(i).toUpperCase();
      while (stack.length > 0) {
        Tehai[idx++] = (C + stack.pop()!) as Hai;
      }
    }
  }
  console.log(Tehai);
  return [Tehai.slice(0, 13).sort(), Tehai[13]];
}

export default function NNKREditor() {
  const { register, setValue, control, handleSubmit, watch, getValues } =
    useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    const [Tehai, Tsumo] = string2Hai(getValues("tehai"));
    const Dora = getValues("dora");
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
  });

  const [preview, setPreview] = useState<Question>(emptyQ);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // const [Tehai, Tsumo] = string2Hai(getValues("tehai"));
    // const Dora = getValues("dora");
    // setPreview({
    //   id: "",
    //   tehai: Tehai,
    //   tsumo: Tsumo,
    //   kyokumen: getValues("kyokumen"),
    //   junme: getValues("junme"),
    //   jikaze: getValues("jikaze"),
    //   dora: (Dora.charAt(1).toUpperCase() + Dora.charAt(0)) as Hai,
    //   description: getValues("description"),
    //   answer: "?",
    // });
  };
  return (
    <>
      <Card q={preview} />
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-8 border-4 border-green-700
        p-4">
          <div className="flex items-center gap-4">
            <div className=" font-bold">국면</div>
            <div
              className="flex-grow flex flex-col md:flex-row gap-4 justify-around
          *:border border-black md:*:w-[20%] *:p-2"
            >
              <select {...register("kyokumen")}>
                <option value="동 1">동 1국</option>
                <option value="동 2">동 2국</option>
                <option value="동 3">동 3국</option>
                <option value="동 4">동 4국</option>
                <option value="남 1">남 1국</option>
                <option value="남 2">남 1국</option>
                <option value="남 3">남 1국</option>
                <option value="남 4">남 1국</option>
              </select>

              <select {...register("junme")}>
                <option value={1}>1 순</option>
                <option value={2}>2 순</option>
                <option value={3}>3 순</option>
                <option value={4}>4 순</option>
                <option value={5}>5 순</option>
                <option value={6}>6 순</option>
                <option value={7}>7 순</option>
                <option value={8}>8 순</option>
                <option value={9}>9 순</option>
                <option value={10}>10 순</option>
                <option value={11}>11 순</option>
                <option value={12}>12 순</option>
                <option value={13}>13 순</option>
                <option value={14}>14 순</option>
                <option value={15}>15 순</option>
                <option value={16}>16 순</option>
                <option value={17}>17 순</option>
                <option value={18}>18 순</option>
              </select>

              <select {...register("jikaze")}>
                <option value="동">동가</option>
                <option value="남">남가</option>
                <option value="서">서가</option>
                <option value="북">북가</option>
              </select>
            </div>
          </div>
          <div className="h-32">
            <label>도라</label>
            <input
              {...register("dora", {
                maxLength: 2,
                pattern: /[0-9][mspz]/,
              })}
            />

            <label>손패</label>
            <input
              {...register("tehai", {
                pattern: /([0-9]+[msp]|[1-7]+z)+$/,
                maxLength: 20,
              })}
            />
          </div>

          <div>
            <label>설명</label>
            <textarea {...register("description")} />
          </div>

          <label>답</label>
          <input {...register("answer")}></input>
          <input type="submit"></input>
        </div>
      </form>
      <button onClick={handleClick}>미리보기</button>
    </>
  );
}
