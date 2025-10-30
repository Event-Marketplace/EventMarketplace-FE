import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
}

export function EventCard({
  event,
  onOpenModal,
}: {
  event: Event;
  onOpenModal: () => void;
}) {
  return (
    <Card className="bg-blue-50 border border-blue-200 hover:border-blue-500 overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-md text-gray-500">
          📅 {new Date(event.startDate).toLocaleDateString("pl-PL")} -{" "}
          {new Date(event.endDate).toLocaleDateString("pl-PL")}
        </p>
        <p className="text-md text-gray-600">📍 Warszawa </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full hover:cursor-pointer"
          onClick={onOpenModal}
        >
          Zobacz więcej
        </Button>
      </CardFooter>
    </Card>
  );
}
