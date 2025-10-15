"use client";
import styled from "styled-components";
import bgImage from "@/images/bg.jpg";
import { Toaster } from "react-hot-toast";

const Layout = styled.div`
  background-image: url(${bgImage.src});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Toaster position="top-center" />
      {children}
    </Layout>
  );
}
