"use client";

import styled from "styled-components";
import bgImage from "@/images/bg.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      toast.dismiss(); // zamyka wszystkie toasty przy opuszczeniu strony
    };
  }, []);

  // dopóki komponent nie zhydratuje, pokaż np. czarne tło
  if (!isMounted) {
    return <Layout />;
  }

  return (
    <Layout>
      <>{children}</>
    </Layout>
  );
}
