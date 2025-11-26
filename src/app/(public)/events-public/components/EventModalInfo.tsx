"use client";

import InfoModalEM from "@/components/ui/modals/InfoModalEM";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  availableTickets: number;
  createdAt: string;
  description: string;
  price: number;
}

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  event: Event | null;
}

export const EventModalInfo = ({ open, onClose, event }: EventModalProps) => {
  if (!event) return null;

  return (
    <InfoModalEM setOpen={open} onCancel={onClose}>
      <div className="text-2xl font-semibold text-center text-gray-800 mb-6 border-b pb-2">
        {event.title}
      </div>

      <div className="flex flex-col items-start gap-3 bg-gray-50 p-6 rounded-xl shadow-inner text-gray-700">
        <p className="text-base leading-relaxed">{event.description}</p>

        <div className="flex flex-col gap-1 text-sm text-gray-600 mt-2">
          <span>
            🗓️ <strong>Czas trwania:</strong>{" "}
            {new Date(event.startDate).toLocaleDateString("pl-PL")} –{" "}
            {new Date(event.endDate).toLocaleDateString("pl-PL")}
          </span>

          <span>
            🎟️ <strong>Dostępne bilety:</strong> {event.availableTickets}
          </span>

          <span>
            💰 <strong>Cena:</strong> {event.price} zł
          </span>

          <span>
            📅 <strong>Dodano:</strong>{" "}
            {new Date(event.createdAt).toLocaleDateString("pl-PL")}
          </span>
        </div>
      </div>
    </InfoModalEM>
  );
};
