import EventList, {
  EventFiltersProps,
} from "@/app/(public)/events-public/components/EventList";
import getEventList from "@/app/api/getEventList";

export default async function EventPub(searchParams: EventFiltersProps) {
  const filters = { ...searchParams };
  const events = await getEventList(filters);

  return <EventList events={events.events} totalCount={events.totalCount} />;
}
