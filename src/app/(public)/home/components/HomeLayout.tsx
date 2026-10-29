"use client";

import styled from "styled-components";
import Link from "next/link";
import concerBgImg from "@/images/bg.jpg";
import Gallery from "../../../../components/ui/Gallery";

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

const HomeBox = styled.main`
  --wine: #772626;
  --ink: #241b1b;
  --muted: #655b58;
  --gold: #f2b705;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--ink);
`;

const HeroSection = styled.section<{ $background: string }>`
  isolation: isolate;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  width: calc(100% + 100px);
  min-height: min(680px, 76vh);
  margin: -50px -50px 0;
  padding: 100px max(8vw, calc((100vw - 1180px) / 2));
  color: white;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    inset: 0;
    background: url(${(props) => props.$background}) center 45% / cover
      no-repeat;
    transform: scale(1.02);
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(25, 13, 13, 0.84),
      rgba(39, 20, 20, 0.5) 58%,
      rgba(39, 20, 20, 0.12)
    );
  }

  @media (max-width: 700px) {
    width: calc(100% + 40px);
    min-height: 590px;
    margin: -10px -20px 0;
    padding: 76px 26px;
    background-position: 58% center;
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  color: #ffe08a;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 0;
  font-size: clamp(2.8rem, 6.4vw, 5.8rem);
  font-weight: 750;
  letter-spacing: -0.055em;
  line-height: 0.99;
  text-wrap: balance;
`;

const Subtitle = styled.p`
  max-width: 620px;
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  line-height: 1.7;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  border: 1px solid var(--gold);
  border-radius: 999px;
  background: var(--gold);
  color: #241b1b;
  font-weight: 750;
  transition:
    transform 160ms ease,
    background 160ms ease;

  &:hover {
    transform: translateY(-2px);
    background: #ffcb2f;
  }
  &:focus-visible {
    outline: 3px solid white;
    outline-offset: 3px;
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  color: white;
  font-weight: 700;
  transition: background 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.13);
  }
  &:focus-visible {
    outline: 3px solid var(--gold);
    outline-offset: 3px;
  }
`;

const IntroSection = styled.section`
  width: min(100%, 1180px);
  padding: 100px 0 76px;

  @media (max-width: 700px) {
    padding: 70px 4px 56px;
  }
`;

const SectionLabel = styled.p`
  margin: 0 0 14px;
  color: var(--wine);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const IntroTitle = styled.h2`
  max-width: 750px;
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.35rem);
  letter-spacing: -0.045em;
  line-height: 1.08;
  text-wrap: balance;
`;

const IntroCopy = styled.p`
  max-width: 760px;
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.8;
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  width: min(100%, 1180px);
  margin-bottom: 92px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    margin-bottom: 72px;
  }
`;

const BenefitCard = styled.article`
  padding: 27px 26px;
  border: 1px solid #eee7e3;
  border-radius: 18px;
  background: #fffdfa;
  box-shadow: 0 12px 34px rgba(48, 27, 20, 0.045);
`;

const BenefitIcon = styled.span`
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 13px;
  background: #fff1c7;
  font-size: 1.2rem;
`;

const BenefitTitle = styled.h3`
  margin: 18px 0 8px;
  font-size: 1.08rem;
`;

const BenefitCopy = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
`;

const GallerySection = styled.section`
  width: min(100%, 1180px);
  padding: 0 0 98px;
`;

const GalleryHeading = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const GalleryTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  letter-spacing: -0.04em;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: end;
  gap: 24px;

  > div {
    position: relative;
    height: clamp(320px, 38vw, 440px);
    border: 1px solid rgba(54, 32, 25, 0.1);
    border-radius: 24px;
    box-shadow: 0 20px 48px rgba(43, 25, 18, 0.14);
    transition: transform 220ms ease, box-shadow 220ms ease;
  }

  > div:first-child {
    height: clamp(360px, 43vw, 500px);
  }

  > div:hover {
    transform: translateY(-5px);
    box-shadow: 0 26px 56px rgba(43, 25, 18, 0.2);
  }

  > div > img {
    height: 100%;
  }

  > div > button {
    width: 42px;
    height: 42px;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.65);
    background: rgba(35, 22, 20, 0.48);
    color: white;
    backdrop-filter: blur(8px);
  }

  > div > button:hover {
    background: rgba(35, 22, 20, 0.78);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 18px;

    > div,
    > div:first-child {
      height: clamp(270px, 72vw, 360px);
    }
  }
