import { apiAxios } from "@/lib/apiAxios";
 

export async function loginUser(body: any){
    const res = await apiAxios.post('User/login', body);

    return res.data;
}