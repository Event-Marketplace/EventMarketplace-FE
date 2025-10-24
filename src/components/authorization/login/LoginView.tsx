"use client";

import { Field, Formik } from "formik";
import {
  AuthCard,
  AuthForm,
  ContentWrapper,
  FormContent,
  FormTitle,
  LogoContent,
  MobileLogoContent,
} from "../CommonStyledComponents";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import Image from "next/image";
import logo from "@/images/logoWithText.svg";
import { useRouter } from "next/navigation";
import { apiAxiosClient } from "@/lib/apiAxiosClient";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface LoginValues {
  email: string;
  password: string;
}

const LoginView = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleHomePage = () => {
    router.push("/home");
  };

  const errors = {
    email: false,
  };

  const handleSubmit = async (values: LoginValues) => {
    const newErrors = { ...errors };

    if (!values.email || !values.email.match(emailRegex)) {
      toast.error("Nieprawidłowy email.");
      newErrors.email = true;
    } else {
      newErrors.email = false;
    }

    if (newErrors.email) {
      return;
    }

    const body = {
      dto: {
        email: values.email,
        password: values.password,
      },
    };

    try {
      await apiAxiosClient.post("User/login", body);
      toast.success("Zostałeś poprawnie zalogowany.");
      setTimeout(() => {
        router.push("/user");
      }, 2000);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const message =
        err?.response?.data?.error || "Wystąpił błąd na serwerze.";
      toast.error(message);
    }
  };

  const initialValues: LoginValues = {
    email: "",
    password: "",
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
            <FormTitle>Logowanie</FormTitle>
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
              <ButtonEM
                type="submit"
                kind="primary"
                text="Zaloguj się"
                width={300}
                style={{
                  padding: "20px",
                  borderRadius: "50px",
                  fontSize: "18px",
                }}
              />
              <p>
                Nie posiadasz konta? Zarejestruj się{" "}
                <a
                  href="/auth/register"
                  style={{ textDecorationColor: "blue" }}
                >
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

export default LoginView;
