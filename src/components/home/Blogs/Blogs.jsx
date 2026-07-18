import React from "react";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Divider, Stack } from "@mui/material";
import styled from "styled-components";
import { paramCase } from "param-case";
import moment from "moment-timezone";

const Blogs = () => {
  const { data: blogs } = useDatafetcher(`/ecommerce/staticPage/list`, true);

  return (
    <div
      style={{
        background: "var(--surface)",
        padding: "2rem 0",
        maxWidth: "1400px",
        margin: "auto",
      }}
    >
      {/* <p style={{ color: "#BC9B35", fontWeight: 700, fontSize: "1.188rem", textAlign: "center" }}>~ Latest News ~</p> */}
      <Divider>
        <p
          style={{
            fontWeight: 400,
            fontSize: "1.5rem",
            textAlign: "center",
            color: "var(--text)",
          }}
        >
          Blog posts
        </p>
      </Divider>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: "1400px",
          // borderBottom: "1px solid #ffffff50",
          margin: "0 auto",
        }}
      >
        <SwiperContainer
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          spaceBetween={30}
          breakpoints={{
            1: {
              slidesPerView: 1,
            },
            380: {
              slidesPerView: 1,
            },
            754: {
              slidesPerView: 2,
            },
            1060: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            },
            1480: {
              slidesPerView: 3,
            },
          }}
          loop={blogs?.content?.length >= 3}
          navigation={false}
        >
          {blogs?.content?.map((blog, i) => (
            <SwiperSlide
              key={i}
              style={{ display: "grid", placeItems: "center" }}
            >
              <Link
                href={
                  `/${paramCase(
                    blog?.urlAlias || blog?.title || blog?.header
                  )}?id=${blog?.id}` ||
                  `/${paramCase(blog?.urlAlias || blog?.title || blog?.header)}`
                }
              >
                <div
                  className="makeItemCenter"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 2rem",
                    cursor: "pointer",
                  }}
                >
                  {/* <h1>{i + 1}</h1> */}
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        blog?.coverImageUrl ||
                        "/images/products/imgnotfound.png"
                      }
                      alt="img"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover", // Maintain aspect ratio while filling the space
                      }}
                    />
                  </div>
                  <p
                    style={{
                      textAlign: "start",
                      width: "100%",
                      fontWeight: 400,
                      fontSize: "1.4rem",
                      color: "var(--text)",
                      paddingTop: "1rem",
                      minHeight: "6.5rem",
                      maxHeight: "6.5rem",
                    }}
                  >
                    {blog?.title}
                  </p>
                  <p style={{ fontSize: "1.2rem", color: "var(--text)" }}>
                    Posted on{" "}
                    {moment(blog?.insertedTimestamp).format("MMMM DD YYYY")}
                  </p>
                  <button
                    style={{
                      textAlign: "center",
                      width: "30%",
                      color: "#ffffff",
                      // fontWeight: 500,
                      fontSize: "1.563rem",
                      background: "#000000",
                      borderRadius: "0.3rem",
                      borderColor: "transparent",
                      padding: "0.6rem 0",
                      marginTop: "1rem",
                    }}
                  >
                    Read more
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </Stack>
    </div>
  );
};

export default Blogs;

export const SwiperContainer = styled(Swiper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  // @media only screen and (max-width: 1498px) {
  //   min-width: 90%;
  // }

  // @media only screen and (max-width: 768px) {
  //   max-width: 100vw;
  // }
`;