`;

const ClosingSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  width: min(100%, 1180px);
  margin-bottom: 22px;
  padding: 38px 42px;
  border-radius: 22px;
  background: #f8f1ec;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
    padding: 28px;
  }
`;

const ClosingTitle = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  letter-spacing: -0.035em;
`;

const ClosingCopy = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
`;

const HomeLayout = () => {
  const sportPhotos = [es1.src, es2.src, es3.src, es4.src, es5.src];
  const otherPhotos = [eo1.src, eo2.src, eo3.src, eo4.src, eo5.src];

  return (
    <HomeBox>
      <HeroSection $background={concerBgImg.src}>
        <Eyebrow>Event Marketplace · wydarzenia blisko Ciebie</Eyebrow>
        <Title>Znajdź wydarzenie, które zostanie z Tobą na dłużej.</Title>
        <Subtitle>
          Od koncertów i spotkań po sportowe emocje. Odkrywaj, co dzieje się w
          Twojej okolicy, i zaplanuj swój kolejny wyjątkowy dzień.
        </Subtitle>
        <HeroActions>
          <PrimaryLink href="/events-public">
            Odkrywaj wydarzenia <span aria-hidden="true">↗</span>
          </PrimaryLink>
          <SecondaryLink href="/register">
            Dodaj własne wydarzenie
          </SecondaryLink>
        </HeroActions>
      </HeroSection>

      <IntroSection>
        <SectionLabel>Wszystko zaczyna się od pomysłu</SectionLabel>
        <IntroTitle>Więcej planów. Mniej szukania.</IntroTitle>
        <IntroCopy>
          Event Marketplace łączy ludzi z wydarzeniami, które naprawdę ich interesują.
          Przeglądaj propozycje w swojej okolicy, dołączaj do wybranych wydarzeń
          lub pokaż innym to, co sam organizujesz.
        </IntroCopy>
      </IntroSection>

      <Benefits>
        <BenefitCard>
          <BenefitIcon aria-hidden="true">⌖</BenefitIcon>
          <BenefitTitle>Odkrywaj lokalnie</BenefitTitle>
          <BenefitCopy>
            Znajduj wydarzenia dopasowane do miejsca i tego, co lubisz.
          </BenefitCopy>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon aria-hidden="true">✦</BenefitIcon>
          <BenefitTitle>Dołączaj z łatwością</BenefitTitle>
          <BenefitCopy>
            Wybierz interesujące wydarzenie i zaplanuj swój udział.
          </BenefitCopy>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon aria-hidden="true">＋</BenefitIcon>
          <BenefitTitle>Organizuj po swojemu</BenefitTitle>
          <BenefitCopy>
            Opublikuj swój event i zaproś do niego nowych uczestników.
          </BenefitCopy>
        </BenefitCard>
      </Benefits>

      <GallerySection>
        <GalleryHeading>
          <div>
            <SectionLabel>Inspiracje na wolny czas</SectionLabel>
            <GalleryTitle>Co Cię dziś kręci?</GalleryTitle>
          </div>
          <SecondaryLink href="/events-public">Zobacz wydarzenia</SecondaryLink>
        </GalleryHeading>
        <GalleryGrid>
          <Gallery images={sportPhotos} />
          <Gallery images={otherPhotos} />
        </GalleryGrid>
      </GallerySection>

      <ClosingSection>
        <div>
          <ClosingTitle>Masz pomysł na wydarzenie?</ClosingTitle>
          <ClosingCopy>
            Stwórz event i znajdź osoby, które chcą w nim uczestniczyć.
          </ClosingCopy>
        </div>
        <PrimaryLink href="/register">
          Zacznij organizować <span aria-hidden="true">↗</span>
        </PrimaryLink>
      </ClosingSection>
    </HomeBox>
  );
};

export default HomeLayout;
