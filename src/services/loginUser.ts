import { apiAxiosClient } from "@/lib/apiAxios";


export async function loginUser(body: any){
    const res = await apiAxiosClient.post('User/login', body);

    return res.data;
}