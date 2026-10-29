"use client";

import { Field, Formik } from "formik";
import Link from "next/link";

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
import { AxiosError } from "axios";
import {
  AuthBrandCopy as BrandCopy,
  AuthBrandPanel as BrandPanel,
  AuthFormHeading as FormHeading,
  AuthFormPanel as FormPanel,
  AuthMobileBrand as MobileBrand,
  ModernAuthCard as LoginCard,
  ModernAuthForm as LoginForm,
  ModernAuthShell as LoginShell,
} from "@/app/(auth)/ModernAuthComponents";

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
    <LoginShell>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <>
          <LoginCard>
            <BrandPanel>
              <Image
                src={logo}
                alt="Event Marketplace"
                onClick={handleHomePage}
              />
              <BrandCopy>
                <p>Witaj ponownie</p>
                <h2>Twoje kolejne wydarzenie jest na wyciągnięcie ręki.</h2>
                <p>
                  Zaloguj się i wróć do odkrywania spotkań, koncertów i emocji
                  na żywo.
                </p>
              </BrandCopy>
            </BrandPanel>
            <FormPanel>
              <MobileBrand>
                <Image
                  src={logo}
                  alt="Event Marketplace"
                  onClick={handleHomePage}
                />
              </MobileBrand>
              <FormHeading>
                <p>Event Marketplace</p>
                <h1>Zaloguj się</h1>
                <span>Wprowadź dane swojego konta, aby kontynuować.</span>
              </FormHeading>
              <LoginForm>
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
                <ButtonEM
                  type="submit"
                  kind="secondary"
                  text="Zaloguj się"
                  style={{
                    padding: "15px 20px",
                    borderRadius: "12px",
                    fontSize: "16px",
                  }}
                />
                <p>
                  Nie posiadasz konta? Zarejestruj się{" "}
                  <Link href="/register">tutaj!</Link>
                </p>
              </LoginForm>
            </FormPanel>
          </LoginCard>
        </>
      </Formik>
    </LoginShell>
  );
};

export default LoginView;
