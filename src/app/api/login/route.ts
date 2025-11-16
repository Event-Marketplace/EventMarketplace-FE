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
  } catch (error: unknown) {
    let message = "Nieprawidłowy login lub hasło";

    if (error instanceof Error) {
      message = error.message;
      console.error("Błąd logowania:", message);
    } else {
      console.error("Nieznany błąd logowania:", error);
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
