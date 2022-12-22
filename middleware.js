// middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

  const jwt = request.cookies.get("crmToken");

  if (!jwt) return NextResponse.redirect(new URL("/users/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
    return NextResponse.next();
  } catch (error) {   
    return NextResponse.redirect(new URL("/users/login", request.url));
  }

}

export const config = {
  matcher: ["/"],
};
