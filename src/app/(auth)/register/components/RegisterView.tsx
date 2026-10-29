"use client";

import logo from "@/images/logoWithText.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Field, Formik } from "formik";
import toast from "react-hot-toast";
import { apiAxios } from "@/lib/apiAxios";

import { AxiosError } from "axios";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import {
  AuthBrandCopy,
  AuthBrandPanel,
  AuthFormHeading,
  AuthFormPanel,
  AuthMobileBrand,
  ModernAuthCard,
  ModernAuthForm,
  ModernAuthShell,
} from "../../ModernAuthComponents";

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorFlags {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterView = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleHomePage = () => {
    router.push("/home");
  };

  const errors: ErrorFlags = {
    email: false,
    password: false,
    confirmPassword: false,
  };

  const initialValues: RegisterValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegisterValues) => {
    const newErrors = { ...errors };

    if (!values.email || !values.email.match(emailRegex)) {
      newErrors.email = true;
      toast.error("Wprowadzony email nie jest poprawny.");
    } else {
      newErrors.email = false;
    }

    if (!values.password || !values.password.match(passwordRegex)) {
      newErrors.password = true;
      toast.error(
        "Wprowadzone hasło musi mieć minimum 8 znaków, zawierać jedną wielką literę i cyfrę."
      );
    } else {
      newErrors.password = false;
    }
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = true;
      toast.error("Podane hasła nie są jednakowe.");
    } else {
      newErrors.confirmPassword = false;
    }

    if (newErrors.email || newErrors.confirmPassword || newErrors.password) {
      return;
    }

    const body = {
      dto: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        isOrganizerAccount: false,
      },
    };

    try {
      await apiAxios.post("User/register", body);
      toast.success("Rejestracja zakończona sukcesem!");
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message =
        err?.response?.data?.error || "Wystąpił błąd na serwerze.";
      toast.error(message);
    }
  };

  return (
    <ModernAuthShell>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <>
          <ModernAuthCard>
            <AuthBrandPanel>
              <Image
                src={logo}
                alt="Event Marketplace"
                onClick={handleHomePage}
              />
              <AuthBrandCopy>
                <p>Dołącz do społeczności</p>
                <h2>Odkrywaj wydarzenia i twórz własne wspomnienia.</h2>
                <p>
                  Załóż konto i miej ciekawe wydarzenia zawsze w zasięgu ręki.
                </p>
              </AuthBrandCopy>
            </AuthBrandPanel>
            <AuthFormPanel>
              <AuthMobileBrand>
                <Image
                  src={logo}
                  alt="Event Marketplace"
                  onClick={handleHomePage}
                />
              </AuthMobileBrand>
              <AuthFormHeading>
                <p>Event Marketplace</p>
                <h1>Utwórz konto</h1>
                <span>
                  Wypełnij formularz, aby dołączyć do Event Marketplace.
                </span>
              </AuthFormHeading>
              <ModernAuthForm>
                <Field
                  as={InputEM}
                  name="email"
                  type="email"
                  placeholder="Adres e-mail"
                />
                <Field
                  as={InputEM}
                  name="password"
                  type="password"
                  placeholder="Hasło"
                />
                <Field
                  as={InputEM}
                  name="confirmPassword"
                  type="password"
                  placeholder="Powtórz hasło"
                />
                <ButtonEM
                  type="submit"
                  kind="secondary"
                  text="Zarejestruj się"
                  style={{
                    padding: "15px 20px",
                    borderRadius: "12px",
                    fontSize: "16px",
                  }}
                />
                <p>
                  Posiadasz już konto? Zaloguj się{" "}
                  <Link href="/login">tutaj!</Link>
                </p>
              </ModernAuthForm>
            </AuthFormPanel>
          </ModernAuthCard>
        </>
      </Formik>
    </ModernAuthShell>
  );
};

export default RegisterView;
