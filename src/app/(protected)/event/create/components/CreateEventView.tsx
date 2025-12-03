"use client";

import { Button } from "@/components/ui/button";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { textarea } from "framer-motion/m";
import Image from "next/image";
import trashIcon from "@/images/trash.svg";
import { useState } from "react";
import UploadArea from "@/components/ui/uploadArea";
import { EventModel } from "@/types/Event";
import { apiAxios, apiAxiosForm } from "@/lib/apiAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { LocationFields } from "./LocationFiels";

const CreateEventView = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const initialValues: EventModel = {
    title: "",
    description: "",
    price: "",
    availableTicketsCount: "",
    startDateTime: "",
    endDateTime: "",
    postalCode: "",
    city: "",
    street: "",
    number: "",
    descriptionEventPlace: "",
    locationType: "address",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const startDate = new Date(values.startDateTime);
    const endDate = new Date(values.endDateTime);

    //walidacja
    if (!file) {
      toast.error("Zdjęcie jest wymagane");
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "startDateTime")
        formData.append(key, startDate.toISOString());
      else if (key === "endDateTime")
        formData.append(key, endDate.toISOString());
      else formData.append(key, value);
    });

    if (file) {
      formData.append("image", file);
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    //wysyłanie requestu na be
    try {
      await apiAxiosForm.post("Event/", formData);
      toast.success("Utworzono nowe wydarzenie.");
      //przekierowanie do listy moich wydarzeń
      setTimeout(() => {
        router.push("/organizer-panel");
      }, 2000);
    } catch (error) {
      toast.error("Błąd podczas tworzenia wydarzenia.");
    }
  };

  const creatingEventValidation = Yup.object().shape({
    title: Yup.string().required("Tytuł jest wymagany"),
    description: Yup.string().required("Opis jest wymagany"),
    price: Yup.number()
      .typeError("Cena musi być liczbą")
      .required("Cena jest wymagana"),
    availableTicketsCount: Yup.number()
      .typeError("Liczba biletów musi być liczbą")
      .required("Liczba biletów jest wymagana"),
    startDateTime: Yup.string().required("Data rozpoczęcia jest wymagana"),
    endDateTime: Yup.string()
      .required("Data zakończenia jest wymagana")
      .test(
        "endDateAfterStart",
        "Data zakończenia musi być po dacie rozpoczęcia",
        function (value) {
          const { startDateTime } = this.parent;
          return !value || new Date(value) >= new Date(startDateTime);
        }
      ),
    city: Yup.string().when("locationType", {
      is: "address",
      then: (schema) => schema.required("Miasto jest wymagane"),
      otherwise: (schema) => schema.notRequired(),
    }),

    street: Yup.string().when("locationType", {
      is: "address",
      then: (schema) => schema.required("Ulica jest wymagana"),
      otherwise: (schema) => schema.notRequired(),
    }),

    postalCode: Yup.string().when("locationType", {
      is: "address",
      then: (schema) => schema.required("Kod pocztowy jest wymagany"),
      otherwise: (schema) => schema.notRequired(),
    }),

    number: Yup.string().when("locationType", {
      is: "address",
      then: (schema) => schema.required("Number budynku/lokalu jest wymagany"),
      otherwise: (schema) => schema.notRequired(),
    }),

    descriptionPlace: Yup.string().when("locationType", {
      is: "descriptionEventPlace",
      then: (schema) =>
        schema.required("Opis miejsca wydarzenia jest wymagany"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  return (
    <div className="max-w-[1920px] mx-auto shadom-md">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={creatingEventValidation}
      >
        <Form>
          <p className="mb-8 text-center text-4xl italic pb-8 border-b ">
            Kreator wydarzenia
          </p>
          <p className="mb-3 text-2xl">Zdjęcie</p>
          <div className="flex w-full flex-col gap-8 mb-8 h-auto rounded-lg">
            <div className="w-full flex flex-col gap-3 pb-6 border-b">
              <div className="flex w-full gap-10">
                <UploadArea onFileSelect={setFile} />
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 bg-gray-100  border rounded-lg p-3 lg:p-10">
              <p className="mb-3 text-4xl mb-10 flex items-center gap-3">
                Uzupełnij informacje o wydarzeniu
                <span className="text-lg">(wymagane wszytkie pola)</span>
              </p>
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
              <div className="flex justify-between w-full flex-wrap xl:flex-nowrap pb-8 border-b">
                <div className="flex flex-col gap-2  w-full xl:w-1/5">
                  <label className="text-lg">
                    Cena biletu
                    <Field
                      as={InputEM}
                      name="price"
                      type="number"
                      placeholder="0"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2 w-full xl:w-1/5">
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
                <div className="flex flex-col gap-2  w-full xl:w-1/5">
                  <label className="text-lg">
                    Data i godzina rozpoczęcia
                    <Field
                      as={InputEM}
                      name="startDateTime"
                      type="datetime-local"
                    />
                    <ErrorMessage
                      name="startDateTime"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2  w-full xl:w-1/5 ">
                  <label className="text-lg">
                    Data i godzina zakończenia
                    <Field
                      as={InputEM}
                      name="endDateTime"
                      type="datetime-local"
                    />
                    <ErrorMessage
                      name="endDateTime"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-start flex-col w-full flex-wrap xl:flex-nowrap gap-3">
                <div className="flex gap-6 items-center">
                  <span className="flex text-2xl my-5">
                    Miejsce wydarzenia:
                  </span>
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      value="address"
                      name="locationType"
                      className="w-5 h-5"
                    />
                    Dokładny adres
                  </label>

                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      value="descriptionPlace"
                      name="locationType"
                      className="w-5 h-5"
                    />
                    Opis miejsca wydarzenia
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <LocationFields />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full md:w-1/4 lg:w-1/5">
            <ButtonEM
              kind="primary"
              text="Utwórz wydarzenie"
              type="submit"
              style={{ width: "100%" }}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateEventView;
