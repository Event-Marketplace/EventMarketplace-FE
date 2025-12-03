import { BadgeVariant, EventStatus } from "@/types/types";

export const statusVariantMap: Record<EventStatus, BadgeVariant> = {
  Draft: "gray",
  Submitted: "blue",
  Aproved: "green",
  Rejected: "red",
  Archived: "yellow",
  DeletedByOrganizer: "default",
  DeletedByAdmin: "default",
};
