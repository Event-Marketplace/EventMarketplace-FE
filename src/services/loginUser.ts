import { apiAxios } from "@/lib/apiAxios";

type LoginProps = {
    email:string;
    password: string;
}

export async function loginUser(body: LoginProps){
    const res = await apiAxios.post('User/login', body);

    return res.data;
}