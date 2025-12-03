import InputEM from "@/components/ui/InputEM";
import { EventModel } from "@/types/Event";
import { useFormikContext, Field, ErrorMessage } from "formik";
import { useEffect } from "react";

export const LocationFields = () => {
  const { values, setFieldValue } = useFormikContext<EventModel>();

  useEffect(() => {
    if (values.locationType === "address") {
      setFieldValue("descriptionEventPlace", "");
    }

    if (values.locationType === "descriptionPlace") {
      setFieldValue("city", "");
      setFieldValue("postalCode", "");
      setFieldValue("street", "");
      setFieldValue("number", "");
    }
  }, [values.locationType, setFieldValue]);

  return (
    <>
      {values.locationType === "address" && (
        <div className="flex flex-col gap-2">
          <div className="w-full xl:w-1/5">
            <label className="text-lg">
              Kod pocztowy
              <Field
                as={InputEM}
                name="postalCode"
                type="text"
                placeholder="Wpisz kod pocztowy"
              />
              <ErrorMessage
                name="postalCode"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>

          <div className="w-full xl:w-1/5">
            <label className="text-lg">
              Miasto
              <Field
                as={InputEM}
                name="city"
                type="text"
                placeholder="Wpisz miasto"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>

          <div className="w-full xl:w-1/5">
            <label className="text-lg">
              Ulica
              <Field
                as={InputEM}
                name="street"
                type="text"
                placeholder="Wpisz ulicę"
              />
              <ErrorMessage
                name="street"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>

          <div className="w-full xl:w-1/5">
            <label className="text-lg">
              Ulica
              <Field
                as={InputEM}
                name="number"
                type="text"
                placeholder="Numer budynku"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>
          </div>
        </div>
      )}

      {values.locationType === "descriptionPlace" && (
        <div className="w-full xl:w-1/5">
          <label className="text-lg">
            Opis miejsca wydarzenia
            <Field
              as={InputEM}
              name="descriptionEventPlace"
              type="text"
              placeholder="Wpisz opis miejsca w którym ma się odbyć wydarzenie"
              textarea
            />
            <ErrorMessage
              name="descriptionEventPlace"
              component="div"
              className="text-red-500 text-sm"
            />
          </label>
        </div>
      )}
    </>
  );
};
