import { BadgeProps } from "@/components/ui/badge";
import { StringToBoolean } from "class-variance-authority/types";

export type EventStatus =
  | "Draft"
  | "Submitted"
  | "Aproved"
  | "Rejected"
  | "Archived"
  | "DeletedByOrganizer"
  | "DeletedByAdmin";

export type BadgeVariant = BadgeProps["variant"];

export type EventStatusBE = {
  index: number;
  name: string;
  displayName: string;
};

export const LOCATION_TYPE = {
  ADDRESS: "Address",
  PLACE_DESCRIPTION: "DescriptionPlace",
} as const;

export type LocationType = (typeof LOCATION_TYPE)[keyof typeof LOCATION_TYPE];
