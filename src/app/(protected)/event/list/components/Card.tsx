import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/interfaces";
import Image from "next/image";
import { start } from "repl";
import infoIcon from "@/images/info.svg";
import editIcon from "@/images/pencil.svg";
import removeIcon from "@/images/trash.svg";
import membersIcon from "@/images/users.svg";
import planeIcon from "@/images/plane.svg";
import commentIcon from "@/images/comment.svg";
import { useEffect, useState } from "react";
import { statusVariantMap } from "@/lib/const";
import { EventStatus } from "@/types/types";
import SideModalEM from "@/components/ui/modals/SideModalEM";
import CommentSideModal from "@/app/(protected)/admin-panel/events/components/CommentSideModal";
import { useSignalR } from "@/lib/signalR/SignalRProvider";
import { EventComment } from "@/app/(protected)/admin-panel/events/components/AdminEventList";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

type OrganizerEventCardProps = {
  event: Event;
  onDelete: () => void;
  onOpenSideModal: () => void;
  onSubmitEvent: () => void;
  onSuccess?: () => void;
};

const OrganizerEventCard = ({
  event,
  onDelete,
  onOpenSideModal,
  onSubmitEvent,
  onSuccess,
}: OrganizerEventCardProps) => {
  const [openDetail, setOpenDetails] = useState<boolean>(false);
  const imageSrc = event.imageUrl;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const conn = useSignalR();
  const [comments, setComments] = useState<EventComment[]>(
    event.comments || []
  );
  const currentContext = localStorage.getItem("currentContext");
  const userId = useSelector((state: AppState) => state.auth.userId);
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

  const startEvent = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(event.startDate));

  const endEvent = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(event.endDate));

  const handleDeleteEvent = () => {
    onDelete();
  };

  const handleCloseModal = async () => {
    setOpenModal(false);
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    await conn?.invoke("ReadComments", event.id);
  };

  return (
    <div className="w-full bg-gray-200 p-5 shadow-lg hover:bg-gray-300">
      <div className="flex justify-between flex-wrap gap-3">
        <div className="w-full md:w-1/4 xl:w-1/8 flex flex-col pr-2">
          <label className="text-gray-500">Tytuł</label>
          <span
            className="hover: cursor-pointer"
            onClick={() => {
              setOpenDetails(!openDetail);
            }}
          >
            <strong>{event.title}</strong>
          </span>
        </div>
        <div className="w-full md:w-1/4 xl:w-1/8 flex flex-col">
          <label className="text-gray-500">Rozpoczęcie</label>
          <span>{startEvent}</span>
        </div>
        <div className="w-full md:w-1/4 xl:w-1/8 flex flex-col">
          <label className="text-gray-500">Zakończenie</label>
          <span>{endEvent}</span>
        </div>
        <div className="w-full md:w-1/5 xl:w-1/10 flex flex-col">
          <label className="text-gray-500">Cena biletu</label>
          <span>{event.price} zł</span>
        </div>
        <div className="w-full md:w-1/4 xl:w-1/8 flex flex-col">
          <label className="text-gray-500">Liczba miejsc</label>
          <span>{event.availableTickets}</span>
        </div>
        <div className="w-full md:w-1/4 xl:w-1/8 flex flex-col">
          <label className="text-gray-500">Status</label>
          <span>
            <Badge variant={statusVariantMap[event.status as EventStatus]}>
              {event.statusDisplayName}
            </Badge>
          </span>
        </div>
        <div className=" flex gap-2 items-center justify-between">
          <div
            className="hover: cursor-pointer hover:bg-white hover:scale-110 transition-all rounded-md"
            onClick={() => {
              setOpenDetails(!openDetail);
            }}
          >
            <Image src={infoIcon} height={24} width={24} alt="info" />
          </div>
          <div
            className="hover: cursor-pointer hover:bg-white hover:scale-110 transition-all rounded-md"
            onClick={onOpenSideModal}
          >
            <Image src={editIcon} height={24} width={24} alt="edit" />
          </div>

          <div className="hover: cursor-pointer hover:bg-white hover:scale-110 transition-all rounded-md">
            <Image src={membersIcon} height={24} width={24} alt="members" />
          </div>

          <div
            className={`hover: cursor-pointer hover:bg-white hover:scale-110 transition-all rounded-md ${
              event.status !== "Draft"
                ? "opacity-40 pointer-events-none"
                : "hover:bg-white hover:scale-110"
            }`}
            onClick={onSubmitEvent}
          >
            <Image src={planeIcon} height={24} width={24} alt="submitt" />
          </div>

          <div
            className={`hover: cursor-pointer hover:bg-white hover:scale-110 transition-all rounded-md ${
              event.status !== "Draft"
                ? "opacity-40 pointer-events-none"
                : "hover:bg-white hover:scale-110"
            }`}
            onClick={handleDeleteEvent}
          >
            <Image src={removeIcon} height={24} width={24} alt="remove" />
          </div>

          <div className="relative inline-flex" onClick={handleOpenModal}>
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
        </div>

        {openDetail && (
          <div className="bg-blue w-full pt-5 transition-all duration-500 ease-out flex flex-col gap-5">
            <img
              src={imageSrc}
              alt="event-image"
              className="object-cover w-1/4"
            />

            <div className="flex flex-col">
              <label className="text-gray-500">Opis wydarzenia</label>
              <span>{event.description}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500">Miejsce wydarzenia</label>
              {event.locationType === "DescriptionPlace" ? (
                <span>{event.descriptionEventPlace ?? "-"}</span>
              ) : (
                <span>
                  Dokładna lokalizacja: {event.addressResponse?.postalCode} -{" "}
                  {event.addressResponse?.city}, {event.addressResponse?.street}{" "}
                  {event.addressResponse?.number}{" "}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500">Dostępne bilety</label>
              <span>100, kupiono biletów: 1100 / 1200</span>
            </div>
          </div>
        )}
      </div>
      <CommentSideModal
        comments={comments}
        onClose={handleCloseModal}
        onCreateComment={handleAddComment}
        open={openModal}
        onSuccess={onSuccess}
        formId="organizer-comment-form"
      />
    </div>
  );
};

export default OrganizerEventCard;
