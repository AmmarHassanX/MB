import { Stack } from "@mui/material";
import styled from "styled-components";
import { Swiper } from "swiper/react";

export const Container = styled(Stack)`
  width: 100%;
  padding-bottom: 5px;
  overflow: hidden;
  max-width: 1145px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  h6 {
    color: ${(props) => props.theme.palette.bg.primary};
    text-transform: capitalize;
    font-size: 1.94rem;
    margin-right: 10%;
    margin-top: 2em;
    margin-bottom: 0.2em;
    font-weight: 500;
  }
  @media only screen and (max-width: 768px) {
    // padding: 0 20px;
    h6 {
      margin-top: 2em;
    }
  }
`;

export const SwiperContainer = styled(Swiper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1145px;
  justify-content: center;
  // border-bottom: 1px solid rgba(119, 119, 119, 0.3);
  padding: 1rem 0;
  @media only screen and (max-width: 1498px) {
    min-width: 90%;
  }

  @media only screen and (max-width: 768px) {
    min-height: 20rem;
    max-width: 100vw;
  }
`;

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
  justify-content: center; /* Center the content vertically */
  text-align: center;
  padding: 1rem; /* Optional for spacing */
  // border: 1px solid ${(props) =>
    props.theme.palette.colors.primary}; /* Optional for styling */

  img {
    width: 100%;
    height: 100px;
    max-width: 110px; /* Set a fixed width */
    max-height: 147px; /* Set a fixed height */
    object-fit: contain; /* Ensures the image is cropped proportionally */
    // border-radius: 8px; /* Optional for rounded edges */
  }

  p {
    font-size: 1.875rem;
    font-weight: 700;
    color: #061c3c;
    margin: 0.5rem 0 0; /* Add some spacing above the text */
  }
`;

export const NavButton = styled.div`
  display: grid;
  place-items: center;
  border-radius: 0.94rem;
  color: var(--text-2);
  cursor: pointer;
  margin-right: ${(props) => (props.left ? "0" : "2em")};
  margin-left: ${(props) => (props.left ? "2em" : "0em")};
  margin-top: 0;
  font-size: 2rem;
  &:hover {
    /* background: #e8e4e4; */
    color: var(--text);
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  /* position: absolute; */
`;
