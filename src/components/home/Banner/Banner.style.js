import styled from "styled-components";
import { motion } from "framer-motion";

export const BannerContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* font-size: 0.85rem; */
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1990px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 1820px) {
    font-size: 0.65rem;
  }
  @media screen and (max-width: 1260px) {
    flex-direction: column;
  }
`;

export const BannerBox = styled(motion.div)`
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: center;
  text-align: center;
  // height: 248px;
  max-width: 100%;
  background-image: ${(props) => props.bg};
  color: white;
  text-transform: uppercase;
  min-height: 19rem;

  h4 {
    font-weight: 700;
    font-size: 46px;
    text-align: center;
    /* margin: 0 0.5em; */
    line-height: 1;
    letter-spacing: 0.05em;
    b {
      font-weight: 700;
      font-size: 10.75rem;
      letter-spacing: 0;
    }
  }
  button {
    font-size: 18px;
    border-radius: 0px;
  }
  h6 {
    font-size: 34px;
    margin-right: auto;
    margin-right: 0;
    margin-left: min(1vw, 0.5em);
  }
  @media screen and (max-width: 1820px) {
    h5 b {
      font-size: 7rem;
    }
  }
  @media screen and (max-width: 1260px) {
    width: 100%;
    margin-top: 1em;
  }
`;
