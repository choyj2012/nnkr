import Link
 from "next/link";
import LoginState from "./loginState";
import Search from "../Search/search";
export default function Header() {
  return (
    <header className="mb-4">
      <div className="w-full h-40 flex justify-center items-center">
        <Link href={"/"}>
          <div className="text-[4rem] font-bold cursor-pointer">NNKR</div>
        </Link>
      </div>
      <div
        className="flex flex-row-reverse gap-4
        *:font-semibold *:underline *:underline-offset-4"
      >
        <Link href={"/questions/add"}>NNKR 등록</Link>
        <LoginState />
      </div>
      {/* <div
        className="flex flex-row flex-nowrap overflow-x-auto justify-around
      *:p-1 *:cursor-pointer *:font-semibold *:min-w-fit *:underline *:underline-offset-2 *:mx-2
      scrollbar-hide bg-gray-100 py-2
      "
      >
        <div>새로운 문제</div>
        <div>기본</div>
        <div>손역</div>
        <div>슌쯔패</div>
        <div>또이쯔패</div>
        <div>삼색</div>
        <div>혼일</div>
        <div>도라</div>
        <div>아카도라</div>
      </div> */}
    </header>
  );
}