import styled from "styled-components";
import { Stack } from "@mui/material";
import { Swiper } from "swiper/react";
import { motion } from "framer-motion";
import { H1 } from "../../../../../utilities/theme/components";

export const ProductsContainer = styled(Stack)`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h6 {
    color: #639c84;
    font-size: 2.1rem;
    font-weight: 400;
    margin-top: 1em;
    margin-bottom: 0.1em;
    text-transform: uppercase;
    font-family: ${(props) => props.theme.typography.h1.fontFamily};
  }
  @media only screen and (max-width: 748px) {
    /* min-height: 650px; */
    h6 {
      margin-top: 20px;
      font-size: 1.7rem;
    }
  }
`;
export const ProductSwiperContainer = styled(Swiper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  /* min-height: 480px; */
  max-width: ${(props) => props.theme.maxWidth.home};
  margin: 5em 0;
  margin-top: 0;

  @media only screen and (max-width: 748px) {
    /* margin: 2.8em 0; */
    margin-top: 3.8rem;
  }
`;
export const ProductSliderHeader = styled(H1)`
  margin-bottom: 1.2em;
  @media only screen and (max-width: 748px) {
    margin-bottom: 0.8em;
  }
`;
export const ProductsBrandImg = styled.img`
  width: 218px;
  height: 69px;
  object-fit: contain;
  margin: auto;
`;

export const NavButton = styled.div`
  min-width: 57px;
  min-height: 57px;
  margin: ${(props) => props.margin};
  z-index: 2;
  border-radius: 50%;
  background: #89ad3b;
  cursor: pointer;
  display: grid;
  place-items: center;
  @media screen and (max-width: 768px) {
    margin: ${(props) => props.marginSmall};
  }
`;

///////buttons

export const Button = styled(motion.button)`
  width: ${(props) => props.width || "37.18rem"};
  height: 5.68rem;
  display: grid;
  place-items: center;
  color: var(--text);
  font-weight: bold;
  font-size: 1.875rem;
  border-radius: 3rem;
  background: ${(props) => props.theme.palette.bg.secondary};
  text-transform: uppercase;
  margin-bottom: 2em;
  /* transition: 0.4s; */
  cursor: pointer;
  border: none;
  z-index: 1;
  @media only screen and (max-width: 748px) {
    width: 19rem;
    font-size: 1.1rem;
    height: 4.4rem;
    max-width: 80%;
  }
`;

export const HomeButton = ({ children, ...props }) => {
  return (
    <Button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </Button>
  );
};
