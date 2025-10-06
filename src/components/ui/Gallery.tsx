import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

type ButtonProps = {
  left?: string;
};

const Button = styled.button<ButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.6);
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  ${(props) => (props.left ? "left:10px" : "right:10px")}
`;

const Gallery = ({ images }: any) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <CarouselWrapper>
      <AnimatePresence>
        <Image
          key={images[index]}
          src={images[index]}
          alt={`Image ${index}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <Button left="true" onClick={prev}>
        ‹
      </Button>
      <Button onClick={next}>›</Button>
    </CarouselWrapper>
  );
};

export default Gallery;
