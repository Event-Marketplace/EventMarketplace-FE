"use client";

import BasicTooltip from "@/components/ui/tooltips/BasicTooltip";
import { statusVariantMap } from "@/lib/const";
import { EventStatus } from "@/types/types";
import { Tabs } from "./EventTabs";
import Image from "next/image";
import { AdminEvent, EventComment } from "./AdminEventList";
import circleInfoIcon from "@/images/circle-info.svg";
import circleCheck from "@/images/circle-check.svg";
import circleX from "@/images/circle-x.svg";
import commentIcon from "@/images/comment.svg";
import increaseSizeIcon from "@/images/Increase-size.svg";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import CommentSideModal from "./CommentSideModal";
import { useSignalR } from "@/lib/signalR/SignalRProvider";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

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
  const conn = useSignalR();
  const [comments, setComments] = useState<EventComment[]>(
    event.comments || []
  );
  const userId = useSelector((state: AppState) => state.auth.userId);
  const currentContext = localStorage.getItem("currentContext");
  const unReadCount = comments.filter(
    (c) => !c.wasRead && c.userId !== userId
  ).length;

  useEffect(() => {
    if (!conn || conn.state !== "Connected") return;

    conn.invoke("JoinEventGroup", event.id);

    return () => {
      conn.invoke("LeaveEventGroup", event.id);
    };
  }, [conn, event.id]);

  //Oczekuj nowego komentarza!
  useEffect(() => {
    if (!conn) return;

    const onReceiveComment = (eventId: string, comment: EventComment) => {
      if (eventId !== event.id) return;

      const updatedComment =
        comment.userId === userId ? comment : { ...comment, wasRead: false };
      setComments((prev) => [...prev, updatedComment]);
    };

    conn.on("ReceiveComment", onReceiveComment);

    return () => conn.off("ReceiveComment", onReceiveComment);
  }, [conn, event.id]);

  //Oczekuj odczytania komentarzy!
  useEffect(() => {
    if (!conn) return;

    const onCommentsRead = (eventId: string) => {
      if (eventId !== event.id) return;
      setComments((prev) => prev.map((c) => ({ ...c, wasRead: true })));
    };

    conn.on("CommentsRead", onCommentsRead);
    return () => conn.off("CommentsRead", onCommentsRead);
  }, [conn, event.id]);

  const handleAddComment = async (content: string) => {
    if (!conn) return;
    await conn.invoke("AddComment", event.id, content, currentContext);
  };

  const handleOpenCommentModal = async () => {
    setOpenCommentModal(true);
    await conn?.invoke("ReadComments", event.id);
  };

  const handleCloseCommentModal = async () => {
    setOpenCommentModal(false);
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
