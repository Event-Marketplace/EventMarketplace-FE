"use client";

import OgranizerEventListFilter from "./Filter";
import OrganizerEventListHeader from "./Header";
import { useEffect, useState } from "react";
import { Event } from "@/lib/interfaces";
import { apiAxios } from "@/lib/apiAxios";
import OrganizerEventCard from "./Card";

const OrganizerEventList = () => {
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiAxios.get("Event/organizer");
        setEvents(res.data.events);
        setTotalItems(res.data.totalCount);
        console.log("res", res);
      } catch {
        console.log("error");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <OrganizerEventListHeader />
      <OgranizerEventListFilter />

      <div className="flex flex-col gap-2">
        {events?.map((event) => (
          <OrganizerEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default OrganizerEventList;
