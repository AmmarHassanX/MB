import styled from "styled-components";

export const FeaturesSection = styled.div`
  // background-image: url(/images/home/features/bg.png); /* Wavy pattern */
  // background-size: cover;
  // background-position: center center;
  // background-repeat: no-repeat;
  width: 100%;
  /* background-color: var(--surface); */
  display: grid;
  place-items: center;
  min-height: 6.25rem;
  // margin: 3.625rem 0 0 0;
  // padding: ${(props) => (props.onListPage ? "1em 0" : "0em 1em")};
  @media only screen and (max-width: 768px) {
    min-height: 3.25rem;
  }
`;

export const FeaturesContainer = styled.div`
  // border-top: 1px solid #00000026;
  // border-bottom: 1px solid #00000026;
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.onListPage ? "column" : "row")};
  align-items: ${(props) => (props.onListPage ? "flex-start" : "center")};
  justify-content: space-evenly;
  max-width: 1400px;
  flex-wrap: wrap;
  // background-color: #2E319210;
  padding: ${(props) => (props.onListPage ? "1.5rem" : "2.5rem")};
  // margin-bottom: 5rem;
  // border-top: 1px solid rgba(119, 119, 119, 0.3);
  // border-radius: 2rem;
  @media only screen and (max-width: 768px) {
    padding: ${(props) => (props.onListPage ? "1em 0" : "3rem 0")};
  }
  border-bottom: 1px solid #ffffff30;
`;

export const FeaturesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 0.75rem;
  margin: ${(props) => (props.onListPage ? ".5em 0" : "1em")};
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
  }
  svg {
    color: var(--accent);
    font-size: 5rem;
    margin: auto 0;
    // margin-bottom: 1rem;
  }
  .col {
    color: ${(props) => props.theme.palette.colors.main};
    // margin-left: 1em;
    text-transform: capitalize;
    max-width: 100%;
    text-align: left;
    p {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 0.2em;
      color: var(--accent);
    }
    .white {
      color: #ffffff;
    }
    span {
      font-size: 1rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
  @media only screen and (max-width: 768px) {
    // flex-direction: column;
    text-align: center;
    margin: 0 0.4em;
    .col p {
      text-align: center;
      font-size: 10px;
    }
    span {
      display: none;
    }
  }
`;
