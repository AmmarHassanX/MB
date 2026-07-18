import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth.home};
  display: grid;
  place-items: center;
  margin: 1em auto;
  padding: 1.5em;
  background-color: var(--text);
`;
const Box = styled.div`
  width: 100%;
  border: 1px solid #c6c6c6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4 {
    color: ${(props) => props.theme.palette.bg.primary};
    font-size: 2.88rem;
    text-transform: uppercase;
    font-weight: 700;
    margin: 1.2em 0;
    margin-bottom: 0.4em;
  }
`;
export const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin: 1em 0; */
  flex-wrap: wrap;
  margin-bottom: 1.2em;
  /* height: 3rem; */
  .divider {
    width: 2px;
    height: 1.77rem;
    margin: 0 2em;
    background-color: ${(props) => props.theme.palette.bg.primary};
  }
  p {
    font-weight: 500;
    color: white;
    font-size: 2.06rem;
    text-transform: uppercase;
    transition: 0.4s;
    margin: 0.8em 0;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.palette.bg.primary};
    }
  }
`;

const TopCateogries = () => {
  return (
    <Container>
      <Box>
        <h4>top categories</h4>
        <Items>
          <Link href="/">
            <p>ashtrays</p>
          </Link>
          <span className="divider" />
          <Link href="/">
            <p>baddies</p>
          </Link>
          <span className="divider" />
          <Link href="/">
            <p>butane</p>
          </Link>
          <span className="divider" />
          <Link href="/">
            <p>charcoal</p>
          </Link>
          <span className="divider" />
          <Link href="/">
            <p>containers</p>
          </Link>
          <span className="divider" />
          <Link href="/">
            <p>dab mats</p>
          </Link>
        </Items>
      </Box>
    </Container>
  );
};

export default TopCateogries;
