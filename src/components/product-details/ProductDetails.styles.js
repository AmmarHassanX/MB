import styled from "styled-components";

export const ProductDetailsSection = styled.section`
  width: 100%;
  // background: #e7eff5;
  // display: grid;
  // place-items: center;
  .red {
    color: var(--text);
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
export const ProductDetailsContainer = styled.section`
  width: 100%;
  max-width: 1400px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 1rem auto;
  // background: var(--surface);
  @media only screen and (max-width: 768px) {
    padding: 0 4px;
  }
`;

export const ProductView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  // padding-top: 2rem;
  .red {
    color: var(--text);
  }
  hr {
    // border-top: 1px solid;
    border-color: var(--border);
    width: 100%;
    // margin-bottom: 2rem;
    // max-width: 700px;
  }
  .outofstock {
    padding: 1em 0em;
    font-size: 2rem;
    color: #ff0000;
    text-transform: capitalize;
  }

  @media only screen and (max-width: 1168px) {
    flex-direction: column;
    padding-top: 2rem;
  }
`;
export const ProductImageContainer = styled.div`
  width: 60%;
  max-width: 600px;
  height: 100%;
  // max-height: 600px;
  margin-top: 1em;
  margin-right: 0;
  position: relative;
  padding: 0 0rem;
  @media only screen and (max-width: 1168px) {
    width: 100%;
    margin-top: 0;
  }
`;

export const TiltedImageCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2e2e6a;
  position: absolute; /* Positioned relative to the container */
  z-index: -2; /* Lower value puts it behind */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%) rotate(-3.24deg);
  // opacity: 0; /* Initially hidden */
  transition: opacity 0.4s ease, transform 0.4s ease;
  border-radius: 22px;
  box-shadow: 0px 6px 16px 0px #0000000d;
`;

export const ProductShortDescriptions = styled.div`
  word-break: break-word;
  margin-top: 10px;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 300;
  color: #3d3d3d;
  // padding-top: 0.5rem;
  ul {
    padding-left: 1em;
  }
`;

export const ProductDetailsBox = styled.div`
  // max-width: 900px;
  width: 100%;
  display: flex;
  padding-left: 2rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  // width: 40%;
  @media only screen and (max-width: 1166px) {
    max-width: 100%;
    width: 100%;
    min-width: 90%;
    padding: 0 1%;
  }
`;
export const ProductDetailedName = styled.h3`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text);
  word-break: break-word;
  margin: 1rem 0 1rem 0;
  max-width: 100%;
  // line-height: 3.063rem;
  // color: ${(props) => props.theme.palette.colors.black};
  @media only screen and (max-width: 1168px) {
    max-width: 90%;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }
`;

export const AttachmentChip = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.colors.primary};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const ProductDetailsTitle = styled(Row)`
  // font-weight: 500;
  // margin: 0.8rem 0;
  // margin-bottom: 1rem;
  padding-top: 13px;
  display: flex;
  align-items: center;
  svg {
    // color: ${(props) => props.theme.palette.colors.white};
    font-size: 1.4375rem;
  }
  .green-text {
    font-size: 15px;
    margin-left: 5px;
    font-weight: 300;
    color: var(--text-2);
  }
`;

export const ProductFields = styled.div`
  .productValueContainer {
    display: flex;
    gap: 0.5rem;
  }
  p {
    font-weight: 500;
    font-size: 1.1rem;
  }
  .titleName {
    // min-width: 160px;
  }
`;

export const SkuTable = styled.div`
  font-size: 17px;
  margin: 0em 0;
  b {
    font-weight: 700;
    margin-right: 0.5em;
    line-height: 2;
    text-transform: uppercase;
  }
  span {
    font-weight: 400;
  }
  svg {
    color: var(--text);
    font-size: 18px;
  }
`;

export const PriceBox = styled(Row)`
  // align-items: flex-end;
  margin: 0rem 0;
  // padding-top: 1.1875rem;
  span {
    font-size: 1.563rem;
    font-weight: 300;
    color: #dddddd;
    text-decoration: line-through;
    margin-right: 1rem;
  }
  h6 {
    font-weight: 700;
    lin-height: 26px;
    font-size: 2.5rem;
    color: var(--text);
  }
