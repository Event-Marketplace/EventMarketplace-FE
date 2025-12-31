"use client";

import styled from "styled-components";
import logo from "@/images/logoWithText.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { apiAxios } from "@/lib/apiAxios";

import { AxiosError } from "axios";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import {
  AuthCard,
  LogoContent,
  FormContent,
  MobileLogoContent,
  FormTitle,
  AuthForm,
} from "../../CommonStyledComponents";

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
    <AuthCard>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <>
          <LogoContent>
            <Image src={logo} alt="logo" onClick={handleHomePage} />
          </LogoContent>
          <FormContent>
            <MobileLogoContent>
              <Image src={logo} alt="logo" onClick={handleHomePage} />
            </MobileLogoContent>
            <FormTitle>Rejestracja</FormTitle>
            <AuthForm>
              <Field
                as={InputEM}
                name="email"
                type="text"
                placeholder="E-mail"
                width={300}
              />
              <Field
                as={InputEM}
                name="password"
                type="password"
                placeholder="Hasło"
                width={300}
              />

              <Field
                as={InputEM}
                name="confirmPassword"
                type="password"
                placeholder="Powtórz hasło"
                width={300}
              />
              <ButtonEM
                type="submit"
                kind="primary"
                text="Zarejestruj się"
                width={300}
                style={{
                  padding: "20px",
                  borderRadius: "50px",
                  fontSize: "18px",
                }}
              />
              <p>
                Posiadasz już konto? Zaloguj się{" "}
                <a href="/login" style={{ textDecorationColor: "blue" }}>
                  tutaj!
                </a>
              </p>
            </AuthForm>
          </FormContent>
        </>
      </Formik>
    </AuthCard>
  );
};

export default RegisterView;
