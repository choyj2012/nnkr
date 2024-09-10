import { Question } from "@/lib/types";
import Card from "../Card/card";

const mockQ: Question = {
  id: 0,
  name: "",
  tehai: Array(13).fill('?'),
  tsumo: "?",
  kyokumen: "",
  junme: 0,
  jikaze: "동",
  dora: "?",
  description: "",
  answer: "?",
  sol: ""
}
export default function Skeleton(){

  return (
    <>
      {Array(10).fill(null).map((_, i) => <Card key={i} q={mockQ}/>)}
    </>
  );
}