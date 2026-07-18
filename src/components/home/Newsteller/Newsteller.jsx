import { Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import getConfig from "next/config";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setAlert } from "../../../AsyncFunctions/alert";
import theme from "../../../utilities/theme/theme";
import { FaArrowRight } from "react-icons/fa";

const NewsTellerContainer = styled.div`
  // background-image: url("/images/home/newsteller/background.png");
  // background-size: cover;
  // background-position: top center;
  background-repeat: no-repeat;
  /* text-align: center;  */
  /* Center-align content */
  // max-width: 1400px;
  margin: 0 auto;
  // padding: 5.4rem 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  // border-radius: 5px;
  // padding: 2em;
  // min-height: 14.19rem;
  // mix-blend-mode: soft-light;
  // background-color: ${(props) => props.theme.palette.bg.primary};
  // margin-top: 2rem;
  // margin-top: 1rem;

  // border-left: 1px solid #ffffff30;
  @media screen and (max-width: 768px) {
    // padding: 8rem 2rem;
    border: none;
  }
`;

const NewsTellerBox = styled.div`
  width: 100%;
  // max-width: 1540px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  min-height: 100%;
  // margin-bottom: 2rem;
  /* justify-content: center; */
  // border-top: 1px solid rgba(0, 0, 0, 0.1);
  // padding-top: 2rem;
  @media screen and (max-width: 768px) {
    // max-width: 100vw;
    padding: 0;
    // padding-bottom: 1em;
  }
`;
const ContentRow = styled.div`
  // display: flex;
  /* flex-direction: row; */
  /* align-items: center; */
  /* justify-content: center; */
  /* width: 96%; */
  // text-align: center;
  /* margin: 2rem 0; */
  color: var(--accent);
  svg {
    color: ${(props) => props.theme.palette.bg.main};
    font-size: 2rem;
    margin-right: 1rem;
  }
  h3 {
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    font-weight: 600;
  }
  p {
    padding: 1rem 0;
    font-size: 1rem;
    font-weight: 300;
    max-width: 100%;
    width: 100%;
    color: #ffffff;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    h6 {
      font-size: 25px;
      text-align: center;
    }
    p {
      font-size: 16px;
      text-align: center;
    }
  }
`;

const InputBox = styled.form`
  width: 100%;
  // height: 60px;
  max-width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // background-color: var(--surface);
  border-radius: 38px;
  border: 1px solid #ffffff;
  // box-shadow: rgba(79, 79, 79, 0.2) 0px 0px 4px 0px;
  margin: auto;
  padding: 7px;
  input {
    // border-radius: 10px 0 0 10px;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 0.2em 1em;
    font-size: 1rem;
    color: #ffffff;
    font-weight: 400;
    border: none;
    outline: none;
    &:hover,
    &:focus {
      outline: none;
      border: none;
    }

    &::placeholder {
      font-size: 1rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 46px;
    border: none;
    outline: none;
    gap: 6px;
    // margin-right: 14px;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background-color: var(--accent);
    padding: 13px 27px;
    // gap: 0.625rem;
    // /* width: 100%; */
    // /* max-width: 322px; */
    // // padding: 1rem 1.6rem;
    // margin: 0.1rem;
    // height: 100%;
    // width: 100%;
    // text-transform: uppercase;
    // background: ${(props) => props.theme.palette.colors.primary};
    // color: ${(props) => props.theme.palette.bg.white};
    // font-size: 1rem;
    // // text-transform: uppercase;
    // /* letter-spacing: 0.32em; */
    // border: none;
    // border-radius: 10px;
    // // margin-left: 0.8rem;
    // font-weight: 700;
    cursor: pointer;
    // transition: 0.2s;
    // &:hover,
    // &:focus {
    //   outline: none;
    //   border: none;
    //   transform: scale(1.05);
    // }
    // svg {
    //   font-size: 1.5rem;
    // }
  }
  @media only screen and (max-width: 640px) {
    max-width: 100%;

    button {
      padding: 0.4em 1.4em;
    }
  }
`;
const LogoContainer = styled.div`
  cursor: pointer;
  position: relative;
  text-align: center;
`;

const Newsteller = () => {
  const { publicRuntimeConfig } = getConfig();
  const { SERVICE_API_BASE_URL } = publicRuntimeConfig;
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, reset } = useForm();
  const onSubmit = async (formData) => {
    try {
      const body = {
        ...formData,
        message: "This is coming from SUBSCRIBE form.",
      };
      const result = await axios.post(
        `${SERVICE_API_BASE_URL}/email/customer/contact-us`,
        body
      );
      setAlert("success", "Subscribe mail sent successfully")(dispatch);
      reset({ email: "" });
    } catch (e) {
      /* Do nothing*/
      setAlert("error", "Error in sending mail")(dispatch);
    }
  };
  return (
    <NewsTellerContainer>
      <NewsTellerBox>
        {/* <p
              style={{
                fontSize: "39px",
                fontWeight: 500,
                color: theme.palette.colors.white,
              }}
            >
              Subcribe To Our Newsletters{" "}
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                color: theme.palette.colors.white,
                marginBottom: "33px",
              }}
            >
              Sign up for the weekly newsletter and build better Vape stores.{" "}
            </p> */}

        <NewstellerEmail
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
        />
        {/* <div
              style={{
                fontWeight: "300",
                fontSize: "12px",
                color: "#ffffff",
                marginTop: "33px",
              }}
            >
              We respect your privacy, so we never share your info.
            </div> */}
        {/* </Grid> */}
        {/* <Grid
            item
            // textAlign="center"
            lg={6}
            md={12}
            sm={12}
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <ContentRow>
              <>
                <img
                  src="/images/home/newsteller/newsteller_product.png"
                  alt="newteller product image"
                  style={{
                    maxWidth: "442px",
                    width: "100%",
                    maxHeight: "316px",
                    height: "100%",
                  }}
                />
              </>
            </ContentRow>
          </Grid> */}
        {/* </Grid> */}
      </NewsTellerBox>
    </NewsTellerContainer>
  );
};

export default Newsteller;

export const NewstellerEmail = ({ handleSubmit, onSubmit, control }) => {
  const isMobile = useMediaQuery("(max-width:1200px)");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "45.75rem",
        display: "flex",
        alignItems: "center",
        marginTop: "16px",
      }}
    >
      <InputBox>
        <Controller
          name="email"
          type="email"
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required={true}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    marginLeft: "1rem",
                    color: "red",
                  }}
                >
                  {error?.message}{" "}
                </p>
              </div>
            );
          }}
        />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "var(--accent)",
            borderRadius: "25px",
            border: "none",
          }}
        >
          {isMobile ? <FaArrowRight /> : "Subscribe"}
        </button>
      </InputBox>
    </div>
  );
};
