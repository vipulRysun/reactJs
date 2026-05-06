import { NextResponse } from "next/server";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "Passw0rd!";
const SESSION_VALUE = "authenticated";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("session", SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
