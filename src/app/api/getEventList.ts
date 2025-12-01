import { apiAxios } from "@/lib/apiAxios";
import { EventFiltersProps, EventResponse } from "../(public)/events-public/components/EventList";

export default async function getEventList(filterParams : EventFiltersProps){
    try{
        const res = await apiAxios.get("Event",{
            params: {
                ...filterParams
            }
        });

        return res.data as EventResponse;
    
    }catch(err){
        return {
            events: [],
            totalCount: 0
        };
    }
}