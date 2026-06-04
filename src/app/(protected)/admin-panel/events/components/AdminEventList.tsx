"use client";

import CardWrapper from "@/components/ui/list/CardWrapper";
import ListWrapper from "@/components/ui/list/ListWrapper";
import { apiAxios } from "@/lib/apiAxios";
import { FormEvent, useEffect, useState } from "react";
import calendarIcon from "@/images/calendar.svg";
import { Tabs } from "./EventTabs";
import InfoModalEM from "@/components/ui/modals/InfoModalEM";
import AdminEventCard from "./AdminEventCard";
import { useSignalR } from "@/lib/signalR/SignalRProvider";
import { HubConnectionState } from "@microsoft/signalr";

export interface EventStatusType {
  statusIndex: number;
  statusName: string;
  statusDisplayName: string;
}

export interface EventComment {
  id: string;
  content: string;
  user: string;
  createdAt: string;
  eventId: string;
  userId: string;
  wasRead: boolean;
}

export interface AdminEvent {
  id: string;
  title: string;
  description: string;
  duration: string;
  start: string;
  end: string;
  imageUrl: string;
  address: string | null;
  eventStatus: EventStatusType;
  fullName: string;
  email: string;
  phone: string;
  comments: EventComment[];
  rejectionReason: string | null;
}

export interface AdminEventListType {
  eventList: AdminEvent[];
  totalCount: number;
}

export type AdminEventListProps = {
  tab: Tabs;
  handleCount?: (count: number) => void;
};

const AdminEventList = ({ tab, handleCount }: AdminEventListProps) => {
  const [events, setEvents] = useState<AdminEventListType>();
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);
  const [activeImageUrl, setActiveImageUrl] = useState<string>();
  const [openDescModal, setOpenDescModal] = useState<boolean>(false);
  const [activeDesc, setActiveDesc] = useState<string>();

  const handlePage = () => {};
  const data = {
    currentPage: 1,
    items: [1, 2, 3, 4],
    totalCount: 10,
    totalPages: 1,
  };

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

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageModal = (imageUrl: string) => {
    setOpenImageModal(true);
    setActiveImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleOpenDescModal = (content: string) => {
    setOpenDescModal(true);
    setActiveDesc(content);
  };

  const handleCloseDescModal = () => {
    setOpenDescModal(false);
  };

  return (
    <ListWrapper
      data={data}
      onPageChange={handlePage}
      titleSection="Wydarzenia - Panel Administratora"
      titleIcon={calendarIcon.src}
    >
      {events?.eventList.map((item, index) => (
        <CardWrapper key={index}>
          <AdminEventCard
            event={item}
            tab={tab}
            handleImageModal={handleImageModal}
            handleOpenDescModal={handleOpenDescModal}
            onSuccess={fetchEvents}
          />
        </CardWrapper>
      ))}
      <InfoModalEM onCancel={handleCloseModal} setOpen={openImageModal}>
        <div className="max-h-[500px]  overflow-hidden object-cover">
          <img src={activeImageUrl} />
        </div>
      </InfoModalEM>

      <InfoModalEM onCancel={handleCloseDescModal} setOpen={openDescModal}>
        <div className="max-h-[500px]  overflow-hidden object-cover">
          <span>{activeDesc}</span>
        </div>
      </InfoModalEM>
    </ListWrapper>
  );
};

export default AdminEventList;
