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
import { useEffect, useState } from "react";
import { breakpoints } from "@/styles/breakpoints";

const GlobalBox = styled.div`
  background-color: white;
  height: 100vh;
`;

const GlobalHeader = styled.header`
  background-color: #772626;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100vw;
  z-index: 999;
  color: white;
`;

const HeaderPanelSection = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 22px;

  @media (max-width: ${breakpoints.laptop}) {
    display: none;
  }
`;

const HeaderPanelMenu = styled.div`
  display: none;
  width: 48px;
  height: 48px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.laptop}) {
    display: flex;
  }
`;

const HeaderLink = styled.a`
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: #772626;
    border-radius: 5px;
  }
`;

const GlobalContent = styled.div`
  background-color: white;
  height: auto;
  min-height: calc(100vh - 483px);
  z-index: 1;
  padding: 50px;
  top: 100px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
  }
`;

const GlobalFooter = styled.footer`
  background-color: #772626;
  height: auto;
  display: flex;
  gap: 50px;
  flex-direction: column;
  color: white;
  width: 100%;
  padding: 20px;
  margin-top: 100px;
  position: relative;
  box-shadow: 0 -10px 15px rgba(0, 0, 0, 0.3);
`;

const FooterInformationSection = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${breakpoints.laptopL}) {
    flex-direction: column;
    text-align: center;
    gap: 3vh;
  }
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: auto;

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  position: relative;
`;

const MobileMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100vw;
  position: absolute;
  top: calc(0vh + 100px);
  left: 0;
  height: auto;
  background-color: #772626;
  padding: 3vh 40px 8vh 40px;
  gap: 2vh;

  p {
    border-bottom: 1px solid black;
  }

  @media (min-width: ${breakpoints.laptop}) {
    display: none;
  }

  @media (max-width: ${breakpoints.mobileL}) {
    align-items: center;
  }
`;

const LogoClicked = styled(Image)`
  &:hover {
    cursor: pointer;
  }
`;

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
    router.push("/auth/register");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleEventList = () => {
    router.push("/event-pub");
  };

  const handleHome = () => {
    router.push("/home");
  };

  return (
    <>
      <GlobalBox>
        <GlobalHeader>
          <LogoClicked
            src={logoWithTextIcon}
            alt="logo"
            width={150}
            onClick={handleHome}
          />
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
              <HeaderLink onClick={handleEventList}>
                Wyszukaj wydarzenie
              </HeaderLink>
              <HeaderLink onClick={handleLogin}>O nas</HeaderLink>
              <HeaderLink onClick={handleLogin}>Logowanie</HeaderLink>
              <HeaderLink onClick={handleRegistration}>Rejestracja</HeaderLink>
            </MobileMenu>
          )}
          <HeaderPanelSection aria-label="Główne menu nawigacyjne">
            <HeaderLink onClick={handleEventList}>
              Wyszukaj wydarzenie
            </HeaderLink>
            <HeaderLink onClick={handleLogin}>O nas</HeaderLink>
            <HeaderLink onClick={handleLogin}>Logowanie</HeaderLink>
            <HeaderLink onClick={handleRegistration}>Rejestracja</HeaderLink>
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
