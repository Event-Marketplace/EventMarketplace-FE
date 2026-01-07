"use client";

import CardWrapper from "@/components/ui/list/CardWrapper";
import ListWrapper from "@/components/ui/list/ListWrapper";
import { apiAxios } from "@/lib/apiAxios";
import { useEffect, useState } from "react";
import calendarIcon from "@/images/calendar.svg";
import { Tabs } from "./EventTabs";

interface EventStatus {
  statusIndex: number;
  statusName: string;
  statusDisplayName: string;
}

interface AdminEvent {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  address: string | null;
  eventStatus: EventStatus;
  fullName: string;
  email: string;
  phone: string;
}

interface AdminEventListType {
  eventList: AdminEvent[];
  totalCount: number;
}

type AdminEventListProps = {
  tab: Tabs;
  handleCount?: (count: number) => void;
};

const AdminEventList = ({ tab, handleCount }: AdminEventListProps) => {
  const [events, setEvents] = useState<AdminEventListType>();

  const handlePage = () => {};
  const data = {
    currentPage: 1,
    items: [1, 2, 3, 4],
    totalCount: 10,
    totalPages: 1,
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await apiAxios.get("Event/admin", {
        params: {
          Tab: tab,
        },
      });
      setEvents(res.data);
      if (handleCount) {
        handleCount(res.data.eventList.length);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ListWrapper
      data={data}
      onPageChange={handlePage}
      titleSection="Wydarzenia"
      titleIcon={calendarIcon.src}
    >
      {events?.eventList.map((item, index) => (
        <CardWrapper key={index}>
          <div className="w-1/4 flex flex-col">
            <label className="text-gray-500">Tytuł</label>
            <span> {item.title}</span>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="text-gray-500">Opis</label>
            <span className="truncate"> {item.description}</span>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="text-gray-500">Czas trwania</label>
            <span> {item.duration}</span>
          </div>
          <div className="w-1/6 flex flex-col">
            <label className="text-gray-500">Status</label>
            <span> {item.eventStatus.statusDisplayName}</span>
          </div>
        </CardWrapper>
      ))}
    </ListWrapper>
  );
};

export default AdminEventList;
