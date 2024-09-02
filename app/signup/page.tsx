'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import InputError from "@/components/Error/inputError";
interface UserInput {
  id: string,
  pw: string,
  name: string,
  pwcheck: string
}
export default function SingUp(){

  const {handleSubmit, register, getValues ,formState: {errors}} = useForm<UserInput>({mode: 'onBlur'});
  const router = useRouter();
  const [dup, setDup] = useState<{id: boolean, name: boolean}>({id: false, name: false});

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('/api/user', {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        password: data.pw,
        name: data.name,
      }),
      headers: {
        'Content-Type': 'aplication/JSON',
      }
    }).then(res => res.json());

    if(res.ok) router.replace('/');
    else{
      setDup({
        id: res.id,
        name: res.name,
      })
    }
  })
  return (
    <div className="border-4 border-green-700 m-auto">
      <form onSubmit={onSubmit} className="py-4">
        <div className="m-auto flex flex-col w-1/2 gap-4 *-[div]:*-[input]:w-full">
          <h1 className=" font-bold text-center text-2xl">회원가입</h1>

          <div>
            <label>{"ID * (영문자 숫자조합 4~12자)"}</label>
            <input
              {...register("id", {
                required: { value: true, message: "ID를 입력해주세요." },
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: "영문자와 숫자만 사용가능합니다",
                },
                minLength: { value: 4, message: "4 ~ 12자로 입력해주세요." },
                maxLength: { value: 12, message: "4 ~ 12자로 입력해주세요." },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="id"
              render={({ message }) => <InputError>{message}</InputError>}
            />
            {dup.id && <InputError>이미 존재하는 ID입니다</InputError>}
          </div>

          <div>
            <label>PW *</label>
            <input
              type="password"
              {...register("pw", {
                required: { value: true, message: "PW를 입력해주세요." },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="pw"
              render={({ message }) => <InputError>{message}</InputError>}
            />
          </div>
          <div>
            <label>PW확인 *</label>
            <input
              type="password"
              {...register("pwcheck", {
                required: {
                  value: true,
                  message: "PW를 한번 더 입력해주세요.",
                },
                validate: {
                  isCorrect: (v) =>
                    getValues("pw") === v || "PW가 일치하지 않습니다.",
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="pwcheck"
              render={({ message }) => <InputError>{message}</InputError>}
            />
          </div>
          <div>
            <label>닉네임 *</label>
            <input
              {...register("name", {
                required: true,
              })}
            ></input>
            {dup.name && <InputError>이미 존재하는 닉네임입니다</InputError>}
          </div>

          <button className="submit w-fit m-auto" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}