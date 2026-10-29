import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";
import Image from "next/image";

export const GlobalHeader = styled.header<{ $isHome?: boolean }>`
  background-color: #772626;
  height: ${(props) => (props.$isHome ? "80px" : "100px")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px ${(props) => (props.$isHome ? "max(32px, calc((100vw - 1280px) / 2))" : "20px")};
  box-shadow: ${(props) =>
    props.$isHome
      ? "0 12px 34px rgba(36, 18, 18, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.16)"
      : "0 10px 15px rgba(0, 0, 0, 0.3)"};
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  border: none;
  border-radius: 0;
  backdrop-filter: none;
  z-index: 500;
  color: white;

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) =>
      props.$isHome &&
      `
        height: 72px;
        padding: 8px 20px;
      `}
  }
`;

export const HeaderPanelSection = styled.nav<{ $isHome?: boolean }>`
  display: flex;
  gap: 20px;
  font-size: 20px;

  ${(props) =>
    props.$isHome &&
    `
      align-items: center;
      gap: 8px;
      font-size: 16px;

      & > a { padding: 10px 15px; }
      & > a:nth-child(3) {
        margin-left: 8px;
        border-radius: 999px;
        background: #f2b705;
        color: #241b1b;
        font-weight: 750;
      }
      & > a:nth-child(3):hover { background: #ffcb2f; color: #241b1b; }
    `}

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
  padding: 50px;
  top: 100px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
  }
`;

export const GlobalFooter = styled.footer<{ $isHome?: boolean }>`
  background-color: #772626;
  height: auto;
  display: flex;
  gap: ${(props) => (props.$isHome ? "34px" : "50px")};
  flex-direction: column;
  color: white;
  width: 100%;
  padding: ${(props) =>
    props.$isHome ? "56px max(32px, calc((100vw - 1180px) / 2)) 24px" : "20px"};
  margin-top: ${(props) => (props.$isHome ? "88px" : "100px")};
  position: relative;
  box-shadow: ${(props) =>
    props.$isHome ? "0 -1px 0 rgba(119, 38, 38, 0.08)" : "0 -10px 15px rgba(0, 0, 0, 0.3)"};

  ${(props) =>
    props.$isHome &&
    `
      background: linear-gradient(135deg, #702424, #4e1c1e);
      & > span {
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.18);
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.86rem;
      }
    `}

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) => props.$isHome && "padding: 44px 24px 22px; margin-top: 64px;"}
  }
`;

export const FooterInformationSection = styled.div<{ $isHome?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${(props) =>
    props.$isHome &&
    `
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 44px;
      align-items: center;

      & > div:first-child { max-width: 650px; gap: 14px !important; }
      & > div:first-child p:first-child {
        max-width: 590px;
        margin: 0 0 8px;
        color: white;
        font-size: clamp(1.35rem, 2.4vw, 1.8rem) !important;
        font-weight: 650;
        line-height: 1.35;
      }
      & > div:first-child p:not(:first-child) {
        margin: 0;
        color: rgba(255, 255, 255, 0.76);
        font-size: 0.95rem;
      }
      & > div:last-child {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      & > div:last-child img {
        width: 50px;
        height: 50px;
        padding: 11px;
        border: 2px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        background: #fff;
        transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
      }
      & > div:last-child img:hover {
        transform: translateY(-3px);
        border-color: #f2b705;
        background: #f2b705;
      }
    `}

  @media (max-width: ${breakpoints.laptopL}) {
    flex-direction: column;
    text-align: center;
    gap: 3vh;
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) =>
      props.$isHome &&
      `
        grid-template-columns: 1fr;
        text-align: center;
        gap: 28px;
        & > div:first-child { margin: auto; }
        & > div:last-child { justify-content: center; }
      `}
  }
`;

export const LogoWrapper = styled.div<{ $isHome?: boolean }>`
  width: ${(props) => (props.$isHome ? "184px" : "200px")};
  height: auto;

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  position: relative;
`;

export const MobileMenu = styled.nav<{ $isHome?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100vw;
  position: absolute;
  top: ${(props) => (props.$isHome ? "80px" : "100px")};
  left: 0;
  height: auto;
  background-color: #772626;
  border-radius: 0;
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

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) => props.$isHome && "top: 72px; width: 100%;"}
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
