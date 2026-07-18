import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setAlert } from "../../../AsyncFunctions/alert";

const NewsTellerContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  // padding: 0 1em;
  height: 13.125rem;
  max-width: 1400px;
  margin: auto;
  border-radius: 20px;
  background: url("/images/home/register/bg.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  // mix-blend-mode: soft-light;
  /* opacity: 0.9; */
  background-color: ${(props) => props.theme.palette.bg.main};
  @media screen and (max-width: 768px) {
    min-height: 22rem;
    padding: 1em;
  }
`;
const NewsTellerBox = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth.home};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.palette.colors.main};
  div {
    margin-left: 1em;
  }
  h6 {
    font-size: 2.375rem;
    font-weight: 700;
    max-width: 444px;
    line-height: 44px;
    // text-transform: uppercase;
  }
  p {
    font-size: 1.2356rem;
    font-weight: 500;
    text-transform: none;
    padding-top: 0.5rem;
    // max-width: 50ch;
  }
`;
const Img = styled.div`
  position: relative;
  width: 11.4375rem;
  height: 7.4375rem;
  @media only screen and (max-width: 640px) {
    min-width: 4rem;
    width: 4rem;
    max-width: 4rem;
    height: 4rem;
  }
`;
const InputBox = styled.form`
  // width: 37.38rem;
  // height: 5.19rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  input {
    width: 98%;
    height: 100%;
    padding: 0.2em 1em;
    font-size: 1.14rem;
    color: black;
    font-weight: 400;
    border: none;
    outline: none;
    &:hover,
    &:focus {
      outline: none;
      border: none;
    }

    &::placeholder {
      font-size: 1.14rem;
    }
  }
  button {
    padding: 1.3125rem 3.625rem;
    background: var(--accent);
    color: #3c3d37;
    font-size: 1.4856rem;
    // text-transform: uppercase;
    // letter-spacing: 0.2em;
    border: none;
    border-radius: 38.62px;
    // margin-right: 1em;
    font-weight: 900;
    cursor: pointer;
    transition: 0.2s;
    &:hover,
    &:focus {
      outline: none;
      border: none;
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 640px) {
    // width: 95%;
  }
`;

const RegisterBanner = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert("success", "Thank You! for Subscribing  to Leaf Distro")(dispatch);
    setInput("");
  };
  return (
    <Box sx={{ padding: { xs: "2rem 1rem", md: "2rem 0" } }}>
      <NewsTellerContainer>
        <NewsTellerBox>
          <ContentRow>
            <Img>
              <Image
                src="/images/home/register/box.png"
                alt="box"
                layout="fill"
                objectFit="contain"
              />
            </Img>
            <div style={{ color: "#353535" }}>
              <h6>Best Product delivery at your door step</h6>
              <p>We are available for every time.</p>
            </div>
          </ContentRow>
          <InputBox
            onSubmit={(e) => {
              // handleSubmit(e)
            }}
          >
            <Link href={"#"} passHref>
              <button>Shop Now</button>
            </Link>
          </InputBox>
        </NewsTellerBox>
      </NewsTellerContainer>
    </Box>
  );
};

export default RegisterBanner;
