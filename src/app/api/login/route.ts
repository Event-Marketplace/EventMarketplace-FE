import { loginUser } from "@/services/loginUser";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await loginUser(body);
    const token = data.tokenJwt;

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Błąd logowania:", error.message);
    console.error()
    return NextResponse.json(
      { error: "Nieprawidłowy login lub hasło" },
      { status: 400 }
    );
  }
}
