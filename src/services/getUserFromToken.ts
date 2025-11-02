 
import * as jose from 'jose';
import { cookies } from 'next/headers';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }

  function parseCookies(cookieHeader?: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    if (!cookieHeader) return cookies;
  
    cookieHeader.split(";").forEach((cookie) => {
      const [name, ...rest] = cookie.split("=");
      cookies[name.trim()] = rest.join("="); // pozwala zachować kropki w JWT
    });
  
    return cookies;
  }
  

export async function getUserFromToken(cookieHeader?:string): Promise<User | null> {
    const cookies = parseCookies(cookieHeader);
    const token = cookies["access_token"];

    if(!token){
        return null;
    }

  try {
    const secret = process.env.JWT_KEY;
    if (!secret) {
      return null;
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const user: User = {
      id: payload.sub as string,
      email: payload.email as string,
      role: (payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
             payload.role) as string,
    };

    return user;
  } catch (err) {
    return null;
  }
}
