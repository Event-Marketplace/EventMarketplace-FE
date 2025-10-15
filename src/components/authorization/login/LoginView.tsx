"use client";

import { Field, Formik } from "formik";
import {
  AuthCard,
  AuthForm,
  FormContent,
  FormTitle,
  LogoContent,
} from "../CommonStyledComponents";
import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import Image from "next/image";
import logo from "@/images/logoWithText.svg";
import { useRouter } from "next/navigation";
import { apiAxiosClient } from "@/lib/apiAxiosClient";
import toast from "react-hot-toast";

interface LoginValues {
  email: string;
  password: string;
}

const LoginView = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleHomePage = () => {
    router.push("/home");
  };

  const errors = {
    email: false,
  };

  const handleSubmit = async (values: any) => {
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
        router.push("/");
      }, 2000);
    } catch (error: any) {
      const message = error?.response?.data?.error;
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
                <a href="/register" style={{ textDecorationColor: "blue" }}>
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
