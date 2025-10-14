"use client";

import styled from "styled-components";
import logo from "@/images/logoWithText.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterCard = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContent = styled.div`
  background-color: #772626;
  border: 10px solid black;
  border-right: none;
  border-radius: 20px 0 0 20px;
  box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.3);
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
  background-color: #d4d1d1;
  border: 10px solid black;
  border-left: none;
  border-radius: 0 20px 20px 0;
  box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
  min-height: 600px;
  padding: 20px;
`;

const FormTitle = styled.p`
  font-size: 48px;
`;

const RegisterForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RegisterView = () => {
  const router = useRouter();

  const handleHomePage = () => {
    router.push("/home");
  };

  return (
    <RegisterCard>
      <LogoContent>
        <Image src={logo} alt="logo" onClick={handleHomePage} />
      </LogoContent>
      <FormContent>
        <FormTitle>Rejestracja</FormTitle>
        <RegisterForm>
          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Hasło" />
          <input type="password" placeholder="Powtórz hasło" />
          <button type="submit">Zarejestruj się</button>
          <p>
            Posiadasz już konto? Zaloguj się{" "}
            <a href="/home" style={{ textDecorationColor: "blue" }}>
              {" "}
              tutaj!{" "}
            </a>
          </p>
        </RegisterForm>
      </FormContent>
    </RegisterCard>
  );
};

export default RegisterView;
