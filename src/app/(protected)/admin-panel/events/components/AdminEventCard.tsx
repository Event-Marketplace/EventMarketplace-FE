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
import InfoModalEM from "@/components/ui/modals/InfoModalEM";
import { FormEvent, useState } from "react";

type AdminEventCardProps = {
  event: AdminEvent;
  tab: Tabs;
  handleImageModal: (url: string) => void;
  handleOpenDescModal: (content: string) => void;
  onAddComment: (comment: string) => Promise<void>;
};

const AdminEventCard = ({
  event,
  tab,
  handleImageModal,
  handleOpenDescModal,
  onAddComment,
}: AdminEventCardProps) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      setLoading(true);
      await onAddComment(comment);
      setComment("");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDescModal = () => {
    setOpenCommentModal(false);
  };

  const handleOpenCommentModal = () => {
    setOpenCommentModal(true);
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
      <div className="w-1/4 flex flex-col">
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
            onClick={handleOpenCommentModal}
          />

          <InfoModalEM
            onCancel={handleCloseDescModal}
            setOpen={openCommentModal}
          >
            <div className="max-h-[500px]  overflow-hidden object-cover">
              <form onSubmit={handleSubmit}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Dodaj komentarz..."
                />

                <button disabled={loading}>
                  {loading ? "Wysyłanie..." : "Dodaj komentarz"}
                </button>
              </form>
            </div>
          </InfoModalEM>
        </div>
      )}
    </>
  );
};

export default AdminEventCard;
