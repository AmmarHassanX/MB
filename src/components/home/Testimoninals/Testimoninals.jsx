import { useMediaQuery } from "@mui/material";
import React from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const TestimoninalData = () => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const mockData = [
    {
      title: "OXVA Xlim Pro Pod Vape Kit",
      text: "MB Wholesale is a brand unlike any other and will always have my support for life. They've impacted my life in several ways being my effective delivery system for CBD. It has introduced me to so many people, as a conversation starter with it's stylish looks and diverse uses.",
      name: "-Albert Done",
      address: "New jersey USA",
      rating: 5,
    },
    // {
    //   title: "Bar Series Nic Salts Flavour",
    //   text: "Was your experience with MB Wholesale products good enough to write home about? Write to us instead! We’d love to hear how low-dose cannabis fits in your life.",

    //   name: "Joe J.",
    //   address: "New jersey USA",
    //   rating: 5,
    // },
    // {
    //   title: "Gold Bar Disposable Vape",
    //   text: "Was your experience with MB Wholesale products good enough to write home about? Write to us instead! We’d love to hear how low-dose cannabis fits in your life.",

    //   name: "Anthony T.",
    //   address: "New jersey USA",
    //   rating: 5,
    // },
    // {
    //   title: "OXVA Xlim Pro Pod Vape Kit ",
    //   text: (
    //     <>
    //       {` Iv'e had so many of these and they all have been good. They never get
    //       clogged and have a good battery. My favorite strain was Wedd...`}
    //     </>
    //   ),
    //   name: "Michael P.",
    //   address: "New jersey USA",
    //   rating: 5,
    // },
  ];

  let delay = 4000;

  return (
    <TestimoninalContainer
      className="homeCarousel"
      style={{
        margin: "0 auto",
        height: "100%",
        padding: isMobile ? "1.5rem" : "130px 1.5rem 0 1.5rem",
      }}
    >
      <Container>
        <div
          style={{
            fontWeight: "500",
            color: "var(--accent)",
            fontSize: isMobile ? "2.5rem" : "55px",
            textAlign: "center",
          }}
        >
          What People Say
        </div>
        <Swiper
          autoplay={{
            delay,
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
              slidesPerView: 1,
            },
            1060: {
              slidesPerView: 1,
            },
            1280: {
              slidesPerView: 1,
            },
            1480: {
              slidesPerView: 1,
            },
          }}
          loop={true}
          navigation={true}
        >
          {mockData?.map((data, i) => (
            <SwiperSlide key={i}>
              <SectionContainer>
                {/* <FaQuoteLeft style={{ fontSize: "3rem", color: "#D4EAF6" }} /> */}
                <div className="infoContainer">
                  {/* <div className="ratingContainer">
                    <Rating defaultValue={data?.rating} readOnly icon={<FaStar />} />
                  </div> */}
                  {/* {data?.title && <h1>{data?.title}</h1>} */}
                  {data?.text && (
                    <h2
                      style={{
                        fontSize: isMobile ? "1.2rem" : "27px",
                        color: "var(--text-2)",
                        fontWeight: "300",
                      }}
                    >
                      {data?.text}
                    </h2>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem",
                      gap: "1rem",
                    }}
                  >
                    {/* <div
                      style={{
                        // width: "50px",
                        // height: "50px",
                        padding: "1.5rem",
                        borderRadius: "50%",
                        backgroundColor: "#f0f0f0", // Background color for the icon
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid #ddd", // Optional: Add a border
                      }}
                    >
                      <FaUser
                        size={20}
                        color="var(--text-2)"
                        style={{ marginRight: 0 }}
                      />
                    </div> */}
                    <div>
                      <div
                        className="name"
                        style={{ fontSize: isMobile ? "1.3rem" : "27px" }}
                      >
                        {data?.name}
                      </div>
                      {/* <p
                        style={{
                          color: "var(--accent)",
                          fontSize: "1.25rem",
                          textAlign: "start",
                          fontWeight: 500,
                        }}
                      >
                        New York, NY
                      </p> */}
                    </div>
                  </div>
                </div>
              </SectionContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </TestimoninalContainer>
  );
};

const Testimoninals = () => {
  return (
    <Root>
      {/* <div style={{ margin: "auto", maxWidth: "700px" }}> */}
      <TestimoninalData />
      {/* </div> */}
    </Root>
  );
};

export default Testimoninals;

const Root = styled.div`
  // margin: 1rem auto;
  // font-size: 0;
  padding: 2.3125rem 2.375rem;
  // background: #f4faf1;
  // background-image: url(/images/home/testimonials/bg.png);
  background-size: cover;
  background-position: center;
  // border-radius: 20px;
`;

const TextDataContainer = styled.div`
  color: ${(props) => props.theme.palette.colors.black};
  padding: 1rem;
  font-weight: 500;
  h4 {
    font-weight: 400;
    font-size: 1.5rem;
    color: ${(props) => props.theme.palette.colors.primary};
    margin-bottom: 0.5rem;
  }
  h1 {
    font-size: 2.9rem;
    font-weight: 500;
  }
`;

const TestimoninalContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 1rem;
  // border-bottom: 1px solid #e5e7dd;
  // padding: 3rem;
  .brandHeader {
    // position: absolute;
    // top: -2rem;
    .brandHeaderText {
      // background: var(--surface);
      // padding: 0 1rem;
    }
  }
`;

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth.home};
  .swiper-button-prev,
  .swiper-button-next {
    display: block;
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      display: block;
    }
  }
`;

const SectionContainer = styled.div`
  padding: 2rem 2rem 0 2rem;
  // margin: 30px 0;
  height: 100%;
  // max-width: ${(props) => props.theme.maxWidth.home};
  color: ${(props) => props.theme.palette.colors.black};
  background: transparent;
  // border-radius: 8px;
  // border: 2px dashed #e3e2e2;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .infoContainer {
    margin: 0.8rem 0;
    // text-align: center;
    // border-bottom: 1px solid ${(props) => props.theme.palette.colors.white};
  }
  .ratingContainer {
    width: 100%;
    text-align: center;
    margin: 0.5rem auto;
    svg {
      color: #fcb41c;
    }
  }
  h1 {
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
  }
  h2 {
    // line-height: 1.8rem;
    // color: ${(props) => props.theme.palette.colors.primary};
    font-weight: 500;
    text-align: center;
  }
  p {
    font-size: 1.6875rem;
    font-weight: 400;
    color: #13154b;
    text-align: center;
    // color: ${(props) => props.theme.palette.colors.white};
    // font-style: italic;
  }
  .name {
    font-weight: 900;
    color: #4c4b4b;
    text-align: center;
    // margin-top: 1rem;
  }
  span {
    font-size: 12px;
    color: ${(props) => props.theme.palette.colors.white};
  }
  svg {
    color: ${(props) => props.theme.palette.bg.header};
    margin-right: 0.4rem;
    font-size: 1rem;
  }
  button {
    background: ${(props) => props.theme.palette.bg.primary};
    color: ${(props) => props.theme.palette.bg.white};
    padding: 25px 39px;
    // border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    font-size: 26px;
    font-weight: 700;
  }
`;
