import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

interface User {
  name: string,
  id: string,
  password: string,
}

export async function POST(req: Request) {
  const body: User = await req.json();
  
  const client = await clientPromise;
  const db = client.db('nnkr');
  
  const dupName = await db.collection<User>('user').findOne({name: body.name});
  const dupId = await db.collection<User>('user').findOne({id: body.id});
  
  const dup = {
    ok: false,
    name: dupName ? true : false,
    id: dupId ? true : false,
  }

  if(dupName || dupId) return new NextResponse(JSON.stringify(dup));

  const res = await db.collection<User>('user').insertOne({
    ...body,
    password: await bcrypt.hash(body.password, 10),
  })
  return new NextResponse(JSON.stringify({ok: true, id: body.id, name: body.name}));
}