"use client";

import OgranizerEventListFilter from "./Filter";
import OrganizerEventListHeader from "./Header";
import { useEffect, useState } from "react";
import { Event } from "@/lib/interfaces";
import { apiAxios } from "@/lib/apiAxios";
import OrganizerEventCard from "./Card";
import ListWrapper from "@/components/ui/list/ListWrapper";

type FilterProps = {
  title?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};

const OrganizerEventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<FilterProps>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiAxios.get("Event/organizer", {
          params: {
            pageNumber: page,
          },
        });
        setEvents(res.data.events);
        setTotalItems(res.data.totalCount);
        console.log("res", res);
      } catch {
        console.log("error");
      }
    };

    fetchEvents();
  }, [page]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = async (newFilters: FilterProps) => {
    setFilters(newFilters);
    try {
      const res = await apiAxios.get("Event/organizer", {
        params: {
          pageNumber: page,
          title: newFilters.title,
          status: newFilters.status,
          startDate: newFilters.startDate,
          endDate: newFilters.endDate,
        },
      });
      setEvents(res.data.events);
      setTotalItems(res.data.totalCount);
    } catch (err) {
      console.log("err");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <OrganizerEventListHeader />
      <ListWrapper
        data={{
          items: events,
          totalCount: totalItems,
          totalPages: Math.ceil(totalItems / 9),
          currentPage: page,
        }}
        onPageChange={handleChangePage}
        filters={
          <OgranizerEventListFilter
            onChange={handleFilter}
            onClear={() =>
              handleFilter({
                title: "",
                status: undefined,
                startDate: "",
                endDate: "",
              })
            }
          />
        }
        visibleTotalCount={true}
      >
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            {events?.map((event) => (
              <OrganizerEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </ListWrapper>
    </div>
  );
};

export default OrganizerEventList;
