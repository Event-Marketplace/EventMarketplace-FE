"use client";

import { apiAxios } from "@/lib/apiAxios";
import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import ListWrapper from "../../../../components/ui/list/ListWrapper";
import EventFilters from "./EventFilters";
import { title } from "process";
import InfoModalEM from "../../../../components/ui/modals/InfoModalEM";
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

export interface EventFiltersProps {
  title?: string;
  startDate?: string;
  endDate?: string;
  startPrice?: number | "";
  endPrice?: number | "";
  pageNumber?: number | "";
}

export interface EventResponse {
  events: Event[];
  totalCount: number;
}

const EventList = ({ events, totalCount }: EventResponse) => {
  const [eventList, setEventList] = useState<Event[]>(events);
  const [totalItems, setTotalItems] = useState<number>(totalCount);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<EventFiltersProps>();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleChangePage = async (newPage: number) => {
    setPage(newPage);

    try {
      const response = await apiAxios.get("Event", {
        params: {
          pageNumber: newPage,
          title: filters?.title || "",
          startDate: filters?.startDate || "",
          endDate: filters?.endDate || "",
          startPrice: filters?.startPrice || "",
          endPrice: filters?.endPrice || "",
        },
      });

      setEventList(response.data.events);
      setTotalItems(response.data.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = async (newFilters: EventFiltersProps) => {
    setFilters((prev) => ({ ...newFilters }));
    try {
      const response = await apiAxios.get(`Event`, {
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
      setEventList(response.data.events);
      setTotalItems(response.data.totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = (event: Event) => {
    setOpen(true);
    setSelectedEvent(event);
  };

  return (
    <>
      <h1 className="text-4xl font-sans font-medium italic leading-relaxed text-center mb-3">
        Lista nadchodzących wydarzeń
      </h1>
      <ListWrapper
        data={{
          items: eventList,
          totalCount: totalItems,
          totalPages: Math.ceil(totalItems / 9),
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
          {eventList.map((event) => (
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
};

export default EventList;
