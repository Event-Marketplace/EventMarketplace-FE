"use client";

import styled from "styled-components";
import Image from "next/image";
import concerBgImg from "@/images/bg.jpg";
import Gallery from "../ui/Gallery";
import { useEffect } from "react";
import { apiAxiosClient } from "@/lib/apiAxiosClient";
import { getTest } from "@/app/api/getTest";
import { breakpoints } from "@/styles/breakpoints";

import es1 from "@/images/events/motocros.jpg";
import es2 from "@/images/events/nascar.jpg";
import es3 from "@/images/events/snowEvents.jpg";
import es4 from "@/images/zlot-samochodowy.jpg";
import es5 from "@/images/maraton.jpg";

import eo1 from "@/images/events/audience.jpg";
import eo2 from "@/images/events/audience2.jpg";
import eo3 from "@/images/events/drinks.jpg";
import eo4 from "@/images/events/weeding.jpg";
import eo5 from "@/images/koncert.jpg";

const HomeBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroSection = styled.div<{ bg: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-bottom: 5%;
  width: 100vw;
  background-color: #faf7f5;
  padding: 100px 0;
  position: relative;

  &::before {
    content: "";
    position: absolute; /* musi być absolutny */
    inset: 0; /* top:0; left:0; right:0; bottom:0; */
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center;
    opacity: 0.3; // <- tylko tło, tekst nie zmienia przezroczystości
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1; // tekst i inne elementy nad overlay
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8vh 5vw;
    text-align: center;
    margin-top: 2vh;
  }
`;

const Title = styled.h1`
  font-style: italic;
  font-size: 42px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }
`;

const SecondTitle = styled.h3`
  font-style: italic;
`;

const InfoContent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 5%;
  font-size: 22px;
  background-color: #f2b705;
  padding: 120px 50px;
  font-family: "Montserrat", sans-serif;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 18px;
    padding: 8vh 6vw;
  }
`;

const ImagesSection = styled.div`
  width: 100%;
  display: flex;
  min-height: 40vh;
  gap: 2vw;

  @media (max-width: ${breakpoints.laptopL}) {
    flex-wrap: wrap;
    min-height: 80vh;
    gap: 3vh;
    width: 90%;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-wrap: no-wprap;
    min-height: 30vh;
    width: 50%;
  }
`;

const InfoContent2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5%;
  font-weight: 700;
  font-size: 22px;
  background-color: #faf7f5;
  padding: 50px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 15px;
    padding: 2vw 1vh;
    margin-top: 2vh;
    margin-bottom: 2vh;
    background-color: white;
    text-align: center;
  }
`;

const HomeLayout = () => {
  const sportPhotos = [es1.src, es2.src, es3.src, es4.src, es5.src];
  const otherPhotos = [eo1.src, eo2.src, eo3.src, eo4.src, eo5.src];

  return (
    <>
      <HomeBox>
        <HeroSection bg={concerBgImg.src}>
          <Title>Odkryj wydarzenia w Twojej okolicy</Title>
          <SecondTitle>
            Sport, muzyka, motoryzacja i wiele więcej - znajdź event dla siebie.
          </SecondTitle>
        </HeroSection>
        <ImagesSection>
          <Gallery images={sportPhotos} />
          <Gallery images={otherPhotos} />
        </ImagesSection>
        <InfoContent>
          <p>Witaj w Evently — Twoim centrum wydarzeń</p>
          Odkrywaj, organizuj i dołączaj do wydarzeń, które naprawdę Cię
          interesują. Niezależnie od tego, czy szukasz koncertu, maratonu,
          konferencji czy lokalnego spotkania – u nas znajdziesz wszystko w
          jednym miejscu.
          <p style={{ display: "flex", flexDirection: "column" }}>
            <span>
              🔹 Znajdź wydarzenia w Twojej okolicy — przeglądaj według
              kategorii, daty lub lokalizacji.{" "}
            </span>
            <span>
              🔹 Zapisz się jednym kliknięciem — bez zbędnych formularzy.
            </span>
            <span>
              🔹 Organizuj własne eventy — dodaj opis, zdjęcia, lokalizację i
              zarządzaj zapisami uczestników.
            </span>
          </p>
          <p>
            Evently łączy organizatorów z uczestnikami, ułatwia promocję
            wydarzeń i sprawia, że planowanie wolnego czasu staje się
            przyjemnością. Dołącz do społeczności, która żyje wydarzeniami! 🎉
          </p>
        </InfoContent>
        <InfoContent2>
          <p>
            Zacznij już teraz 🔸 Przeglądaj najciekawsze wydarzenia 🔸 Dołącz do
            tysięcy uczestników 🔸 Stwórz własny event i pokaż go światu
          </p>
        </InfoContent2>
      </HomeBox>
    </>
  );
};

export default HomeLayout;
