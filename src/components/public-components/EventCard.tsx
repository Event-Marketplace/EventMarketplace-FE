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
  date: string;
  location: string;
  imageUrl: string;
}

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="bg-blue-50 border border-blue-200 overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm text-gray-500">
          📅 {new Date(event.date).toLocaleDateString("pl-PL")}
        </p>
        <p className="text-sm text-gray-600">📍 {event.location}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Zobacz więcej
        </Button>
      </CardFooter>
    </Card>
  );
}
