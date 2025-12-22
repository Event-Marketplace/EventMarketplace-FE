"use client";

import { Field, Formik } from "formik";

import ButtonEM from "@/components/ui/ButtonEM";
import InputEM from "@/components/ui/InputEM";
import Image from "next/image";
import logo from "@/images/logoWithText.svg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiAxios } from "@/lib/apiAxios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setAccessToken } from "@/redux/auth/authSlice";
import {
  AuthCard,
  LogoContent,
  FormContent,
  MobileLogoContent,
  FormTitle,
  AuthForm,
} from "@/app/(auth)/CommonStyledComponents";
import { AxiosError } from "axios";

interface LoginValues {
  email: string;
  password: string;
}

const LoginView = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dispatch = useDispatch<AppDispatch>();

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
      Dto: {
        email: values.email,
        password: values.password,
      },
    };
    try {
      const res = await apiAxios.post("User/login", body);
      const data = await res.data;
      console.log("accessToken", data);

      if (!data) {
        toast.error(data.error || "Błąd logowania");
        return;
      }

      dispatch(setAccessToken(data.tokenJwt));

      toast.success("Zostałeś poprawnie zalogowany.");
      setTimeout(() => {
        router.push("/dashboard");
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
