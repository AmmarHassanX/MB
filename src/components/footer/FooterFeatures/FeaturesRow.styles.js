import styled from "styled-components";

export const FeaturesSection = styled.div`
  width: 100%;
  // background-color: ${(props) => props.theme.palette.bg.secondary};
  display: grid;
  place-items: center;
  min-height: 7.88rem;
  padding: 0 1em;
  margin: 0 0 3rem 0;
  border-bottom: 1px solid #ffffff40;
  @media screen and (max-width: 640px) {
    padding: 0;
  }
`;

export const FeaturesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: ${(props) => props.theme.maxWidth.home};
  flex-wrap: wrap;
  padding: 2rem 0;
  @media only screen and (max-width: 640px) {
    justify-content: space-around;
  }
`;

export const FeaturesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1em;
  .imgBox {
    display: flex;
    font-size: 3rem;
    color: ${(props) => props.theme.palette.bg.white};
    border: 1px dashed #fff;
    border-radius: 50%;
    padding: 1.8rem;
    margin-right: 1.2rem;
  }
  .col {
    color: ${(props) => props.theme.palette.bg.white};
    margin-left: 0.6em;
    text-transform: capitalize;
    p {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 0.1em;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.8rem;
        font-size: 2rem;
      }
    }
    span {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin: 0 0em;
    .imgBox {
      margin-bottom: 0.6rem;
    }
    .col p {
      font-size: 1rem;
    }
    span {
      display: none;
    }
  }
`;
