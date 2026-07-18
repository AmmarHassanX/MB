import styled from "styled-components";

export const FilterBarContainer = styled.div`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* text-transform: capitalize; */
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  .routeName {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    margin: auto;
    width: 100%;
    max-width: 1400px;
    font-size: 16px;

    a {
      color: var(--accent);
      font-weight: 400;
      font-size: 16px;

      // border-bottom: 2px solid var(--accent);
    }

    p {
      color: var(--accent);
      overflow: hidden;
      max-width: 50vw;
      margin-left: 10px;
      text-overflow: ellipsis;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;

      &:hover {
        text-decoration: underline;
      }
      /* word-break: break-all; */
    }
    h1 {
      color: var(--accent);
      font-weight: 400;
      font-size: 16px;

      /* word-break: break-all; */
    }
  }
  @media only screen and (max-width: 640px) {
    padding: 0.5em 1em;
  }
`;
export const SelectBox = styled.div`
  display: flex;
  // background-color: #d6eeff;
  border: 0.5px solid #1b0c0d;
  flex-direction: row;
  justify-content: center;
  // border: none;
  border-radius: 6px;
  align-items: center;
  color: ${(props) => props.theme.palette.colors.secondary};
  span {
    font-weight: 300;
    font-size: 1.0625rem;
    color: #212429;
    text-transform: capitalize;
  }
  position: relative;
  .icon {
    // position: absolute;
    /* z-index: 2; */
    color: var(--accent);
    font-size: 1rem;
    right: 10px;
    top: 10px;
  }
  select {
    border-radius: 7px;
    // border: 1px solid #000000;
    border: none;
    // min-height: 52px;
    width: 210px;
    text-transform: capitalize;
    height: 2.4375rem;
    // border-radius: 3px;
    padding: 0em 1em;
    // margin-left: 1rem;
    font-size: 16px;
    font-weight: 400;
    color: #1b0c0d;
    z-index: 1;
    background: transparent;
    &::-ms-expand {
      display: none;
    }
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: "";
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

export const SelectBoxMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #7e7979;
  background-color: #d6eeff;
  span {
    font-weight: 500;
    font-size: 1.3rem;
    color: #515151;
    text-transform: capitalize;
  }
  position: relative;
  .icon {
    position: absolute;
    /* z-index: 2; */
    color: var(--text);
    right: 5px;
    top: 6px;
  }
  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;
