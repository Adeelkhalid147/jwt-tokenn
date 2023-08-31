import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getJWTSecretKey } from "@/lib/auth";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const body = await request.json();
  /* 
    username or password data base mai save hn gy yha se api request jae gey to check
    ho ga k username or password h verify b ho ga
    */
  if (body.username === "admin" && body.password === "admin") {
    const jwt = await new SignJWT({
      username: body.username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1m") // expore time of token
      .sign(new TextEncoder().encode(getJWTSecretKey()));
    // cookies yha pe jet k variable k data ko save kr le ga
    cookies().set("user-token", jwt, {
      httpOnly: true,
    });

    return NextResponse.json({ accessToken: jwt }, { status: 200 });
  }
  return NextResponse.json(
    { Error: "Failed to create Token" },
    { status: 400 }
  );
};
