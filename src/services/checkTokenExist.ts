import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function CheckTokenExist(){
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
  
    if (!token) {
      redirect("auth/login");
    }
}