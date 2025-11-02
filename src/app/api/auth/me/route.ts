import { getUserFromToken } from "@/services/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookieHeader = req.headers.get('cookie');

    if(!cookieHeader || !cookieHeader.includes("access_token")){
        return NextResponse.json({message: "Unauthorized"}, {status:401});
    }

    const user = await getUserFromToken(cookieHeader);
    if(!user){
        return NextResponse.json({message: "Unauthorized"}, {status:401});
    }
    return NextResponse.json(user);
}