"use client";
import styled from "styled-components";

const Layout = styled.div`
  background-color: #d9d9d9;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
