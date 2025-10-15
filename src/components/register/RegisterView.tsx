"use client";

import styled from "styled-components";
import logo from "@/images/logoWithText.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputEM from "../ui/InputEM";
import ButtonEM from "../ui/ButtonEM";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { apiAxiosClient } from "@/lib/apiAxiosClient";

const RegisterCard = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContent = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border: 10px solid black;
  border-right: none;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  display: flex;
  width: 25%;
  justify-content: center;
  align-items: center;
  min-height: 600px;

  img {
    cursor: pointer;
  }
`;

const FormContent = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border: 10px solid black;
  border-left: none;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
  min-height: 600px;
  padding: 20px;
  color: white;
`;

const FormTitle = styled.p`
  font-size: 48px;
`;

const RegisterForm = styled(Form)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Nieprawidłowy email")
    .required("Email jest wymagany"),

  password: Yup.string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .matches(
      /(?=.*[A-Z])/,
      "Hasło musi zawierać przynajmniej jedną wielką literę"
    )
    .matches(/(?=.*\d)/, "Hasło musi zawierać przynajmniej jedną cyfrę")
    .required("Hasło jest wymagane"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła muszą się zgadzać")
    .required("Powtórz hasło"),
});

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
    console.log("Dane formularza:", values);
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
      console.log("data", values);
      await apiAxiosClient.post("User/register", body);
      toast.success("Rejestracja zakończona sukcesem!");
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (error: any) {
      const message = error?.response?.data?.error;
      toast.error(message);
    }
  };

  return (
    <RegisterCard>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <>
          <LogoContent>
            <Image src={logo} alt="logo" onClick={handleHomePage} />
          </LogoContent>
          <FormContent>
            <FormTitle>Rejestracja</FormTitle>
            <RegisterForm>
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
                <a href="/home" style={{ textDecorationColor: "blue" }}>
                  tutaj!
                </a>
              </p>
            </RegisterForm>
          </FormContent>
        </>
      </Formik>
    </RegisterCard>
  );
};

export default RegisterView;
