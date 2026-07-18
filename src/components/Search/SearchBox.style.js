import styled from "styled-components";
export const SearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  place-items: center;
  position: relative;
  height: 54px;
  // margin: 0 1rem;
  padding: 0 0.5rem;
  @media screen and (max-width: 1200px) {
    // padding: 2em 0;
  }
`;
export const SearchBox = styled.div`
  max-width: 654px;
  min-width: 100%;
  // height: 3.8rem;
  height: 54px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  // padding: 1rem 0;
  // padding-top: 0.8rem;
  // padding-bottom: 0.8rem;
  // padding-left: 0.8rem;
  font-size: 1.3rem;
  // padding-right: 1rem;
  background: transparent;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: border-color var(--dur-fast) ease;
  &:focus-within { border-color: var(--accent); }
  border-radius: 45.8px;
  // box-shadow: 0px 0px 2px 1px #07354015;
  // border: 1px solid ${(props) => props.theme.palette.colors.other}50;
  // border-radius: 10px;
  &:hover {
    // border: 1px solid ${(props) => props.theme.palette.bg.primary};
  }
  input {
    // height: 45px;
    // color: ${(props) => props.theme.palette.colors.secondary};
    color: var(--text);
    // background: ${(props) => props.theme.palette.bg.white};
    background: transparent;
    // border-radius: 6px;
    width: 100%;
    // height: 100%;
    outline: none;
    font-weight: 400;
    border: none;
    // border-radius: 7px;
    justify-self: flex-start;
    font-size: 16px;
    padding: 0 16px;
    // border-right: 2px solid ${(props) => props.theme.palette.bg.secondary};
    // border-radius: 4px;
    // box-shadow: 0px 0px 10px 2px #07354015;
    // border-right: 1px solid ${(props) => props.theme.palette.bg.other};

    &::placeholder {
      font-size: 16px;
      color: var(--text-3);
      font-weight: 300;
      // text-transform: uppercase;
    }
  }
  .icon {
    svg {
      font-size: 22px;
      color: var(--accent);
    }
    // font-size: 50px;
    font-weight: 500;
    // min-width: max-content;
    // height: fit-content;
    height: 100%;
    display: grid;
    place-items: center;
    color: ${(props) => props.theme.palette.bg.white};

    span {
      // height: 45px;
      display: grid;
      place-items: center;
      font-size: 22px;
      padding: 0 1rem;
      cursor: pointer;
      // height: 100%;
      font-weight: 700;
      color: var(--text-3);
      // border: 2px solid ${(props) => props.theme.palette.colors.primary};
      // border-left: 2px solid ${(props) =>
        props.theme.palette.colors.primary}20;
    }
  }
`;
