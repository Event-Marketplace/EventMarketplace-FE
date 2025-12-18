import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/interfaces";
import Image from "next/image";
import { start } from "repl";
import infoIcon from "@/images/info.svg";
import editIcon from "@/images/pencil.svg";
import removeIcon from "@/images/trash.svg";
import membersIcon from "@/images/users.svg";
import { useState } from "react";
import { statusVariantMap } from "@/lib/const";
import { EventStatus } from "@/types/types";
import SideModalEM from "@/components/ui/modals/SideModalEM";

type OrganizerEventCardProps = {
  event: Event;
  onDelete: () => void;
  onOpenSideModal: () => void;
};

const OrganizerEventCard = ({
  event,
  onDelete,
  onOpenSideModal,
}: OrganizerEventCardProps) => {
  const [openDetail, setOpenDetails] = useState<boolean>(false);
  const imageSrc = event.imageUrl;

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
            onClick={handleDeleteEvent}
          >
            <Image src={removeIcon} height={24} width={24} alt="remove" />
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
    </div>
  );
};

export default OrganizerEventCard;
