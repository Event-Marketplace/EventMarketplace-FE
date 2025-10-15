"use client";

import styled from "styled-components";
import Image from "next/image";
import logoWithTextIcon from "@/images/logoWithText.svg";
import logoIcon from "@/images/logo.svg";
import fbIcon from "@/images/fb.svg";
import instaIcon from "@/images/insta.svg";
import tiktokIcon from "@/images/tiktok.svg";
import linkedinIcon from "@/images/linkedin.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GlobalBox = styled.div`
  background-color: white;
  height: 100vh;
`;

const GlobalHeader = styled.div`
  background-color: #772626;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 999;
  color: white;
`;

const HeaderPanelSection = styled.div`
  display: flex;
  gap: 20px;
  font-size: 22px;
`;

const HeaderP = styled.p`
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: #772626;
  }
`;

const GlobalContent = styled.div`
  background-color: white;
  height: auto;
  min-height: calc(100vh - 483px);
  z-index: 1;
  padding: 50px;
`;

const GlobalFooter = styled.div`
  background-color: #772626;
  height: auto;
  display: flex;
  gap: 50px;
  flex-direction: column;
  color: white;
  width: 100%;
  padding: 20px;
  position: relative;
  box-shadow: 0 -10px 15px rgba(0, 0, 0, 0.3);
`;

const FooterInformationSection = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // dopóki komponent nie zhydratuje, pokaż np. czarne tło
  if (!isMounted) {
    return <GlobalBox />;
  }

  const handleRegistration = () => {
    router.push("/auth/register");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <GlobalBox>
        <GlobalHeader>
          <Image src={logoIcon} alt="logo" width={70} />
          <HeaderPanelSection>
            <HeaderP onClick={handleLogin}>Logowanie</HeaderP>
            <HeaderP onClick={handleRegistration}>Rejestracja</HeaderP>
          </HeaderPanelSection>
        </GlobalHeader>
        <GlobalContent>{children}</GlobalContent>
        <GlobalFooter>
          <Image src={logoWithTextIcon} alt="logo z tekstem" />
          <FooterInformationSection>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <p style={{ fontSize: "24px" }}>
                Znajdź i organizuj wydarzenia sportowe, kulturalne,
                motoryzacyjne oraz wiele innych w swoim mieście!
              </p>

              <p>Email kontaktowy: contact@evently.com </p>
              <p>Telefon (opcjonalnie)</p>
            </div>
            <div>
              <Image src={fbIcon} alt="facebook" width={50} />
              <Image src={instaIcon} alt="instagram" width={50} />
              <Image src={tiktokIcon} alt="tiktok" width={50} />
              <Image src={linkedinIcon} alt="linkedin" width={50} />
            </div>
          </FooterInformationSection>
          <span>© 2025 Event Marketplace. Wszelkie prawa zastrzeżone.</span>
        </GlobalFooter>
      </GlobalBox>
    </>
  );
};

export default GlobalLayout;
