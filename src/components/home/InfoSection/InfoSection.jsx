import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const InfoSection = ({ data }) => {
  return (
    <Root>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <LogoContainer>
            <Link href="/">
              <Image
                src="/images/home/infoLeft.png"
                alt="logo"
                layout="fixed"
                height={400}
                width={400}
                objectFit="contain"
                className="img-style"
              />
            </Link>
          </LogoContainer>
        </Grid>
        <Grid item xs={8}>
          <div className="infoContainer">
            {data?.title && <div className="title">{data?.title}</div>}
            {data?.subTitle && <div className="subTitle">{data?.subTitle}</div>}
            {data?.text && <div className="textInfo">{data?.text}</div>}
            <div style={{ marginTop: "1rem" }}>
              <Grid
                container
                spacing={2}
                //  justifyContent="center"
                // alignItems="center"
              >
                <Grid item xs={4}>
                  {data?.button && (
                    <a href={data?.button?.link || ""}>
                      <button>
                        <span>{data?.button?.text}</span>
                      </button>
                    </a>
                  )}
                  <div style={{ marginTop: "1rem" }}>
                    {data?.points?.map((item, i) => {
                      return (
                        <div key={i} style={{ display: "flex", gap: "1rem", margin: "0.2rem 0" }}>
                          <Image
                            src="/images/home/right.png"
                            alt="logo"
                            layout="fixed"
                            height={26}
                            width={26}
                            objectFit="contain"
                            className="img-style"
                          />
                          <p style={{ fontSize: 18, fontWeight: 600 }}>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <LogoContainer style={{ marginTop: "-2rem" }}>
                    <Link href="/">
                      <Image
                        src="/images/home/infoRight.png"
                        alt="logo"
                        layout="fixed"
                        height={300}
                        width={300}
                        objectFit="contain"
                        className="img-style"
                      />
                    </Link>
                  </LogoContainer>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Root>
  );
};

export default InfoSection;

const Root = styled.div`
  padding: 1.6rem;
  max-width: ${(props) => props.theme.maxWidth.home};
  margin: auto;
  color: ${(props) => props.theme.palette.colors.black};
  .infoContainer {
    /* text-align: center; */
  }
  .title {
    * {
      font-size: 28px;
      font-weight: 700;
    }
  }
  .subTitle {
    margin: 0.5rem 0;
    * {
      font-size: 18px;
      /* line-height: 1.8rem; */
      /* color: ${(props) => props.theme.palette.colors.primary}; */
      font-weight: 300;
    }
  }
  .textInfo {
    margin: 1rem;
    * {
      color: ${(props) => props.theme.palette.colors.secondary};
    }
  }
  button {
    background: #305873;
    color: #ffffff;
    padding: 1rem 2rem 0.8rem 2rem;
    border-radius: 58px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  position: relative;
  /* text-align: center; */
  margin: 0;
  @media screen and (max-width: 900px) {
    margin: 0;
  }
`;
