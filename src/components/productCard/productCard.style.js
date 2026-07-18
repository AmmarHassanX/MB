import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import styled from "styled-components";
export const ProductCard = styled.div`
  padding: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
  z-index: 1; /* Higher value puts it in front */
  /* border-radius: 5.67px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) ease, border-color var(--dur-fast) ease;
  border-radius: var(--radius-md);
  /* border: 1px solid #eceaea; */
  cursor: pointer;
  color: ${(props) => props.theme.palette.colors.secondary};
  // background-color: ${(props) => props.color};
  // box-shadow: 0px 6px 16px 0px #0000000d;
  .addToCartContainer {
    opacity: 1;
  }

  &:hover {
    .imageBox {
      opacity: 0.5;
    }

    .imageContainer {
      // border: 1px dashed var(--accent);
    }
    transform: translateY(-6px);
    border-color: var(--accent);
    box-shadow: var(--shadow-card);
    .quickView,
    .addToCartContainer {
      opacity: 1;
    }
    .tilted-card {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(3.6deg); /* Keep the transform intact */
    }
  }

  @media only screen and (max-width: 900px) {
    justify-content: center;
    &:hover {
      .tilted-card {
        opacity: 0;
      }
    }
  }
`;

export const TiltedCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--accent-soft);
  position: absolute; /* Positioned relative to the container */
  z-index: -1; /* Lower value puts it behind */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%) rotate(3.6deg);
  opacity: 0; /* Initially hidden */
  transition: opacity 0.4s ease, transform 0.4s ease;
  border-radius: 22px;
`;
export const ImageBox = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  border: 1px solid #efe9e9;
  place-items: center;
  position: relative;
  max-width: 100%;
  // min-height: 15rem;
  // margin: 12px 0;
  transition: all 0.6s;
  padding: 0.5rem 0 2rem 0;
  border-radius: 10px;
  // height: 260px;
  // max-height: 260px;
  &:hover {
    .imageBox {
      opacity: 0.5;
    }
  }
  @media only screen and (max-width: 600px) {
    // height: 210px;
    // max-height: 189px;
  }
`;
export const OfferCircle = styled.div`
  width: 2.69rem;
  height: 2.69rem;
  border-radius: 50%;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.bg.primary};
  color: ${(props) => props.theme.palette.bg.primary};
  font-weight: 400;
  font-size: 0.81rem;
  display: grid;
  place-items: center;
  position: absolute;
  top: 1em;
  right: 1em;

  transition: 0.3s;

  z-index: 2;
`;
export const QuickView = styled.div`
  // min-width: 15rem;
  // height: 100%;
  // display: flex;
  z-index: 99;

  opacity: 0;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
export const QuickViewBtn = styled.div`
  place-items: center;
  font-size: 0.85rem;
  padding: 0.8rem;
  // width: 43px;
  // height: 43px;
  background-color: var(--accent);
  border-radius: 50%;
  text-transform: capitalize;
  color: #ffffff;
  z-index: 2;
  transition: 0.6s;
  display: flex;
  cursor: pointer;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
  // box-shadow: 0 0 0 1px var(--accent);
  svg {
    color: #ffffff;
    font-size: 1.5rem;
    margin-right: ${(props) => (props.onlyIcon ? 0 : "4px")};
    // color: ${(props) => props.theme.palette.colors.black};
  }
  &:hover {
    letter-spacing: 1px;
    background-color: var(--surface);
    color: var(--accent);
    box-shadow: 0 0 0 1px #0c525590;
    svg {
      color: var(--accent);
    }
  }
`;
export const SelectOptionBtn = styled.div`
  place-items: center;
  font-size: 0.85rem;
  width: 43px;
  height: 43px;
  background-color: white;
  border-radius: 3px;
  text-transform: capitalize;
  color: #323232;
  border-radius: 2.375rem;
  z-index: 2;
  // transition: 0.6s;
  display: grid;
  cursor: pointer;
  font-weight: 500;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.19);
  svg {
    font-size: 17px;
  }
  &:hover {
    letter-spacing: 1px;
  }
`;
export const ProductContent1 = styled.div`
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  padding: 0 0.8rem;
  width: 100%;
  .title {
    font-size: 0.8rem;
    // text-decoration: underline;
    color: ${(props) => props.theme.palette.colors.white};
    font-weight: 600;
    // text-align: center;
    margin-top: 0.5em;
  }
`;

export const ProductContent = styled.div`
  /* background: var(--surface); */
  height: 50%;
  display: flex;
  gap: 0.5rem;
  // padding-bottom: 1rem;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
  margin: auto 0;
  // border-radius: 0px 0px 22px 22px;
  @media only screen and (max-width: 768px) {
    // padding: 0 0.8rem;
  }
  .title {
    font-size: 0.8rem;
    // text-decoration: underline;
    color: ${(props) => props.theme.palette.colors.white};
    // font-weight: 600;
    // text-align: center;
    margin: 0.5rem 0;
  }