`;

export const CategorySelector = styled(Row)`
  width: 100%;

  margin: 1rem 0;

  h4 {
    font-size: 24px;
    font-weight: 700;
    margin-right: 0.8rem;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    h4 {
      margin-bottom: 1rem;
    }
  }
`;

export const BtnsSection = styled(Row)`
  margin: 1rem 0;
  /* display: none; */
  padding: 5px;
  color: white;
  // height: 80px;
  // background-color: #000000;
  // box-shadow: inset 16px 23px 36px -1px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  width: 100%;
  button {
    width: 100%;
    max-width: 250px;
    padding: 1rem 2.5rem;
    // width: 20rem;
    // height: 4rem;
    font-size: 18px;
    -weight: 400;
    transition: 0.4s;
    // text-transform: capitalize;
    // letter-spacing: 0.02em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: none;
    align-items: center;
    color: #ffffff;
    // background: linear-gradient(
    //   to right,
    //   ${(props) => props.theme.palette.colors.secondary},
    //   ${(props) => props.theme.palette.colors.primary}
    // );
    background: ${(props) => props.theme.palette.colors.primary};
    border-radius: 10px;
    cursor: pointer;
    // border: 1px solid #000000;
    &:hover {
      opacity: 0.8;
    }
    &:focus {
      outline: none;
    }
    .icon {
      margin-right: 0.5em;
      font-size: 24px;
      // margin-bottom: -2px;
    }
  }
`;

export const TabsContainer = styled(Row)`
  width: 100%;
  margin: 4em;
  border-color: ${(props) => props.theme.palette.bg.primary};
  margin-bottom: 0rem;
  .tab {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    /* min-width: max-content; */
    text-transform: capitalize;
    padding: 0 0em;
    font-size: 1.437rem;
    /* transition: 0.4s; */
    margin-right: 0.6em;

    h6 {
      color: var(--text);
      font-size: 1.926rem;
      font-weight: 400;
      width: 100%;
      min-width: max-content;
      transition: 0.4s;
      padding: 1rem 0;
      &:hover {
        font-weight: 600;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .tab h6 {
      font-size: 21px;
      font-weight: 500;
      text-align: center;
      margin: 0.5em 0;
      border: none !important;
    }
  }
`;

export const FullDescriptionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  // font-size: 17px;
  // margin: 4em 0;
  font-size: 1rem;
  font-weight: 300;
  color: #a7a7a7;
`;

export const QuantityBox = styled(Row)`
  justify-content: space-between;
  // margin: ${(props) => (!props.small ? "1em 0" : "auto")};
  max-width: 117px;
  padding: 13px;
  // border: 1px solid #e6e6e6;
  border-radius: 5px;
  background: #000000;
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border: 1px solid #696969;
    border-radius: 3px;
    user-select: none;
    svg {
      color: var(--text-2);
    }
  }
  .input-qty {
    width: 34px;
    heigth: 25px;
    text-align: center;
    color: #ffffff;
    // height: 38px;
    background: bottom;
    font-size: 16px;
    border-width: 0;
    border: none;
    outline: none;
    // border-left: 1px solid #8f8f8f;
    // border-right: 1px solid #8f8f8f;
    &:focus {
      border-width: 0 1px 0 1px;
    }
    &::placeholder {
      color: #ffffff;
    }
  }
  &.no-variant {
    margin: 0;
  }
  span {
    width: ${(props) => (props.small ? "20px" : "30px")};
    height: ${(props) => (props.small ? "20px" : "30px")};
    border: 0px;
    display: grid;
    place-items: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: ${(props) => (props.small ? ".2em" : ".5em")};
    margin: 0;
    padding: 0;
    transition: 0.4s;
    &:hover {
      color: var(--text);
    }
  }
  #price {
    width: ${(props) => (props.small ? "34.5px" : "55px")};
    height: ${(props) => (props.small ? "34.5px" : "55px")};
    border: 0px;
    display: grid;
    place-items: center;
    font-size: 15px;
    font-weight: 500;
    margin: 0px;
    color: var(--text);
    border-radius: ${(props) => (props.small ? ".65em" : ".85em")};
  }
`;
