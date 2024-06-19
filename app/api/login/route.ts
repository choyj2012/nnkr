import { signJwtAccessToken } from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import { use } from "react";

interface LoginBody {
  id: string,
  password: string,
}

export async function POST(req:Request) {
  const body: LoginBody = await req.json();
  const client = await clientPromise;
  const db = client.db('nnkr');
 
  const res = await db.collection('user').findOne({id: body.id});

  if(res && (await bcrypt.compare(body.password, res.password))) {
    const { password, ...userWithoutPw } = res;

    const accessToken = signJwtAccessToken(userWithoutPw);
    const result = {
      ...userWithoutPw,
      accessToken,
    };

    return new NextResponse(JSON.stringify(result));
  }
  else return new NextResponse(JSON.stringify(null));
}