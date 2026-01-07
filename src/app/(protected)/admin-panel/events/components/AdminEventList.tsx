"use client";

import CardWrapper from "@/components/ui/list/CardWrapper";
import ListWrapper from "@/components/ui/list/ListWrapper";
import { apiAxios } from "@/lib/apiAxios";
import { useEffect, useState } from "react";
import calendarIcon from "@/images/calendar.svg";
import circleInfoIcon from "@/images/circle-info.svg";
import circleCheck from "@/images/circle-check.svg";
import circleX from "@/images/circle-x.svg";
import commentIcon from "@/images/comment.svg";
import increaseSizeIcon from "@/images/Increase-size.svg";
import { Tabs } from "./EventTabs";
import Image from "next/image";
import BasicTooltip from "@/components/ui/tooltips/BasicTooltip";
import { statusVariantMap } from "@/lib/const";
import { Badge } from "@/components/ui/badge";
import { EventStatus } from "@/types/types";
import InfoModalEM from "@/components/ui/modals/InfoModalEM";

interface EventStatusType {
  statusIndex: number;
  statusName: string;
  statusDisplayName: string;
}

interface AdminEvent {
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
          <div className="w-1/12 flex flex-col">
            <img
              key={index}
              className="w-[90] h-[60] hover:cursor-pointer"
              src={item.imageUrl}
              alt="picture"
              onClick={() => {
                handleImageModal(item.imageUrl);
              }}
            />
          </div>
          <div className="w-1/6 flex flex-col">
            <BasicTooltip text={item.title}>
              <label className="text-gray-500 flex gap-2 font-semibold">
                Tytuł
              </label>
            </BasicTooltip>
            <span className="truncate"> {item.title}</span>
          </div>
          <div className="w-1/4 flex flex-col">
            <label className="text-gray-500 flex gap-2">
              Opis
              <Image
                className="hover:cursor-pointer"
                src={increaseSizeIcon}
                width={23}
                alt="open-description"
                onClick={() => {
                  handleOpenDescModal(item.description);
                }}
              />
            </label>

            <span className="truncate">{item.description}</span>
          </div>
          <div className="w-1/9 flex flex-col">
            <label className="text-gray-500 flex gap-2">
              Czas trwania
              <BasicTooltip
                width="200"
                text={`Start: ${item.start}, Koniec: ${item.end}`}
              >
                <Image src={circleInfoIcon} width={22} alt="info" />
              </BasicTooltip>
            </label>
            <span> {item.duration}</span>
          </div>
          <div className="w-1/7 flex flex-col">
            <label className="text-gray-500">Status</label>
            <Badge
              className="mr-auto"
              variant={
                statusVariantMap[item.eventStatus.statusName as EventStatus]
              }
            >
              {item.eventStatus.statusDisplayName}
            </Badge>
          </div>
          <div className="w-1/8 flex flex-col">
            <label className="text-gray-500 flex gap-2">
              Organizator
              <BasicTooltip
                width="200"
                text={`E-mail: ${item.email}, Telefon: ${item.phone}`}
              >
                <Image src={circleInfoIcon} width={22} alt="info" />
              </BasicTooltip>
            </label>
            <span> {item.fullName}</span>
          </div>
          {tab === Tabs.Pending && (
            <div className="w-1/21 flex my-auto">
              <Image
                className="hover:cursor-pointer"
                src={circleCheck}
                width={28}
                alt="approve-icon"
              />
              <Image
                className="hover:cursor-pointer"
                src={circleX}
                width={28}
                alt="reject-icon"
              />
              <Image
                className="hover:cursor-pointer"
                src={commentIcon}
                width={28}
                alt="add-comment-icon"
              />
            </div>
          )}
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
