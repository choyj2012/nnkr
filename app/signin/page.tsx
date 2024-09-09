'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

interface IdPw {
  id: string,
  pw: string,
}

export default function SigninPage() {

  const {handleSubmit, register} = useForm<IdPw>();
  const router = useRouter();
  const [err, setErr] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setErr(false);
    const result = await signIn("credentials", {
      username: data.id,
      password: data.pw,
      redirect: true,
      callbackUrl: '/',
    });
    console.log(result);
    if(result?.error) setErr(true);
    // if (result?.ok) router.push("/");
    // else setErr(true);
  });
  
  return (
    <div onSubmit={onSubmit} className="border-4 border-green-700 m-auto">
      <form className="py-4">
        <div className="m-auto flex flex-col w-1/2 gap-4 *-[div]:m-auto">
          <h1 className=" font-bold text-center text-2xl mb-4">로그인</h1>

          <div>
            <label>ID</label>
            <input {...register('id')} className="w-full"></input>
          </div>

          <div>
            <label>PW</label>
            <input type="password" {...register('pw')} className="w-full"></input>
          </div>

          {err && <p>ID또는 패스워드를 확인해주세요</p>}
          <button className="submit" type="submit">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}