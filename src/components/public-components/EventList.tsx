"use client";

import { apiAxiosClient } from "@/lib/apiAxiosClient";
import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import ListWrapper from "../ui/list/ListWrapper";
import EventFilters from "./EventFilters";
import { title } from "process";
import InfoModalEM from "../ui/modals/InfoModalEM";
import Image from "next/image";
import { EventModalInfo } from "./EventModalInfo";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  availableTickets: number;
  createdAt: string;
  description: string;
  price: number;
}

interface EventResponse {
  events: Event[];
  totalCount: number;
}

const EventList = () => {
  const [eventList, setEventList] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startPrice: 0,
    endPrice: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAxiosClient.get(`Event?pageNumber=${page}`);
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

  const handleFilter = async (newFilters: any) => {
    setFilters((prev) => ({ ...newFilters }));
    try {
      const response = await apiAxiosClient.get(`Event`, {
        params: {
          pageNumber: 1,
          title: newFilters.title || "",
          startDate: newFilters.startDate || "",
          endDate: newFilters.endDate || "",
          startPrice: newFilters.startPrice || "",
          endPrice: newFilters.endPrice || "",
        },
      });
      setPage(1);
      setEventList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = (event: Event) => {
    setOpen(true);
    setSelectedEvent(event);
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
          filters={
            <EventFilters
              onChange={handleFilter}
              onClear={() =>
                handleFilter({
                  title: "",
                  startDate: "",
                  endDate: "",
                  startPrice: "",
                  endPrice: "",
                })
              }
            />
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {eventList.events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpenModal={() => handleOpenModal(event)}
              />
            ))}
          </div>
        </ListWrapper>
        <EventModalInfo
          event={selectedEvent}
          onClose={handleCloseModal}
          open={open}
        />
      </>
    );
  }
};

export default EventList;
