import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";
import Image from "next/image";

export const GlobalHeader = styled.header`
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

export const HeaderPanelSection = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 22px;

  @media (max-width: ${breakpoints.laptop}) {
    display: none;
  }
`;

export const HeaderPanelMenu = styled.div`
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

export const HeaderLink = styled.a`
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: #772626;
    border-radius: 5px;
  }
`;

export const GlobalContent = styled.div`
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

export const GlobalFooter = styled.footer`
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

export const FooterInformationSection = styled.footer`
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

export const LogoWrapper = styled.div`
  width: 200px;
  height: auto;

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  position: relative;
`;

export const MobileMenu = styled.nav`
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

export const LogoClicked = styled(Image)`
  &:hover {
    cursor: pointer;
  }
`;

export const GlobalBox = styled.div`
  background-color: white;
  height: 100vh;
`;
