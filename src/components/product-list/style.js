import { motion } from "framer-motion";
import styled from "styled-components";
export const ProductsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: #e7eff5;
  overflow: hidden;
  scroll-behavior: smooth;
`;
export const ProductsHeader = styled.div`
  width: 100%;
  background: ${(props) => props.theme.palette.bg.secondary};
  display: grid;
  place-items: center;
  height: 119px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--text) !important;
  }
  @media only screen and (max-width: 640px) {
    height: 80px;
    h2,
    h3 {
      font-size: 32px;
    }
  }
`;

////////routebar
export const NavHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.88rem;
  height: 12rem;
  // background: url("/images/home/banner/banner-3.png");
  background-color: #00000010;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  max-width: 100vw;
  text-overflow: ellipsis;
  h4 {
    font-size: 32px;
    line-height: 39.01px;
    max-width: 50%;
    color: var(--text);
    font-weight: 800;
    word-break: break-word;
    text-align: center;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  @media only screen and (max-width: 768px) {
    h4 {
      font-size: 22px;
      line-height: 25.01px;
      max-width: 80%;
    }
  }
`;
export const ProductButton = styled(motion.button)`
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.75em 1.4em;
  background-color: ${(props) => props.theme.palette.bg.primary};
  border-radius: 1.56rem;
  border: none;
  cursor: pointer;
  color: white;
  opacity: ${(props) => props.disabled && ".6"};
  &:focus {
    border: none;
    outline: none;
  }
`;

export const ProductsContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.0625rem 0.5rem;
  // background-color: white;
  // margin-top: 1rem;
  gap: 1rem;
  @media screen and (max-width: 1400px) {
    // padding: 0 1em;
  }
  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
`;
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem 0;
  grid-row-gap: 22px;
  // margin-bottom: 4em;
  @media only screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem 0.5rem;
  }
  @media only screen and (max-width: 580px) {
    grid-template-columns: 1fr 1fr;
    padding-top: 0rem;
    /* width: 100vw; */
    margin-top: 1em;
    grid-gap: 1rem;
  }
`;

export const ProductsNotFound = styled.div`
  /* width: 90%; */
  height: 5rem;
  width: 50vw;
  max-width: 950px;
  display: grid;
  place-items: center;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
  font-size: 36px;
  margin: 2rem 0;
  margin-bottom: 25vh;
  background: #ef7922;
  background: #ffc403;
  background: ${(props) => props.theme.palette.bg.secondary};
  color: ${(props) => props.theme.palette.colors.black};
  @media only screen and (max-width: 1280px) {
    width: 90vw;
    font-size: 1.5rem;
  }
`;

////category bar

export const CategoryBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1em 2em;
  background: ${(props) => props.theme.palette.bg.primary};
  height: 5rem;
  cursor: pointer;
  p {
    color: #fff;
    margin-left: 0.5em;
    font-size: 1.6rem;
    letter-spacing: 0.01em;
    font-weight: 500;
    text-transform: uppercase;
  }
`;
