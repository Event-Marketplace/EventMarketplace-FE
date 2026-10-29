import { Form } from "formik";
import styled from "styled-components";
import loginBackground from "@/images/bg.jpg";

export const ModernAuthShell = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;

  @media (max-width: 480px) { padding: 18px; }
`;

export const ModernAuthCard = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  width: min(100%, 960px);
  min-height: 560px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 30px 90px rgba(29, 12, 12, 0.32);

  @media (max-width: 720px) {
    display: block;
    width: min(100%, 480px);
    min-height: auto;
    border-radius: 22px;
  }
`;

export const AuthBrandPanel = styled.aside`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 560px;
  padding: 42px;
  color: #fff;
  background: #641f21;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  &::before {
    background: url(${loginBackground.src}) center / cover no-repeat;
    opacity: 0.58;
  }

  &::after {
    background: linear-gradient(160deg, rgba(59, 18, 19, 0.38), rgba(59, 18, 19, 0.94));
  }

  img { width: 190px; height: auto; cursor: pointer; }

  @media (max-width: 720px) { display: none; }
`;

export const AuthBrandCopy = styled.div`
  max-width: 340px;

  p:first-child {
    margin: 0 0 14px;
    color: #ffe08a;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0 0 14px;
    font-size: clamp(2rem, 3.3vw, 2.8rem);
    letter-spacing: -0.045em;
    line-height: 1.08;
  }

  p:last-child { margin: 0; color: rgba(255, 255, 255, 0.82); line-height: 1.7; }
`;

export const AuthFormPanel = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px clamp(32px, 6vw, 76px);
  color: #241b1b;

  @media (max-width: 720px) { padding: 34px 28px 38px; }
  @media (max-width: 375px) { padding: 28px 20px 32px; }
`;

export const AuthMobileBrand = styled.div`
  display: none;
  margin-bottom: 30px;

  img { width: 150px; height: auto; cursor: pointer; }

  @media (max-width: 720px) { display: block; }
`;

export const AuthFormHeading = styled.div`
  margin-bottom: 32px;

  p { margin: 0 0 9px; color: #772626; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
  h1 { margin: 0; font-size: clamp(2rem, 4vw, 2.7rem); letter-spacing: -0.045em; line-height: 1.1; }
  span { display: block; margin-top: 12px; color: #6f6663; line-height: 1.6; }
`;

export const ModernAuthForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 18px;

  input {
    width: 100%;
    height: 52px;
    padding: 0 16px;
    border: 1px solid #ded6d2;
    border-radius: 12px;
    background: #fff;
    color: #241b1b;
    transition: border-color 160ms ease, box-shadow 160ms ease;
  }

  input:focus {
    border-color: #8a3333;
    outline: none;
    box-shadow: 0 0 0 4px rgba(119, 38, 38, 0.12);
  }

  button { width: 100%; min-height: 54px; font-weight: 700; }

  > p { margin: 6px 0 0; color: #6f6663; text-align: center; font-size: 0.94rem; }
  > p a { color: #772626; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
`;
