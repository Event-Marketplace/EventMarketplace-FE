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
import logo from "@/images/logo.svg";
import { useRouter } from "next/navigation";

const LoginView = () => {
  const router = useRouter();
  const handleHomePage = () => {
    router.push("/home");
  };

  const handleSubmit = (values: any) => {
    console.log("data", values);
  };

  return (
    <AuthCard>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <>
          <LogoContent>
            <Image src={logo} alt="logo" onClick={handleHomePage} />
          </LogoContent>
          <FormContent>
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
            </AuthForm>
          </FormContent>
        </>
      </Formik>
    </AuthCard>
  );
};

export default LoginView;
