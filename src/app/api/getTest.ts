import { apiAxiosClient } from "@/lib/apiAxiosClient";

export async function getTest(){
    const response = await apiAxiosClient.get("TestCommunication");
    return response;
}