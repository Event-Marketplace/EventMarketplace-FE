import { apiAxiosClient } from "./apiAxios";

export interface EventResponse {
    events: Event[];
    totalCount: number;
  }
  
  export async function getEvents(page: number = 1): Promise<Event[]> {
    try {
      const response = await apiAxiosClient.get(`Event?pageNumber=${page}`);
      return response.data;
    } catch (error) {
      console.error("Błąd fetchowania eventów:", error);
      return [];
    }
  }