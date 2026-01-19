import { EventComment } from "@/app/(protected)/admin-panel/events/components/AdminEventList";
import { Address } from "@/types/Event";

export interface Event{
    id:string;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    price:number;
    availableTickets:number;
    imageUrl:string;
    isActive:boolean;
    createdAt:string;
    organizerId: string;
    organizer:string;
    status: string;
    statusDisplayName: string;
    locationType: string;
    addressResponse: Address | null
    descriptionEventPlace: string;
    comments: EventComment[];
};