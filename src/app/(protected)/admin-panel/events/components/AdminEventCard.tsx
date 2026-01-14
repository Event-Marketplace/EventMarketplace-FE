"use client";

import BasicTooltip from "@/components/ui/tooltips/BasicTooltip";
import { statusVariantMap } from "@/lib/const";
import { EventStatus } from "@/types/types";
import { Tabs } from "./EventTabs";
import Image from "next/image";
import { AdminEvent } from "./AdminEventList";
import circleInfoIcon from "@/images/circle-info.svg";
import circleCheck from "@/images/circle-check.svg";
import circleX from "@/images/circle-x.svg";
import commentIcon from "@/images/comment.svg";
import increaseSizeIcon from "@/images/Increase-size.svg";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CommentSideModal from "./CommentSideModal";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import { useEventComments } from "../hooks/useEventComments";
import { errors } from "jose";
import { apiAxios } from "@/lib/apiAxios";

type AdminEventCardProps = {
  event: AdminEvent;
  tab: Tabs;
  handleImageModal: (url: string) => void;
  handleOpenDescModal: (content: string) => void;
  onSuccess?: () => void;
};

const AdminEventCard = ({
  event,
  tab,
  handleImageModal,
  handleOpenDescModal,
  onSuccess,
}: AdminEventCardProps) => {
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);

  const userId = useSelector((state: AppState) => state.auth.userId);
  const currentContext = localStorage.getItem("currentContext");

  const { comments, unReadCount, addComment, markAsRead } = useEventComments({
    eventId: event.id,
    initialComments: event.comments,
    userId: userId ?? "",
  });

  const handleOpenCommentModal = async () => {
    setOpenCommentModal(true);
    await markAsRead();
  };

  const handleAddComment = async (content: string) => {
    await addComment(content, currentContext);
  };

  const handleCloseCommentModal = async () => {
    setOpenCommentModal(false);
  };

  const handleApproveEvent = async (eventId: string) => {
    try {
      await apiAxios.put(`Event/approve-event/${eventId}`);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-1/12 flex flex-col">
        <img
          className="w-[90] h-[60] hover:cursor-pointer"
          src={event.imageUrl}
          alt="picture"
          onClick={() => {
            handleImageModal(event.imageUrl);
          }}
        />
      </div>
      <div className="w-1/6 flex flex-col">
        <BasicTooltip text={event.title}>
          <label className="text-gray-500 flex gap-2 font-semibold">
            Tytuł
          </label>
        </BasicTooltip>
        <span className="truncate"> {event.title}</span>
      </div>
      <div className="w-1/5 flex flex-col">
        <label className="text-gray-500 flex gap-2">
          Opis
          <Image
            className="hover:cursor-pointer"
            src={increaseSizeIcon}
            width={23}
            alt="open-description"
            onClick={() => {
              handleOpenDescModal(event.description);
            }}
          />
        </label>

        <span className="truncate">{event.description}</span>
      </div>
      <div className="w-1/9 flex flex-col">
        <label className="text-gray-500 flex gap-2">
          Czas trwania
          <BasicTooltip
            width={400}
            text={`Start: ${event.start}, Koniec: ${event.end}`}
          >
            <Image src={circleInfoIcon} width={22} alt="info" />
          </BasicTooltip>
        </label>
        <span> {event.duration}</span>
      </div>
      <div className="w-1/7 flex flex-col">
        <label className="text-gray-500">Status</label>
        <Badge
          className="mr-auto"
          variant={
            statusVariantMap[event.eventStatus.statusName as EventStatus]
          }
        >
          {event.eventStatus.statusDisplayName}
        </Badge>
      </div>
      <div className="w-1/8 flex flex-col">
        <label className="text-gray-500 flex gap-2">
          Organizator
          <BasicTooltip
            width={250}
            text={`E-mail: ${event.email}, Telefon: ${event.phone}`}
          >
            <Image src={circleInfoIcon} width={22} alt="info" />
          </BasicTooltip>
        </label>
        <span> {event.fullName}</span>
      </div>
      {tab === Tabs.Pending && (
        <div className="w-1/15 flex my-auto flex-grow-1 justify-end">
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
            onClick={() => {
              handleApproveEvent(event.id);
            }}
          />

          <div
            className="relative inline-flex"
            onClick={handleOpenCommentModal}
          >
            <Image
              className="block hover:cursor-pointer"
              src={commentIcon}
              width={28}
              height={28}
              alt="add-comment-icon"
            />
            {unReadCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center font-bold rounded-full shadow-lg">
                {unReadCount > 99 ? "99+" : unReadCount}
              </span>
            )}
          </div>

          <CommentSideModal
            comments={comments}
            open={openCommentModal}
            onClose={handleCloseCommentModal}
            onCreateComment={handleAddComment}
            onSuccess={onSuccess}
            formId="admin-comment-form"
          />
        </div>
      )}
    </>
  );
};

export default AdminEventCard;
