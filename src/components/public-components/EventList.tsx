"use client";

import { apiAxiosClient } from "@/lib/apiAxiosClient";
import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import ListWrapper from "../ui/ListWrapper";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

interface EventResponse {
  events: Event[];
  totalCount: number;
}

const EventList = () => {
  const [eventList, setEventList] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await apiAxiosClient.get(`Event?pageNumber=${page}`);
        console.log("res", response.data);
        setEventList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  //   async function fetchEvents() {
  //     try {
  //       const res = await fetch("https://twoj-backend-url/api/events")
  //       const data = await res.json()
  //       setEvents(data)
  //     } catch (error) {
  //       console.error("Błąd pobierania wydarzeń:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  if (loading)
    return <p className="text-center py-10">Ładowanie wydarzeń...</p>;

  if (eventList) {
    return (
      <>
        <h1 className="text-4xl font-sans font-medium italic leading-relaxed text-center mb-3">
          Lista nadchodzących wydarzeń
        </h1>
        <ListWrapper
          data={{
            items: eventList.events,
            totalCount: eventList.totalCount,
            totalPages: Math.ceil(eventList.totalCount / 9),
            currentPage: page,
          }}
          onPageChange={handleChangePage}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {eventList.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ListWrapper>
      </>
    );
  }
};

export default EventList;
