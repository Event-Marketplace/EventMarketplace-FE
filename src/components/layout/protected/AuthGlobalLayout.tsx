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
} from "../commonStyles";
import { UserProvider } from "@/context/UserContext";

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const AuthGlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authResponse = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (authResponse.ok) {
        const data = await authResponse.json();
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // dopóki komponent nie zhydratuje, pokaż np. czarne tło
  if (!isMounted) {
    return <GlobalBox />;
  }

  const handleOrganizer = () => {
    router.push("/organizer-panel");
  };

  const handleLogout = async () => {
    await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return <div className="w-full h-24 bg-[#772626] animate-pulse shadow-md" />;
  }

  return (
    <>
      <UserProvider user={user}>
        <GlobalBox>
          <GlobalHeader>
            <div className="flex justify-start items-center gap-8">
              <LogoClicked src={logoWithTextIcon} alt="logo" width={150} />
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
                  <div className="flex flex-wrap items-center text-2xl border border-x-10 px-2 gap-5">
                    <strong>Organizator </strong> {user?.email}
                  </div>
                  <HeaderLink onClick={handleOrganizer}>
                    Panel organizatora
                  </HeaderLink>
                  <HeaderLink onClick={handleLogout}>Wyloguj</HeaderLink>
                </>
              </MobileMenu>
            )}
            <HeaderPanelSection aria-label="Główne menu nawigacyjne">
              <>
                <div className="flex flex-wrap items-center text-2xl border border-x-10 px-2 gap-5">
                  <strong>Organizator </strong> {user?.email}
                </div>
                <HeaderLink onClick={handleOrganizer}>
                  Panel organizatora
                </HeaderLink>
                <HeaderLink onClick={handleLogout}>Wyloguj</HeaderLink>
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
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
      </UserProvider>
    </>
  );
};

export default AuthGlobalLayout;
