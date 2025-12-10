"use client";

import InputEM from "@/components/ui/InputEM";
import SideModalEM from "@/components/ui/modals/SideModalEM";
import UploadArea from "@/components/ui/uploadArea";
import { Event } from "@/lib/interfaces";
import { EventModel } from "@/types/Event";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

type EditEventModalProps = {
  open: boolean;
  onClose: () => void;
  event: Event | undefined;
};

const EditEventModal = ({ open, onClose, event }: EditEventModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  console.log("event", event);

  const initialValues: EventModel = {
    title: event?.title ?? "",
    description: event?.description ?? "",
    price: event?.price.toString() ?? "",
    availableTicketsCount: event?.availableTickets.toString() ?? "",
    startDateTime: event?.startDate ?? "",
    endDateTime: event?.endDate ?? "",
    descriptionEventPlace: event?.eventDescriptionPlace ?? "",
    locationType: event?.locationType ?? "address",
    address:
      event?.address !== undefined
        ? {
            city: event.address.city,
            number: event.address.number,
            postalCode: event.address.postalCode,
            street: event.address.street,
          }
        : undefined,
  };

  const handleSubmit = () => {
    toast.success("Wysłałeś formularz!");
  };

  return (
    <SideModalEM
      setOpen={open}
      title={`${event?.title}`}
      visibleCancelBtn
      visibleConfirmBtn
      cancelText="dd"
      confirmText="ad"
      onCancel={onClose}
      onSubmit={handleSubmit}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form
          className="flex w-[98%] flex-col h-auto rounded-lg gap-3"
          id="edit-event-form"
        >
          <div className="w-full">
            <UploadArea onFileSelect={setFile} />
          </div>
          <div className="">
            <label className="text-lg">Wgrane zdjęcie: </label>
            {event?.imageUrl && (
              <img
                src={event.imageUrl}
                alt="zdjecie wgrane"
                width={200}
                height={200}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Tytuł wydarzenia
              <Field as={InputEM} name="title" placeholder="Wpisz tytuł" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Opis wydarzenia
              <Field
                as={InputEM}
                name="description"
                placeholder="Wpisz tytuł"
                textarea
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Cena biletu
              <Field as={InputEM} name="price" type="number" placeholder="0" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Liczba dostępnych biletów
              <Field
                as={InputEM}
                name="availableTicketsCount"
                type="number"
                placeholder="0"
              />
              <ErrorMessage
                name="availableTicketsCount"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Data i godzina rozpoczęcia
              <Field as={InputEM} name="startDateTime" type="datetime-local" />
              <ErrorMessage
                name="startDateTime"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Data i godzina zakończenia
              <Field as={InputEM} name="endDateTime" type="datetime-local" />
              <ErrorMessage
                name="endDateTime"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>
        </Form>
      </Formik>
    </SideModalEM>
  );
};

export default EditEventModal;
