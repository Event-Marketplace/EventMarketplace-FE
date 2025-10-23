import { breakpoints } from "@/styles/breakpoints";
import { Form } from "formik";
import { b } from "framer-motion/client";
import styled from "styled-components";

export const AuthCard = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.laptopL}) {
    width: 90%;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10vw;
`;

export const LogoContent = styled.div`
  background-color: rgba(119, 38, 38, 1);
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

  @media (max-width: ${breakpoints.laptop}) {
    flex: 1;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const FormContent = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
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

  @media (max-width: ${breakpoints.laptop}) {
    flex: 1;
  }

  @media (max-width: ${breakpoints.mobileM}) {
    height: auto;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
`;

export const FormTitle = styled.p`
  font-size: 48px;
  font-style: italic;
  font-family: "Poppins", sans-serif;
`;

export const AuthForm = styled(Form)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${breakpoints.mobileM}) {
    display: flex;
    align-items: center;

    input {
      width: 250px;
    }

    button {
      width: 250px;
    }
  }
`;
