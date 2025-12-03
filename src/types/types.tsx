import { BadgeProps } from "@/components/ui/badge";

export type EventStatus =
  | "Draft"
  | "Submitted"
  | "Aproved"
  | "Rejected"
  | "Archived"
  | "DeletedByOrganizer"
  | "DeletedByAdmin";

export type BadgeVariant = BadgeProps["variant"];
