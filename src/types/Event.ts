export interface EventModel {
    title:string;
    description:string;
    price:string;
    availableTicketsCount: string;
    startDateTime:string;
    endDateTime:string
    descriptionEventPlace: string;
    locationType: string;
    address: Address | undefined | null,
}

export interface Address {
    city: string;
    number:string;
    postalCode: string;
    street: string
}