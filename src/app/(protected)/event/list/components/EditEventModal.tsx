"use client";

import InputEM from "@/components/ui/InputEM";
import SideModalEM from "@/components/ui/modals/SideModalEM";
import UploadArea from "@/components/ui/uploadArea";
import { apiAxios } from "@/lib/apiAxios";
import { Event } from "@/lib/interfaces";
import { diff, toDateTimeLocal } from "@/lib/reuseFunctions";
import { Address, EventModel } from "@/types/Event";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { param } from "framer-motion/client";
import { useState } from "react";
import toast from "react-hot-toast";

type EditEventModalProps = {
  open: boolean;
  onClose: () => void;
  event: Event | undefined;
  onSuccess: () => void;
};

const EditEventModal = ({
  open,
  onClose,
  event,
  onSuccess,
}: EditEventModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  console.log(`event_${event?.id}`, event);

  const initialValues: EventModel = {
    title: event?.title ?? "",
    description: event?.description ?? "",
    price: event?.price.toString() ?? "",
    availableTicketsCount: event?.availableTickets.toString() ?? "",
    startDateTime: event?.startDate ? toDateTimeLocal(event.startDate) : "",
    endDateTime: event?.endDate ? toDateTimeLocal(event.endDate) : "",
    descriptionEventPlace: event?.descriptionEventPlace ?? "",
    locationType: event?.locationType ?? "address",
    address: event?.addressResponse
      ? {
          city: event.addressResponse.city,
          number: event.addressResponse.number,
          postalCode: event.addressResponse.postalCode,
          street: event.addressResponse.street,
        }
      : null,
  };

  const handleSubmit = async (values: EventModel) => {
    try {
      // 1️⃣ Obliczamy różnicę między initialValues a values
      const changed = diff(initialValues, values);

      if (Object.keys(changed).length === 0 && !file) {
        toast.success("Brak zmian do zapisania");
        return;
      }

      // 2️⃣ Tworzymy FormData
      const formData = new FormData();

      formData.append("Title", values.title);
      formData.append("Description", values.description);
      formData.append("Price", values.price);
      formData.append("AvailableTickets", values.availableTicketsCount);
      formData.append(
        "StartDateTime",
        new Date(values.startDateTime).toISOString()
      );
      formData.append(
        "EndDateTime",
        new Date(values.endDateTime).toISOString()
      );
      formData.append("EventPlaceDescription", values.descriptionEventPlace);
      formData.append("LocationType", values.locationType);

      formData.append("City", values.address?.city ?? "");
      formData.append("PostalCode", values.address?.postalCode ?? "");
      formData.append("Street", values.address?.street ?? "");
      formData.append("Number", values.address?.number ?? "");

      if (file) formData.append("Image", file);

      // 3️⃣ Wyślij PATCH
      await apiAxios.patch(`/Event/${event?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Zaktualizowano event!");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Błąd przy aktualizacji eventu");
    }
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
      onSubmit={() => handleSubmit}
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
          {event?.locationType === "DescriptionPlace" ? (
            <div className="">
              <label className="text-lg">
                Opis miejsca wydarzenia
                <Field
                  as={InputEM}
                  name="descriptionEventPlace"
                  type="text"
                  textarea
                />
                <ErrorMessage
                  name="descriptionEventPlace"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </label>
            </div>
          ) : (
            <>
              <div className="">
                <label className="text-lg">
                  Kod pocztowy
                  <Field as={InputEM} name="address.postalCode" type="text" />
                  <ErrorMessage
                    name="address.postalCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </label>
              </div>
              <div className="">
                <label className="text-lg">
                  Miasto
                  <Field as={InputEM} name="address.city" type="text" />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </label>
              </div>
              <div className="">
                <label className="text-lg">
                  Ulica
                  <Field as={InputEM} name="address.street" type="text" />
                  <ErrorMessage
                    name="address.street"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </label>
              </div>
              <div className="">
                <label className="text-lg">
                  Numer
                  <Field as={InputEM} name="address.number" type="text" />
                  <ErrorMessage
                    name="address.number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </label>
              </div>
            </>
          )}
        </Form>
      </Formik>
    </SideModalEM>
  );
};

export default EditEventModal;
