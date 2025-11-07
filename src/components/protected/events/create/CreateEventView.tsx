"use client";

import { Button } from "@/components/ui/button";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import { Field, Form, Formik } from "formik";
import { textarea } from "framer-motion/m";
import Image from "next/image";
import trashIcon from "@/images/trash.svg";
import { useState } from "react";
import UploadArea from "@/components/ui/uploadArea";
import { EventModel } from "@/types/Event";

const CreateEventView = () => {
  const [file, setFile] = useState<File | null>(null);

  const initialValues: EventModel = {
    title: "",
    description: "",
    price: "",
    ticketsCount: "",
    startDate: "",
    endDate: "",
    postalCode: "",
    city: "",
    street: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    //walidacja

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("image", file);
    }

    //wysyłanie requestu na be

    //przekierowanie do listy moich wydarzeń

    console.log("Utworzono wydarzenie");
    console.log("values", values);

    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  };

  return (
    <div className="max-w-[1920px] mx-auto shadom-md">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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

            <div className="w-full flex flex-col gap-3 bg-gray-400 rounded-lg p-3 lg:p-10">
              <p className="mb-3 text-white text-4xl mb-10">
                Uzupełnij informacje o wydarzeniu
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-white text-lg">Tytuł wydarzenia</label>
                <Field
                  as={InputEM}
                  name="title"
                  type="text"
                  placeholder="Wpisz tytuł wydarzenia "
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-lg">Opis wydarzenia</label>
                <Field
                  as={InputEM}
                  name="description"
                  textarea
                  placeholder="Opisz swoje wydarzenie "
                />
              </div>
              <div className="flex justify-between w-full flex-wrap xl:flex-nowrap pb-8 border-b">
                <div className="flex flex-col gap-2  w-full xl:w-1/5">
                  <label className="text-white text-lg">Cena biletu</label>
                  <Field
                    as={InputEM}
                    name="price"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full xl:w-1/5">
                  <label className="text-white text-lg">
                    Liczba dostępnych biletów
                  </label>
                  <Field
                    as={InputEM}
                    name="ticketsCount"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-2  w-full xl:w-1/5">
                  <label className="text-white text-lg">
                    Data i godzina rozpoczęcia
                  </label>
                  <Field as={InputEM} name="startDate" type="datetime-local" />
                </div>
                <div className="flex flex-col gap-2  w-full xl:w-1/5 ">
                  <label className="text-white text-lg">
                    Data i godzina zakończenia
                  </label>
                  <Field as={InputEM} name="endDate" type="datetime-local" />
                </div>
              </div>

              <div className="flex justify-start flex-col w-full flex-wrap xl:flex-nowrap">
                <span className="mt-3 text-white text-2xl mb-10">
                  Miejsce wydarzenia
                </span>
                <div className="flex flex-col gap-2 w-full xl:w-1/5">
                  <label className="text-white text-lg">Kod pocztowy</label>
                  <Field
                    as={InputEM}
                    name="postalCode"
                    type="text"
                    placeholder="Wpisz kod pocztowy"
                  />
                </div>
                <div className="flex flex-col gap-2  w-full xl:w-1/5">
                  <label className="text-white text-lg">Miasto</label>
                  <Field
                    as={InputEM}
                    name="city"
                    type="text"
                    placeholder="Wpisz miasto"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full xl:w-1/5">
                  <label className="text-white text-lg">Ulica</label>
                  <Field
                    as={InputEM}
                    name="street"
                    type="text"
                    placeholder="Wpisz ulicę"
                  />
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
