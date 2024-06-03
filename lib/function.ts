import { Hai } from "./types";

export function hai2String(hai: Hai): string {
  const kaze = ['동', '남', '서', '북', '백', '발', '중'];
  let a = "";
  let b = "";
  let c = "";
  if(hai === 'M51' || hai === 'S51' || hai === 'P51')
    a = '적'
  
  if(hai.charAt(0) === 'M') c = '만';
  if(hai.charAt(0) === 'P') c = '통';
  if(hai.charAt(0) === 'S') c = '삭';

  if(hai.charAt(0) === 'z') return kaze[+hai.charAt(0) - 1];

  return a + hai.charAt(1) + c;
}

export function date2String(_date: string): string {
  const date = new Date(_date);
  const Now = new Date();
  if (Now.toDateString() === date.toDateString())
    return date.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      timeZone: 'Asia/Seoul'
    });
  else
    return date.toLocaleDateString("ko-KR", {
      month: "numeric",
      day: "numeric",
    });
}