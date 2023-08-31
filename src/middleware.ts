import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("user-token")?.value;
  // destructure kren gy pathname or origin from request.nexturl se
  // pathname mai localhost3000 ae ga or as k elwa b jo page hn gy wo b pathname mai
  // origin hmesha domain name ho ga
  const { pathname, origin } = request.nextUrl;
  console.log("adeel :", token);

  try {
    if (pathname === "/login") {
      if (token) return NextResponse.redirect(`${origin}`);
      return NextResponse.next(); 
    }
    if (!token) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
    // jwtVerify mai value provide krni hai  
    const verifyToken = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );
    console.log("JWT Auth: ", verifyToken);

    // agr token verify ho ga to NextResponse return krna h
    if (verifyToken) {
      return NextResponse.next();
    }
    //agr token ni ho ga to error message show krna h
    return NextResponse.json(
      { error: { Message: "Authentication Request" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
};

// config k variable mai khud define krna h
export const config = {
  matcher: ["/", "/login", "/protected"], // in pages pe middleware chlen ga or b jo mrzi page add ye remove kr skte jin pe middleware chlna ho
};

/* 
1) middleware.ts k file he bnani h or ksi name se ni bnani
2) npm i jose
3) src/lib/auth.ts file bnani h
*/