`;

export const ProductName = styled.h4`
  font-size: 18px;
  font-weight: 300;
  color: var(--text);
  height: 3.2rem;
  // padding: 0 2rem;
  // width: 90%;
  // margin: 0 auto;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  // text-align: left;
  max-width: 100%;
  // font-weight: 500;
  // padding: 0 0.5rem;
  @media only screen and (max-width: 800px) {
    font-size: 17px;
    height: 4.8rem;
    // padding: 0 1rem;
    max-height: 4.55rem;
  }
  @media only screen and (max-width: 608px) {
    font-size: 17px;
    height: 4.8rem;
    // padding: 0 1rem;
    max-height: 4.55rem;
  }
`;

export const ProductPriceContainer = styled.div`
  width: 100%;
  // display: block;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const ProductPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  justify-content: center;
  p {
    font-size: 22px;
    font-weight: 500;
    color: var(--accent);
    // margin-left: 4px;
    @media only screen and (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
  del {
    color: var(--text-3);
    font-size: 17px;
    font-weight: 400;
    // margin-left: 4px;
    @media only screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }
  @media only screen and (max-width: 900px) {
    gap: 0.5rem;
    p {
      font-size: 17px;
    }
    del {
      font-size: 14px;
    }
  }
`;
export const ProductRating = styled(Rating)`
  margin-bottom: 0.6em;
`;

export const LoginToAddButton = styled.span`
  width: 100%;
  height: 100%;
  // box-shadow: inset 0 -4px 0px 0px #00000010;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: 1s;
  padding: 1rem 0px;
  // border: 1px solid ${(props) => props.theme.palette.colors.primary};
  border-radius: 10px;
  // background-color: #d6e1f9;
  /* color: #ffffff; */
  font-size: 16px;
  font-weight: 700;
  max-height: 45px;
  text-transform: capitalize;
  svg {
    font-size: 1.4rem;
    margin-right: 0.4rem;
  }
  &:hover {
    // background-color: ${(props) => props.theme.palette.colors.primary};
    // border: 1px solid ${(props) => props.theme.palette.colors.white};
    /* color: ${(props) => props.theme.palette.colors.white}; */
  }
  .icon {
    display: flex;
    font-size: 1.4rem;
  }
`;

export const ProductButton = styled(motion.button)`
  width: 100%;
  // max-width: 211px;
  padding: 0 0.75rem;
  font-size: 13.5808px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent);
  border: 1px solid var(--accent);
  // border: 1px solid #000000;
  cursor: pointer;
  color: #ffffff;
  opacity: ${(props) => props.disabled && ".6"};
  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    background: ${(props) => props.theme.palette.colors.white};
    color: var(--accent);
  }
  @media only screen and (max-width: 900px) {
    margin: 0.5rem 0 0 0;
    width: 100%;
  }
`;

export const LoginButton = styled(motion.button)`
  width: 100%;
  margin: auto;
  // max-width: 211px;
  padding: 0 0.75rem;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-radius: 10px;
  border: 1px solid var(--accent);
  cursor: pointer;
  color: var(--text);
  opacity: ${(props) => props.disabled && ".6"};
  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    background: ${(props) => props.theme.palette.colors.primary};
    color: #ffffff;
  }
  @media only screen and (max-width: 768px) {
    // margin: 0.5rem 0 0 0;
  }
`;

export const ProductAddButton = styled.span`
  // margin: 0 1rem;
  width: 100%;
  // box-shadow: inset 0 -4px 0px 0px #00000010;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: 1s;
  gap: 0.5rem;
  padding: 0.75rem 0px;
  white-space: no-wrap;
  // border: 1px solid ${(props) => props.theme.palette.colors.primary};
  // border-radius: 2.2rem;
  // background-color: ${(props) => props.theme.palette.bg.header};
  // color: ${(props) => props.theme.palette.bg.white};
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  // height: 31px;
  svg {
    font-size: 1.4rem;
    // margin-right: 0.4rem;
  }
  &:hover {
    // background-color: ${(props) => props.theme.palette.colors.primary};
    // border: 1px solid ${(props) => props.theme.palette.colors.white};
    // color: ${(props) => props.theme.palette.colors.white};
  }
  .icon {
    display: flex;
    font-size: 1.8rem;
  }
  .hideContent {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    flex-shrink: 1; /* Allow text to shrink */
  }

  @media only screen and (max-width: 768px) {
    font-size: 0.9rem; /* Smaller font for smaller screens */
    .hideContent {
      white-space: normal; /* Allow text to wrap on small screens */
      text-align: center; /* Center-align the text */
    }
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* justify-content: center; */
  width: 90%;
  /* margin: 0rem auto; */
  // padding-top: 1rem;
  // border-top: 1px solid #26262620;
  .review {
    // margin-left: 0.4rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.palette.colors.black}80;
  }
`;

/////quick view popup
export const ProductQuickView = styled.div`
  // width: ${(props) => props.theme.maxWidth.home};
  max-width: 95vw;
  padding: 1em;
  width: 100%;
  position: relative;
  .closeIcon {
    top: 1.06rem;
    right: 1rem;
    position: absolute;
    transition: all 0.6s;
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
      color: #a2d43e;
    }
  }
  /* @media only screen and (max-width: 786px) {
    display: none;
  } */
`;
