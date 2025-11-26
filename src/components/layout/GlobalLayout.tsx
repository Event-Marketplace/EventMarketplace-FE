"use client";

import styled from "styled-components";
import Image from "next/image";
import logoWithTextIcon from "@/images/logoWithText.svg";
import logoIcon from "@/images/logo.svg";
import fbIcon from "@/images/fb.svg";
import instaIcon from "@/images/insta.svg";
import tiktokIcon from "@/images/tiktok.svg";
import linkedinIcon from "@/images/linkedin.svg";
import burgerIcon from "@/images/menuBurger.svg";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { breakpoints } from "@/styles/breakpoints";
import { getUserFromToken, User } from "@/services/getUserFromToken";
import { setuid } from "process";
import React from "react";
import {
  GlobalHeader,
  LogoClicked,
  HeaderPanelMenu,
  MobileMenu,
  HeaderLink,
  HeaderPanelSection,
  GlobalContent,
  GlobalFooter,
  LogoWrapper,
  FooterInformationSection,
  GlobalBox,
} from "./commonStyles";

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // dopóki komponent nie zhydratuje, pokaż np. czarne tło
  if (!isMounted) {
    return <GlobalBox />;
  }

  const handleRegistration = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleEventList = () => {
    router.push("/events-public");
  };

  const handleHome = () => {
    router.push("/home");
  };

  return (
    <>
      <GlobalBox>
        <GlobalHeader>
          <div className="flex justify-start items-center gap-8">
            <LogoClicked
              src={logoWithTextIcon}
              alt="logo"
              width={150}
              onClick={handleHome}
            />
          </div>

          <HeaderPanelMenu>
            <Image
              src={burgerIcon}
              alt="menu"
              width={48}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </HeaderPanelMenu>
          {isMenuOpen && (
            <MobileMenu aria-label="Mobilne menu nawigacyjne">
              <>
                <HeaderLink onClick={handleLogin}>Logowanie</HeaderLink>
                <HeaderLink onClick={handleRegistration}>
                  Rejestracja
                </HeaderLink>
                <HeaderLink onClick={handleEventList}>
                  Wyszukaj wydarzenie
                </HeaderLink>
                <HeaderLink onClick={handleLogin}>O nas</HeaderLink>
              </>
            </MobileMenu>
          )}
          <HeaderPanelSection aria-label="Główne menu nawigacyjne">
            <>
              <HeaderLink onClick={handleLogin}>Logowanie</HeaderLink>
              <HeaderLink onClick={handleRegistration}>Rejestracja</HeaderLink>
              <HeaderLink onClick={handleEventList}>
                Wyszukaj wydarzenie
              </HeaderLink>
              <HeaderLink onClick={handleLogin}>O nas</HeaderLink>
            </>
          </HeaderPanelSection>
        </GlobalHeader>
        <GlobalContent>{children}</GlobalContent>
        <GlobalFooter>
          <LogoWrapper>
            <Image src={logoWithTextIcon} alt="logo z tekstem" />
          </LogoWrapper>
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
