"use client";

import OgranizerEventListFilter from "./Filter";
import OrganizerEventListHeader from "./Header";
import { useEffect, useState } from "react";
import { Event } from "@/lib/interfaces";
import { apiAxios } from "@/lib/apiAxios";
import OrganizerEventCard from "./Card";
import ListWrapper from "@/components/ui/list/ListWrapper";
import { EventStatusBE } from "@/types/types";
import SideModalEM from "@/components/ui/modals/SideModalEM";
import EditModal from "./EditEventModal";
import EditEventModal from "./EditEventModal";

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
  const [statusOptions, setStatusOptions] = useState<[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const res = await apiAxios.get("Event/organizer", {
        params: {
          pageNumber: page,
        },
      });

      console.log("events from be", res.data.events);
      setEvents(res.data.events);
      setTotalItems(res.data.totalCount);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const res = await apiAxios.get("Event/status-options");
        setStatusOptions(res.data.result);
      } catch {
        console.log("error");
      }
    };
    fetchStatusOptions();
  }, []);

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

  const handleDelete = async (id: string) => {
    try {
      await apiAxios.delete(`Event/{${id}}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenSideModal = (event: Event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleSubmitEvent = async (eventId: string) => {
    try {
      await apiAxios.put(`Event/submit-event/${eventId}`);
      fetchEvents();
    } catch (e) {
      console.log(e);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[1920px] mx-auto">
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
            options={statusOptions}
          />
        }
        visibleTotalCount={true}
      >
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            {events?.map((event) => (
              <OrganizerEventCard
                key={event.id}
                event={event}
                onDelete={() => handleDelete(event.id)}
                onOpenSideModal={() => handleOpenSideModal(event)}
                onSubmitEvent={() => {
                  handleSubmitEvent(event.id);
                }}
              />
            ))}
          </div>
        </div>
      </ListWrapper>
      <EditEventModal
        onSuccess={fetchEvents}
        event={selectedEvent}
        open={openModal}
        onClose={closeModal}
      />
    </div>
  );
};

export default OrganizerEventList;
