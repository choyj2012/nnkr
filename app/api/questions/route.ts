import { Q } from "@/lib/mock"
import { Question } from "@/lib/types";

export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id === null) return Response.json(Q);
  for (const q of Q) {
    if (q.id === id) return Response.json(q);
  }
  return Response.json(Q[0]);
}
