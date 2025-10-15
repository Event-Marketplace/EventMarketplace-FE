import { Form } from "formik";
import styled from "styled-components";

export const AuthCard = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const FormTitle = styled.p`
  font-size: 48px;
`;

export const AuthForm = styled(Form)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
