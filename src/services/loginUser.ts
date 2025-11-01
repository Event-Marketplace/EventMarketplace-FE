import { apiAxiosClient } from "@/lib/apiAxiosClient";


export async function loginUser(body: any){
    const res = await apiAxiosClient.post('User/login', body);

    return res.data;
}