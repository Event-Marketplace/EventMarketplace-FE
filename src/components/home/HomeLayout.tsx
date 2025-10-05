"use client";

import styled from "styled-components";
import Image from "next/image";
import concertImg from "@/images/koncert.jpg";
import carImg from "@/images/zlot-samochodowy.jpg";
import marathonImg from "@/images/maraton.jpg";
import Gallery from "../ui/Gallery";

const HomeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Title = styled.h1`
  font-style: italic;
  font-size: 42px;
`;

const SecondTitle = styled.h3`
  font-style: italic;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5%;
  font-weight: 700;
  font-size: 22px;
`;

const ImagesSection = styled.div`
  width: 100%;
  display: flex;
  min-height: 400px;
`;

const HomeLayout = () => {
  const photos = [carImg.src, concertImg.src, marathonImg.src];

  return (
    <>
      <HomeBox>
        <HeroSection>
          <Title>Odkryj wydarzenia w Twojej okolicy</Title>
          <SecondTitle>
            Sport, muzyka, motoryzacja i wiele więcej - znajdź event dla siebie.
          </SecondTitle>
        </HeroSection>
        <InfoContent>
          <p>Drogi użytkowniku, witamy cię w EventMarketplace!</p>
          <p>
            Znajdziesz tutaj oferty wydarzeń różnego rodzaju na które możesz się
            zapisać. Jeśli jesteś zainteresowany zachęcamy Cię do rejestracji w
            naszym serwisie!
          </p>
          <p>
            Jesteś osobą, która organizuje Eventy? Trafiłeś świetnie! Możesz
            podzielić się z innymi swoimi wydarzeniami, które organizujesz i
            pozyskiwać nowych klientów.
          </p>
        </InfoContent>
        <ImagesSection>
          <Gallery images={photos} />
        </ImagesSection>
      </HomeBox>
    </>
  );
};

export default HomeLayout;
