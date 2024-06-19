"use client";

import Answer from "@/components/Answer/answer";
import Card from "@/components/Card/card";
import InputError from "@/components/Error/inputError";
import Tiptap from "@/components/TextEditor/texteditor";
import { Hai, Kaze, Question } from "@/lib/types";
import { ErrorMessage } from "@hookform/error-message";
import { Editor } from "@tiptap/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  kyokumen: string;
  junme: number;
  jikaze: Kaze;
  tehai: string;
  dora: string;
  description: string;
  answer: string;
  sol: string;
}

const emptyQ: Question = {
  id: 0,
  name: "ㅇㅇ",
  tehai: Array<Hai>(13).fill("?"),
  tsumo: "?",
  kyokumen: "동 1",
  junme: 1,
  jikaze: "동",
  dora: "?",
  description: "특별한 조건 없음",
  answer: "?",
  sol: "",
};
function string2Hai(tehai: string): [Hai[], Hai] {
  const Tehai: Hai[] = Array<Hai>(14).fill("?");

  const stack: string[] = [];
  let idx = 0;
  for (let i = 0; i < tehai.length; i++) {
    if (tehai.charAt(i) >= "0" && tehai.charAt(i) <= "9")
      if (tehai.charAt(i) == "0") stack.push("51");
      else stack.push(tehai.charAt(i));
    else {
      const C = tehai.charAt(i).toUpperCase();
      while (stack.length > 0) {
        Tehai[idx++] = (C + stack.shift()!) as Hai;
      }
    }
  }
  console.log(Tehai);
  return [
    Tehai.slice(0, 13).sort((a, b) => {
      if (a === "?") return 1;
      else if (b === "?") return -1;
      else return a <= b ? -1 : 1;
    }),
    Tehai[13],
  ];
}

export default function NNKREditor() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const { data: session } = useSession();
  if (session && session.user?.name) emptyQ.name = session.user.name;
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(preview),
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.user.accessToken!,
      },
    });
    if(res.ok){
      const newId = await res.json();
      // router.push('/');
      router.push(`/questions/${newId}`);
    }
    else {
      console.log(await res.json());
    }
  });

  const [preview, setPreview] = useState<Question>(emptyQ);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          className="flex flex-col border-4 border-green-700
        px-4 *:my-4"
        >
          <div className="flex items-center gap-4">
            <label className="font-bold min-w-[20%] text-center">국면 *(필수)</label>
            <div
              className="flex-grow flex flex-col gap-4
              md:flex-row"
            >
              <select
                {...register("kyokumen")}
                onChange={(e) =>
                  setPreview((p) => ({ ...p, kyokumen: e.target.value }))
                }
              >
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

              <select
                {...register("junme")}
                onChange={(e) =>
                  setPreview((p) => ({ ...p, junme: +e.target.value }))
                }
              >
                {Array(18)
                  .fill(null)
                  .map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1} 순
                    </option>
                  ))}
              </select>

              <select
                {...register("jikaze")}
                onChange={(e) =>
                  setPreview((p) => ({ ...p, jikaze: e.target.value as Kaze }))
                }
              >
                <option value="동">동가</option>
                <option value="남">남가</option>
                <option value="서">서가</option>
                <option value="북">북가</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <label className="font-bold min-w-[20%] text-center">도라 *</label>
              <input
                className="w-20"
                {...register("dora", {
                  required: { value: true, message: "도라를 입력해주세요." },
                  pattern: {
                    value: /^([0-9][msp]|[1-7]z)$/,
                    message: "올바른 패 형식이 아닙니다.",
                  },
                  onBlur() {
                    if (/^([0-9][msp]|[1-7]z)$/.test(getValues("dora"))) {
                      console.log("dora");
                      const Dora = getValues("dora");
                      setPreview((p) => ({
                        ...p,
                        dora: (Dora.charAt(1).toUpperCase() +
                          Dora.charAt(0)) as Hai,
                      }));
                    } else setPreview((p) => ({ ...p, dora: "?" }));
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="dora"
                render={({ message }) => <InputError>{message}</InputError>}
              />
            </div>
            <div className="flex flex-row gap-4 items-center">
              <label className="font-bold min-w-[20%] text-center">손패 *</label>
              <input
                className=" w-52"
                {...register("tehai", {
                  required: { value: true, message: "손패를 입력해주세요." },
                  pattern: {
                    value: /^([0-9]+[msp]|[1-7]+z)+$/,
                    message: "올바른 패 형식이 아닙니다.",
                  },

                  onBlur() {
                    if (/^([0-9]+[msp]|[1-7]+z)+$/.test(getValues("tehai"))) {
                      console.log("tehai");
                      const [Tehai, Tsumo] = string2Hai(getValues("tehai"));
                      setPreview((p) => ({ ...p, tehai: Tehai, tsumo: Tsumo }));
                    } else
                      setPreview((p) => ({
                        ...p,
                        tehai: Array(13).fill("?"),
                        tsumo: "?",
                      }));
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name="tehai"
                render={({ message }) => <InputError>{message}</InputError>}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">조건</label>
              <Tiptap init="특별한 조건 없음"
                update={(e: Editor) => {
                  setPreview((p) => ({
                    ...p,
                    description: e.getText(),
                  }));
                }}
              />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">답</label>
            <input
              className="w-20"
              {...register("answer", {
                pattern: {
                  value: /^([0-9][msp]|[1-7]z)$/,
                  message: "올바른 패 형식이 아닙니다.",
                },

                onBlur() {
                  if (/^([0-9][msp]|[1-7]z)$/.test(getValues("answer"))) {
                    console.log("answer");
                    const Answer = getValues("answer");
                    setPreview((p) => ({
                      ...p,
                      answer: (Answer.charAt(1).toUpperCase() +
                        Answer.charAt(0)) as Hai,
                    }));
                  } else setPreview((p) => ({ ...p, answer: "?" }));
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="answer"
              render={({ message }) => <InputError>{message}</InputError>}
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <label className="font-bold min-w-[20%] text-center">해설</label>
            <Tiptap
              update={(e: Editor) => {
                setPreview((p) => ({
                  ...p,
                  sol: e.getText(),
                }));
              }}
            />
          </div>
          <button
            type="submit"
            className="border-green-700 border-2 w-1/4 self-center px-4 py-2 hover:bg-gray-100"
          >
            등록하기
          </button>
        </div>
      </form>
      <Card q={preview}>
        <Answer answer={preview.answer} sol={preview.sol} />
      </Card>
    </>
  );
}
